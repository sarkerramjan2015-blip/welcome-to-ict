import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { FieldValue, getFirestore, type DocumentSnapshot, type Query } from 'firebase-admin/firestore';

const ADMIN_EMAIL = 'sarkerramjan2015@gmail.com';
const VALID_STATUSES = new Set(['pending', 'approved', 'rejected']);

const json = (res: any, status: number, payload: Record<string, unknown>) => {
  res.status(status).json(payload);
};

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

const httpError = (status: number, message: string) =>
  Object.assign(new Error(message), { status });

const getFirebaseServiceAccount = () => {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    const parsed = JSON.parse(serviceAccount);
    if (parsed.private_key) {
      parsed.private_key = String(parsed.private_key).replace(/\\n/g, '\n');
    }
    return parsed;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw httpError(
      500,
      'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};

const getAdminApp = (): App => {
  if (!getApps().length) {
    initializeApp({
      credential: cert(getFirebaseServiceAccount()),
    });
  }

  return getApps()[0];
};

const getAdminDb = () => getFirestore(getAdminApp());
const getAdminAuth = () => getAuth(getAdminApp());

const getBearerToken = (req: any) => {
  const header = String(req.headers?.authorization || req.headers?.Authorization || '');
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || '';
};

const verifyRequest = async (req: any) => {
  const token = getBearerToken(req);
  if (!token) {
    throw httpError(401, 'Firebase login is required.');
  }

  return getAdminAuth().verifyIdToken(token);
};

const isAdminToken = (decoded: DecodedIdToken) =>
  String(decoded.email || '').trim().toLowerCase() === ADMIN_EMAIL;

const requireAdmin = (decoded: DecodedIdToken) => {
  if (!isAdminToken(decoded)) {
    throw httpError(403, 'Admin approval is required for this action.');
  }
};

const queryValue = (req: any, key: string) => {
  const value = req.query?.[key];
  if (Array.isArray(value)) return String(value[0] || '').trim();
  return String(value || '').trim();
};

const serializeValue = (value: any): any => {
  if (!value) return value;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serializeValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, serializeValue(nested)])
    );
  }
  return value;
};

const serializePaymentDoc = (snapshot: DocumentSnapshot) => ({
  id: snapshot.id,
  ...serializeValue(snapshot.data() || {}),
});

const resolvePaymentType = (courseId: string) => {
  if (courseId.startsWith('premium-')) return 'premium';
  if (courseId.startsWith('quiz-')) return 'quiz';
  return 'course';
};

const resolvePremiumPlan = (courseId: string) => {
  if (courseId.includes('monthly')) return 'monthly';
  if (courseId.includes('yearly')) return 'yearly';
  return null;
};

const cleanString = (value: unknown) => String(value || '').trim();

const submitManualPayment = async (req: any) => {
  const decoded = await verifyRequest(req);
  const body = parseBody(req.body);
  const payment = (body.payment || body) as Record<string, any>;

  const userId = cleanString(payment.userId);
  const courseId = cleanString(payment.courseId);
  const method = cleanString(payment.method);
  const senderNumber = cleanString(payment.senderNumber);
  const trxId = cleanString(payment.trxId);
  const screenshotUrl = cleanString(payment.screenshotUrl);
  const screenshotStoragePath = cleanString(payment.screenshotStoragePath);
  const screenshotUploadMode = cleanString(payment.screenshotUploadMode) || 'storage';
  const screenshotStorageError = cleanString(payment.screenshotStorageError);
  const courseTitle = cleanString(payment.courseTitle);
  const amount = Number(payment.amount);

  if (!userId || userId !== decoded.uid) {
    throw httpError(403, 'Payment user does not match the logged-in Firebase user.');
  }
  if (!courseId) throw httpError(400, 'Course or payment item is required.');
  if (!['bKash', 'Nagad'].includes(method)) throw httpError(400, 'Invalid payment method.');
  if (!/^01\d{9}$/.test(senderNumber)) throw httpError(400, 'Sender number must be a valid 11-digit Bangladeshi phone number.');
  if (!trxId) throw httpError(400, 'Transaction ID is required.');
  if (!screenshotUrl) throw httpError(400, 'Payment screenshot is required.');

  const paymentType = cleanString(payment.paymentType) || resolvePaymentType(courseId);
  const db = getAdminDb();
  const paymentRef = await db.collection('payments').add({
    userId,
    email: decoded.email || null,
    courseId,
    courseTitle: courseTitle || null,
    amount: Number.isFinite(amount) ? amount : null,
    paymentType,
    method,
    senderNumber,
    trxId,
    screenshotUrl,
    screenshotStoragePath: screenshotStoragePath || null,
    screenshotUploadMode,
    screenshotStorageError,
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return {
    paymentId: paymentRef.id,
  };
};

const listManualPayments = async (req: any) => {
  const decoded = await verifyRequest(req);
  const requestedUserId = queryValue(req, 'userId');
  const requestedStatus = queryValue(req, 'status').toLowerCase();
  const isAdmin = isAdminToken(decoded);

  if (requestedStatus && !VALID_STATUSES.has(requestedStatus)) {
    throw httpError(400, 'Invalid payment status filter.');
  }

  if (!requestedUserId && requestedStatus === 'pending' && !isAdmin) {
    throw httpError(403, 'Only admins can read all pending payments.');
  }

  const userId = requestedUserId || (!isAdmin ? decoded.uid : '');
  if (userId && !isAdmin && userId !== decoded.uid) {
    throw httpError(403, 'You can only read your own payment requests.');
  }

  let query: Query = getAdminDb().collection('payments');
  if (userId) query = query.where('userId', '==', userId);
  if (requestedStatus) query = query.where('status', '==', requestedStatus);

  const snapshot = await query.get();
  const payments = snapshot.docs
    .map(serializePaymentDoc)
    .sort((a: any, b: any) => {
      const aTime = new Date(a.createdAt || 0).getTime();
      const bTime = new Date(b.createdAt || 0).getTime();
      return bTime - aTime;
    });

  return {
    payments,
  };
};

const approveManualPayment = async (paymentId: string, decoded: DecodedIdToken) => {
  requireAdmin(decoded);
  if (!paymentId) throw httpError(400, 'Payment ID is required.');

  const db = getAdminDb();
  const paymentRef = db.collection('payments').doc(paymentId);
  const paymentSnap = await paymentRef.get();

  if (!paymentSnap.exists) {
    throw httpError(404, 'Payment request was not found.');
  }

  const payment = paymentSnap.data() || {};
  const userId = cleanString(payment.userId);
  const courseId = cleanString(payment.courseId);
  const paymentType = cleanString(payment.paymentType) || resolvePaymentType(courseId);

  if (!userId) throw httpError(400, 'Payment request is missing the student ID.');

  const approvedAt = FieldValue.serverTimestamp();
  const batch = db.batch();

  batch.set(paymentRef, {
    status: 'approved',
    reviewedBy: decoded.email || ADMIN_EMAIL,
    approvedAt,
    reviewedAt: approvedAt,
    updatedAt: approvedAt,
  }, { merge: true });

  const studentRef = db.collection('students').doc(userId);
  const commonStudentFields = {
    userId,
    email: payment.email || null,
    updatedAt: approvedAt,
  };

  if (paymentType === 'premium') {
    const premiumPlan = resolvePremiumPlan(courseId);
    batch.set(studentRef, {
      ...commonStudentFields,
      isPremium: true,
      premiumPlan,
      premiumSince: approvedAt,
      premiumPaymentId: paymentId,
    }, { merge: true });
  } else if (paymentType === 'quiz') {
    const challengeId = courseId.replace(/^quiz-/, '');
    const challengeEnrollment = {
      userId,
      email: payment.email || null,
      challengeId,
      challengeTitle: payment.courseTitle || 'HSC ICT Monthly Quiz Exam',
      paymentId,
      paymentStatus: 'PAID',
      status: 'approved',
      amount: payment.amount || null,
      method: payment.method || null,
      trxId: payment.trxId || null,
      score: null,
      updatedAt: approvedAt,
      enrolledAt: approvedAt,
    };

    batch.set(studentRef, {
      ...commonStudentFields,
      enrolledChallenges: FieldValue.arrayUnion(challengeId),
    }, { merge: true });
    batch.set(studentRef.collection('challengeEnrollments').doc(challengeId), challengeEnrollment, { merge: true });
    batch.set(db.collection('challengeEnrollments').doc(paymentId), challengeEnrollment, { merge: true });
  } else {
    batch.set(studentRef, {
      ...commonStudentFields,
      approvedManualPayments: FieldValue.arrayUnion(paymentId),
    }, { merge: true });
  }

  await batch.commit();

  const updated = await paymentRef.get();
  return {
    payment: serializePaymentDoc(updated),
  };
};

const rejectManualPayment = async (paymentId: string, decoded: DecodedIdToken) => {
  requireAdmin(decoded);
  if (!paymentId) throw httpError(400, 'Payment ID is required.');

  const paymentRef = getAdminDb().collection('payments').doc(paymentId);
  const paymentSnap = await paymentRef.get();
  if (!paymentSnap.exists) throw httpError(404, 'Payment request was not found.');

  await paymentRef.set({
    status: 'rejected',
    reviewedBy: decoded.email || ADMIN_EMAIL,
    rejectedAt: FieldValue.serverTimestamp(),
    reviewedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  const updated = await paymentRef.get();
  return {
    payment: serializePaymentDoc(updated),
  };
};

export default async function manualPayments(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      return json(res, 200, { success: true, ...(await listManualPayments(req)) });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { success: false, error: 'Method not allowed.' });
    }

    const body = parseBody(req.body);
    const action = cleanString(body.action || 'submit');

    if (action === 'submit') {
      return json(res, 200, { success: true, ...(await submitManualPayment(req)) });
    }

    const decoded = await verifyRequest(req);
    const paymentId = cleanString(body.paymentId);

    if (action === 'approve') {
      return json(res, 200, { success: true, ...(await approveManualPayment(paymentId, decoded)) });
    }

    if (action === 'reject') {
      return json(res, 200, { success: true, ...(await rejectManualPayment(paymentId, decoded)) });
    }

    return json(res, 400, { success: false, error: 'Unknown manual payment action.' });
  } catch (error: any) {
    console.error('manualPayments error:', error);
    return json(res, error?.status || 500, {
      success: false,
      error: error?.message || 'Manual payment request failed.',
    });
  }
}
