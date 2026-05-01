import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

type CourseId = 'recorded-1' | 'live-1';

interface CourseConfig {
  title: string;
  type: 'RECORDED' | 'LIVE';
  fee: number;
}

const COURSE_CATALOG: Record<CourseId, CourseConfig> = {
  'recorded-1': {
    title: 'ICT Full Course Recorded',
    type: 'RECORDED',
    fee: 500,
  },
  'live-1': {
    title: 'HSC ICT Live Course',
    type: 'LIVE',
    fee: 1500,
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

const buildPaymentUrls = (configuredUrl: string) => {
  const cleanedUrl = cleanBaseUrl(configuredUrl);

  if (cleanedUrl.endsWith('/api/checkout-v2')) {
    return {
      checkoutUrl: cleanedUrl,
      verifyUrl: cleanedUrl.replace(/\/api\/checkout-v2$/, '/api/verify-payment'),
    };
  }

  return {
    checkoutUrl: `${cleanedUrl}/api/checkout-v2`,
    verifyUrl: `${cleanedUrl}/api/verify-payment`,
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
  const courseId = String(body.courseId || '') as CourseId;
  const course = COURSE_CATALOG[courseId];

  if (!course) {
    throw new Error('Invalid course selected.');
  }

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
    amount: String(course.fee),
    metadata: {
      userId,
      user_id: userId,
      email,
      courseId,
      course_id: courseId,
      courseTitle: course.title,
      courseType: course.type,
      amount: course.fee,
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
    course,
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

  if (!response.ok || payment.status === 'ERROR') {
    throw new Error(String(payment.message || 'Unable to verify UddoktaPay payment.'));
  }

  const metadata = payment.metadata || {};
  const userId = String(metadata.userId || metadata.user_id || '').trim();
  const courseId = String(metadata.courseId || metadata.course_id || '').trim();
  const course = COURSE_CATALOG[courseId as CourseId];

  if (payment.status !== 'COMPLETED') {
    return {
      enrolled: false,
      payment,
      message: `Payment status is ${payment.status || 'UNKNOWN'}. Enrollment is pending until payment is completed.`,
    };
  }

  if (!userId || !course) {
    throw new Error('Verified payment is missing course or student metadata.');
  }

  const db = getAdminDb();
  const enrollment = {
    userId,
    email: String(payment.email || metadata.email || '').trim(),
    courseId,
    courseTitle: course.title,
    courseType: course.type,
    amount: Number(payment.amount || course.fee),
    chargedAmount: Number(payment.charged_amount || payment.amount || course.fee),
    paymentStatus: 'PAID',
    status: 'enrolled',
    provider: 'uddoktapay',
    invoiceId: payment.invoice_id || invoiceId,
    transactionId: payment.transaction_id || null,
    paymentMethod: payment.payment_method || null,
    senderNumber: payment.sender_number || null,
    enrolledAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const batch = db.batch();
  batch.set(db.collection('students').doc(userId), {
    userId,
    email: enrollment.email,
    status: 'enrolled',
    enrolledCourses: FieldValue.arrayUnion(courseId),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  batch.set(db.collection('students').doc(userId).collection('enrollments').doc(courseId), enrollment, { merge: true });
  batch.set(db.collection('courseEnrollments').doc(String(enrollment.invoiceId)), enrollment, { merge: true });
  await batch.commit();

  return {
    enrolled: true,
    payment,
    enrollment,
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
