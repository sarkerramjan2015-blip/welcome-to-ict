import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

type PaymentItemType = 'COURSE' | 'SUGGESTION' | 'CHALLENGE';
type CourseType = 'RECORDED' | 'LIVE';

interface PaymentItemConfig {
  id: string;
  title: string;
  itemType: PaymentItemType;
  fee: number;
  courseType?: CourseType;
  challengeMonth?: string;
  challengeYear?: number;
}

const CHECKOUT_ENDPOINT = '/api/checkout-v2';
const VERIFY_ENDPOINT = '/api/verify-payment';
const SUGGESTION_ITEM_ID = 'hsc-ict-master-suggestion';

const PAYMENT_CATALOG: Record<string, PaymentItemConfig> = {
  'recorded-1': {
    id: 'recorded-1',
    title: 'ICT Full Course Recorded',
    itemType: 'COURSE',
    courseType: 'RECORDED',
    fee: 500,
  },
  'live-1': {
    id: 'live-1',
    title: 'HSC ICT Live Course',
    itemType: 'COURSE',
    courseType: 'LIVE',
    fee: 1500,
  },
  [SUGGESTION_ITEM_ID]: {
    id: SUGGESTION_ITEM_ID,
    title: 'HSC ICT Master Suggestion',
    itemType: 'SUGGESTION',
    fee: 150,
  },
};

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

const cleanBaseUrl = (value: string) => value.replace(/\/+$/, '');

const getPublicAppUrl = (origin?: string) =>
  cleanBaseUrl(process.env.APP_URL || process.env.VITE_APP_URL || origin || 'https://icttoppers.com');

const parseBody = (body: unknown) => {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body as Record<string, any>;
};

const parseMetadata = (metadata: unknown) => {
  if (!metadata) return {};
  if (typeof metadata === 'string') {
    try {
      return JSON.parse(metadata);
    } catch {
      return {};
    }
  }
  return metadata as Record<string, any>;
};

const toPositiveAmount = (value: unknown, fallback: number) => {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : fallback;
};

const buildPaymentUrls = (configuredUrl: string) => {
  const cleanedUrl = cleanBaseUrl(configuredUrl);

  try {
    const url = new URL(cleanedUrl);
    const normalizedPath = url.pathname.replace(/\/+$/, '');
    const hasCheckoutPath = normalizedPath.endsWith(CHECKOUT_ENDPOINT);
    const basePath = hasCheckoutPath
      ? normalizedPath.slice(0, -CHECKOUT_ENDPOINT.length)
      : normalizedPath === '/'
        ? ''
        : normalizedPath;

    const withEndpoint = (endpoint: string) => {
      const nextUrl = new URL(url.toString());
      nextUrl.pathname = `${basePath}${endpoint}`.replace(/\/{2,}/g, '/');
      nextUrl.search = '';
      nextUrl.hash = '';
      return nextUrl.toString();
    };

    return {
      checkoutUrl: withEndpoint(CHECKOUT_ENDPOINT),
      verifyUrl: withEndpoint(VERIFY_ENDPOINT),
    };
  } catch {
    if (cleanedUrl.endsWith(CHECKOUT_ENDPOINT)) {
      return {
        checkoutUrl: cleanedUrl,
        verifyUrl: cleanedUrl.replace(new RegExp(`${CHECKOUT_ENDPOINT}$`), VERIFY_ENDPOINT),
      };
    }
  }

  return {
    checkoutUrl: `${cleanedUrl}${CHECKOUT_ENDPOINT}`,
    verifyUrl: `${cleanedUrl}${VERIFY_ENDPOINT}`,
  };
};

const getUddoktaPayConfig = () => {
  const apiUrl = process.env.UDDOKTAPAY_API_URL || process.env.UDDOKTAPAY_BASE_URL || process.env.VITE_UDDOKTAPAY_URL;
  const apiKey = process.env.UDDOKTAPAY_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('Missing UDDOKTAPAY_API_URL or UDDOKTAPAY_API_KEY environment variable.');
  }

  return {
    ...buildPaymentUrls(apiUrl),
    apiKey,
  };
};

const resolvePaymentItem = (body: Record<string, any>): PaymentItemConfig => {
  const catalogItemId = String(body.courseId || body.itemId || body.productId || '').trim();
  const catalogItem = catalogItemId ? PAYMENT_CATALOG[catalogItemId] : null;
  if (catalogItem) return catalogItem;

  const requestedType = String(body.itemType || body.type || '').trim().toUpperCase();
  if (requestedType === 'SUGGESTION') {
    return PAYMENT_CATALOG[SUGGESTION_ITEM_ID];
  }

  if (requestedType === 'CHALLENGE' || body.challengeId) {
    const challengeId = String(body.challengeId || body.itemId || '').trim();
    if (!challengeId) {
      throw new Error('Missing challenge information.');
    }

    const currentYear = new Date().getFullYear();
    const challengeYear = Number(body.challengeYear);

    return {
      id: challengeId,
      title: String(body.challengeTitle || body.title || 'HSC ICT Monthly Quiz Exam').trim(),
      itemType: 'CHALLENGE',
      fee: toPositiveAmount(body.amount || body.fee, 20),
      challengeMonth: String(body.challengeMonth || '').trim() || undefined,
      challengeYear: Number.isFinite(challengeYear) ? challengeYear : currentYear,
    };
  }

  throw new Error('Invalid payment item selected.');
};

const getFirebaseServiceAccount = () => {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    return JSON.parse(serviceAccount.replace(/\n/g, '\\n'));
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};

const getAdminDb = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert(getFirebaseServiceAccount()),
    });
  }

  return getFirestore();
};

const createPayment = async (body: Record<string, any>, origin?: string) => {
  const { checkoutUrl, apiKey } = getUddoktaPayConfig();
  const item = resolvePaymentItem(body);

  const userId = String(body.userId || '').trim();
  const email = String(body.email || '').trim();
  const fullName = String(body.fullName || 'ICT Toppers Student').trim();

  if (!userId || !email) {
    throw new Error('Missing authenticated student information.');
  }

  const appUrl = getPublicAppUrl(origin);
  const payload = {
    full_name: fullName,
    email,
    amount: String(item.fee),
    metadata: {
      userId,
      user_id: userId,
      email,
      itemId: item.id,
      item_id: item.id,
      itemType: item.itemType,
      itemTitle: item.title,
      amount: item.fee,
      ...(item.itemType === 'COURSE' ? {
        courseId: item.id,
        course_id: item.id,
        courseTitle: item.title,
        courseType: item.courseType,
      } : {}),
      ...(item.itemType === 'SUGGESTION' ? {
        productId: item.id,
        suggestionId: item.id,
      } : {}),
      ...(item.itemType === 'CHALLENGE' ? {
        challengeId: item.id,
        challengeTitle: item.title,
        challengeMonth: item.challengeMonth,
        challengeYear: item.challengeYear,
      } : {}),
    },
    redirect_url: `${appUrl}/payment/success`,
    return_type: 'GET',
    cancel_url: `${appUrl}/payment/cancel`,
  };

  const response = await fetch(checkoutUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'RT-UDDOKTAPAY-API-KEY': apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.status || !data.payment_url) {
    throw new Error(String(data.message || 'Unable to create UddoktaPay payment link.'));
  }

  return {
    paymentUrl: data.payment_url,
    item,
    course: item.itemType === 'COURSE'
      ? {
          title: item.title,
          type: item.courseType,
          fee: item.fee,
        }
      : undefined,
  };
};

const verifyAndEnroll = async (body: Record<string, any>) => {
  const { verifyUrl, apiKey } = getUddoktaPayConfig();
  const invoiceId = String(body.invoiceId || body.invoice_id || '').trim();

  if (!invoiceId) {
    throw new Error('Missing invoice_id from UddoktaPay redirect.');
  }

  const response = await fetch(verifyUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'RT-UDDOKTAPAY-API-KEY': apiKey,
    },
    body: JSON.stringify({ invoice_id: invoiceId }),
  });

  const payment = await response.json().catch(() => ({}));

  const paymentStatus = String(payment.status || '').toUpperCase();

  if (!response.ok || paymentStatus === 'ERROR') {
    throw new Error(String(payment.message || 'Unable to verify UddoktaPay payment.'));
  }

  const metadata = parseMetadata(payment.metadata);
  const userId = String(metadata.userId || metadata.user_id || '').trim();
  const courseId = String(metadata.courseId || metadata.course_id || '').trim();
  const itemId = String(
    metadata.itemId ||
    metadata.item_id ||
    courseId ||
    metadata.productId ||
    metadata.suggestionId ||
    metadata.challengeId ||
    ''
  ).trim();
  const inferredItemType = courseId
    ? 'COURSE'
    : metadata.challengeId
      ? 'CHALLENGE'
      : (metadata.productId || metadata.suggestionId)
        ? 'SUGGESTION'
        : '';
  const itemType = String(metadata.itemType || inferredItemType).toUpperCase() as PaymentItemType;
  const itemTitle = String(
    metadata.itemTitle ||
    metadata.courseTitle ||
    metadata.challengeTitle ||
    'ICT Toppers Purchase'
  ).trim();
  const catalogItem = itemId ? PAYMENT_CATALOG[itemId] : null;
  const item: PaymentItemConfig | null = catalogItem || (
    itemType === 'SUGGESTION'
      ? {
          id: itemId || SUGGESTION_ITEM_ID,
          title: itemTitle || PAYMENT_CATALOG[SUGGESTION_ITEM_ID].title,
          itemType: 'SUGGESTION',
          fee: toPositiveAmount(metadata.amount || payment.amount, PAYMENT_CATALOG[SUGGESTION_ITEM_ID].fee),
        }
      : itemType === 'CHALLENGE' && itemId
        ? {
            id: itemId,
            title: itemTitle || 'HSC ICT Monthly Quiz Exam',
            itemType: 'CHALLENGE',
            fee: toPositiveAmount(metadata.amount || payment.amount, 20),
            challengeMonth: String(metadata.challengeMonth || '').trim() || undefined,
            challengeYear: Number.isFinite(Number(metadata.challengeYear)) ? Number(metadata.challengeYear) : new Date().getFullYear(),
          }
        : null
  );

  if (paymentStatus !== 'COMPLETED') {
    return {
      enrolled: false,
      payment,
      message: `Payment status is ${payment.status || 'UNKNOWN'}. Access will remain pending until payment is completed.`,
    };
  }

  if (!userId || !item) {
    throw new Error('Verified payment is missing purchase or student metadata.');
  }

  const db = getAdminDb();
  const paidAmount = Number(payment.amount || metadata.amount || item.fee);
  const chargedAmount = Number(payment.charged_amount || payment.amount || metadata.amount || item.fee);
  const email = String(payment.email || metadata.email || '').trim();
  const invoice = String(payment.invoice_id || invoiceId);
  const paymentDetails = {
    provider: 'uddoktapay',
    invoiceId: invoice,
    transactionId: payment.transaction_id || null,
    paymentMethod: payment.payment_method || null,
    senderNumber: payment.sender_number || null,
  };

  if (item.itemType === 'COURSE') {
    const enrollment = {
      userId,
      email,
      courseId: item.id,
      courseTitle: item.title,
      courseType: item.courseType,
      amount: paidAmount,
      chargedAmount,
      paymentStatus: 'PAID',
      status: 'enrolled',
      ...paymentDetails,
      enrolledAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const batch = db.batch();
    batch.set(db.collection('students').doc(userId), {
      userId,
      email: enrollment.email,
      status: 'enrolled',
      enrolledCourses: FieldValue.arrayUnion(item.id),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    batch.set(db.collection('students').doc(userId).collection('enrollments').doc(item.id), enrollment, { merge: true });
    batch.set(db.collection('courseEnrollments').doc(invoice), enrollment, { merge: true });
    await batch.commit();

    return {
      enrolled: true,
      payment,
      item,
      enrollment: {
        courseId: item.id,
        courseTitle: item.title,
        courseType: item.courseType,
        amount: paidAmount,
        status: 'enrolled',
      },
    };
  }

  if (item.itemType === 'SUGGESTION') {
    const purchase = {
      userId,
      email,
      itemId: item.id,
      itemTitle: item.title,
      itemType: item.itemType,
      amount: paidAmount,
      chargedAmount,
      paymentStatus: 'PAID',
      status: 'active',
      ...paymentDetails,
      purchasedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const batch = db.batch();
    batch.set(db.collection('students').doc(userId), {
      userId,
      email,
      hasPurchasedSuggestion: true,
      purchasedSuggestions: FieldValue.arrayUnion(item.id),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    batch.set(db.collection('students').doc(userId).collection('purchases').doc(item.id), purchase, { merge: true });
    batch.set(db.collection('productPurchases').doc(invoice), purchase, { merge: true });
    await batch.commit();

    return {
      enrolled: true,
      payment,
      item,
      purchase: {
        itemId: item.id,
        itemTitle: item.title,
        itemType: item.itemType,
        amount: paidAmount,
        status: 'active',
      },
    };
  }

  const challengeEnrollment = {
    userId,
    email,
    challengeId: item.id,
    challengeTitle: item.title,
    challenge: {
      month: item.challengeMonth || String(metadata.challengeMonth || new Date().toLocaleString('default', { month: 'long' })),
      year: item.challengeYear || Number(metadata.challengeYear) || new Date().getFullYear(),
      fee: item.fee,
    },
    amount: paidAmount,
    chargedAmount,
    paymentStatus: 'PAID',
    score: null,
    ...paymentDetails,
    enrolledAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const batch = db.batch();
  batch.set(db.collection('students').doc(userId), {
    userId,
    email: challengeEnrollment.email,
    enrolledChallenges: FieldValue.arrayUnion(item.id),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  batch.set(db.collection('students').doc(userId).collection('challengeEnrollments').doc(item.id), challengeEnrollment, { merge: true });
  batch.set(db.collection('challengeEnrollments').doc(invoice), challengeEnrollment, { merge: true });
  await batch.commit();

  return {
    enrolled: true,
    payment,
    item,
    challengeEnrollment: {
      challengeId: item.id,
      challengeTitle: item.title,
      challenge: challengeEnrollment.challenge,
      amount: paidAmount,
      paymentStatus: 'PAID',
      score: null,
    },
  };
};

export default async function paymentAction(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { success: false, error: 'Method not allowed.' });
  }

  try {
    const body = parseBody(req.body);
    const action = String(body.action || '');
    const origin = typeof req.headers?.origin === 'string'
      ? req.headers.origin
      : typeof req.headers?.host === 'string'
        ? `https://${req.headers.host}`
        : undefined;

    if (action === 'createPayment') {
      const result = await createPayment(body, origin);
      return json(res, 200, { success: true, ...result });
    }

    if (action === 'verifyPayment') {
      const result = await verifyAndEnroll(body);
      return json(res, 200, { success: true, ...result });
    }

    return json(res, 400, { success: false, error: 'Unknown payment action.' });
  } catch (error: any) {
    console.error('paymentAction error:', error);
    return json(res, 500, {
      success: false,
      error: error?.message || 'Payment action failed.',
    });
  }
}
