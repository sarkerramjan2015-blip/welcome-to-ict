import { getFirebaseAuth, getFirebaseDb, getFirebaseStorage } from '../lib/firebase';

export type ManualPaymentMethod = 'bKash' | 'Nagad';
export type ManualPaymentStatus = 'pending' | 'approved' | 'rejected';

export interface SubmitManualPaymentInput {
  userId: string;
  courseId: string;
  courseTitle?: string;
  amount?: number;
  paymentType?: 'premium' | 'quiz' | 'course';
  method: ManualPaymentMethod;
  senderNumber: string;
  trxId: string;
  screenshotFile: File;
  onProgress?: (progress: number) => void;
  onStatus?: (status: string) => void;
}

export interface SubmitManualPaymentResult {
  paymentId: string;
  screenshotUrl: string;
}

export interface ManualPaymentRecord {
  id: string;
  userId: string;
  email?: string | null;
  courseId: string;
  courseTitle?: string | null;
  amount?: number | null;
  paymentType?: 'premium' | 'quiz' | 'course' | string;
  method: ManualPaymentMethod;
  senderNumber: string;
  trxId: string;
  screenshotUrl?: string | null;
  screenshotStoragePath?: string | null;
  screenshotUploadMode?: string | null;
  screenshotStorageError?: string | null;
  status: ManualPaymentStatus;
  createdAt?: string | null;
  updatedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  reviewedAt?: string | null;
}

const cleanPathPart = (value: string) =>
  value.trim().replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'unknown';

const cleanFileName = (value: string) =>
  value.trim().replace(/[^a-zA-Z0-9_.-]+/g, '-').replace(/^-+|-+$/g, '') || 'screenshot.jpg';

const withTimeout = async <T,>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string,
  onTimeout?: () => void
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          onTimeout?.();
          reject(new Error(message));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

const waitForFirebaseUser = async () => {
  const auth = await getFirebaseAuth();
  if (!auth) return null;

  const authWithReady = auth as typeof auth & { authStateReady?: () => Promise<void> };
  if (authWithReady.authStateReady) {
    await withTimeout(
      authWithReady.authStateReady(),
      7000,
      'Firebase login session is taking too long. Please refresh and try again.'
    );
    return auth.currentUser;
  }

  if (auth.currentUser) {
    return auth.currentUser;
  }

  const { onAuthStateChanged } = await import('firebase/auth');

  return withTimeout(
    new Promise<typeof auth.currentUser>(resolve => {
      const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
        unsubscribe();
        resolve(firebaseUser);
      });
    }),
    7000,
    'Firebase login session is taking too long. Please refresh and try again.'
  );
};

export const getFirebaseIdToken = async () => {
  const firebaseUser = await waitForFirebaseUser();
  return firebaseUser ? firebaseUser.getIdToken() : '';
};

const resolvePaymentType = (courseId: string): 'premium' | 'quiz' | 'course' => {
  if (courseId.startsWith('premium-')) return 'premium';
  if (courseId.startsWith('quiz-')) return 'quiz';
  return 'course';
};

const getManualPaymentAuthHeaders = async () => {
  const token = await getFirebaseIdToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseManualPaymentApiResponse = async <T,>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.success === false) {
    throw new Error(String(data?.error || data?.message || 'Manual payment request failed.'));
  }
  return data as T;
};

const saveManualPaymentViaApi = async (payment: Record<string, unknown>) => {
  const response = await fetch('/api/manualPayments', {
    method: 'POST',
    headers: await getManualPaymentAuthHeaders(),
    body: JSON.stringify({ action: 'submit', payment }),
  });

  return parseManualPaymentApiResponse<{ success: true; paymentId: string }>(response);
};

export const fetchManualPayments = async (filters: { userId?: string; status?: ManualPaymentStatus } = {}) => {
  const params = new URLSearchParams();
  if (filters.userId) params.set('userId', filters.userId);
  if (filters.status) params.set('status', filters.status);

  const response = await fetch(`/api/manualPayments${params.toString() ? `?${params}` : ''}`, {
    headers: await getManualPaymentAuthHeaders(),
  });

  const data = await parseManualPaymentApiResponse<{ success: true; payments: ManualPaymentRecord[] }>(response);
  return data.payments || [];
};

export const approveManualPayment = async (paymentId: string) => {
  const response = await fetch('/api/manualPayments', {
    method: 'POST',
    headers: await getManualPaymentAuthHeaders(),
    body: JSON.stringify({ action: 'approve', paymentId }),
  });

  const data = await parseManualPaymentApiResponse<{ success: true; payment: ManualPaymentRecord }>(response);
  return data.payment;
};

export const rejectManualPayment = async (paymentId: string) => {
  const response = await fetch('/api/manualPayments', {
    method: 'POST',
    headers: await getManualPaymentAuthHeaders(),
    body: JSON.stringify({ action: 'reject', paymentId }),
  });

  const data = await parseManualPaymentApiResponse<{ success: true; payment: ManualPaymentRecord }>(response);
  return data.payment;
};

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read the screenshot image.'));
    };
    image.src = url;
  });

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read the screenshot file.'));
    reader.readAsDataURL(file);
  });

const makeFirestoreScreenshotDataUrl = async (file: File) => {
  const image = await loadImage(file);
  const maxSide = 900;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    const dataUrl = await fileToDataUrl(file);
    if (dataUrl.length > 850_000) {
      throw new Error('Screenshot is too large for fallback save. Please upload a smaller screenshot.');
    }
    return dataUrl;
  }

  context.drawImage(image, 0, 0, width, height);

  for (const quality of [0.72, 0.62, 0.52, 0.42]) {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    if (dataUrl.length <= 850_000) {
      return dataUrl;
    }
  }

  throw new Error('Screenshot is too large after compression. Please upload a smaller screenshot.');
};

const prepareScreenshotForUpload = async (file: File) => {
  if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.size <= 750 * 1024) {
    return file;
  }

  try {
    const image = await loadImage(file);
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return file;

    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.82);
    });

    if (!blob || blob.size >= file.size) {
      return file;
    }

    return new File(
      [blob],
      file.name.replace(/\.[^.]+$/, '') + '.jpg',
      { type: 'image/jpeg', lastModified: Date.now() }
    );
  } catch {
    return file;
  }
};

export const submitManualPayment = async ({
  userId,
  courseId,
  courseTitle,
  amount,
  paymentType,
  method,
  senderNumber,
  trxId,
  screenshotFile,
  onProgress,
  onStatus,
}: SubmitManualPaymentInput): Promise<SubmitManualPaymentResult> => {
  const trimmedUserId = userId.trim();
  const trimmedCourseId = courseId.trim();
  const trimmedSenderNumber = senderNumber.trim();
  const trimmedTrxId = trxId.trim();

  if (!trimmedUserId) throw new Error('User session is required before submitting payment.');
  if (!trimmedCourseId) throw new Error('Course ID is required.');
  if (!/^01\d{9}$/.test(trimmedSenderNumber)) throw new Error('Sender number must be a valid 11-digit Bangladeshi phone number.');
  if (!trimmedTrxId) throw new Error('Transaction ID is required.');
  if (!screenshotFile?.type?.startsWith('image/')) throw new Error('Payment screenshot must be an image file.');

  onStatus?.('Checking login session...');
  const firebaseUser = await waitForFirebaseUser();
  const paymentUserId = firebaseUser?.uid || trimmedUserId;

  onStatus?.('Connecting to Firebase...');
  const [db, storage] = await Promise.all([
    getFirebaseDb(),
    getFirebaseStorage(),
  ]);

  onStatus?.('Preparing screenshot...');
  const uploadFile = await withTimeout(
    prepareScreenshotForUpload(screenshotFile),
    12000,
    'Screenshot processing took too long. Please try a smaller image.'
  );
  const screenshotPath = [
    'payment_screenshots',
    cleanPathPart(paymentUserId),
    cleanPathPart(trimmedCourseId),
    `${Date.now()}-${cleanPathPart(trimmedTrxId)}-${cleanFileName(uploadFile.name)}`,
  ].join('/');

  let screenshotUrl = '';
  let screenshotUploadMode: 'storage' | 'firestore-data-url' = 'storage';
  let screenshotStorageError = '';

  onStatus?.('Uploading screenshot...');
  if (storage) {
    try {
      const { getDownloadURL, ref, uploadBytesResumable } = await import('firebase/storage');
      const uploadTask = uploadBytesResumable(ref(storage, screenshotPath), uploadFile, {
        contentType: uploadFile.type,
        customMetadata: {
          userId: paymentUserId,
          courseId: trimmedCourseId,
          trxId: trimmedTrxId,
        },
      });

      const uploaded = await new Promise<{ ref: typeof uploadTask.snapshot.ref }>((resolve, reject) => {
        let settled = false;
        const timeoutId = setTimeout(() => {
          if (settled) return;
          settled = true;
          uploadTask.cancel();
          reject(new Error('Screenshot upload timed out.'));
        }, 12000);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = snapshot.totalBytes > 0
              ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
              : 0;
            onProgress?.(Math.min(progress, 99));
          },
          error => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            reject(error);
          },
          () => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            onProgress?.(100);
            resolve(uploadTask.snapshot);
          }
        );
      });

      onStatus?.('Finalizing screenshot...');
      screenshotUrl = await withTimeout(
        getDownloadURL(uploaded.ref),
        15000,
        'Could not finalize screenshot upload. Please try again.'
      );
    } catch (error) {
      screenshotUploadMode = 'firestore-data-url';
      screenshotStorageError = error instanceof Error ? error.message : String(error || 'Storage upload failed.');
      onProgress?.(100);
      onStatus?.('Storage is slow. Saving compressed screenshot...');
      screenshotUrl = await withTimeout(
        makeFirestoreScreenshotDataUrl(uploadFile),
        12000,
        'Fallback screenshot save took too long. Please try a smaller screenshot.'
      );
    }
  } else {
    screenshotUploadMode = 'firestore-data-url';
    screenshotStorageError = 'Firebase Storage is not configured.';
    onProgress?.(100);
    onStatus?.('Saving compressed screenshot...');
    screenshotUrl = await withTimeout(
      makeFirestoreScreenshotDataUrl(uploadFile),
      12000,
      'Fallback screenshot save took too long. Please try a smaller screenshot.'
    );
  }

  onStatus?.('Saving payment request...');
  const paymentPayload = {
    userId: paymentUserId,
    courseId: trimmedCourseId,
    courseTitle: courseTitle?.trim() || null,
    amount: typeof amount === 'number' ? amount : null,
    paymentType: paymentType || resolvePaymentType(trimmedCourseId),
    method,
    senderNumber: trimmedSenderNumber,
    trxId: trimmedTrxId,
    screenshotUrl,
    screenshotStoragePath: screenshotUploadMode === 'storage' ? screenshotPath : null,
    screenshotUploadMode,
    screenshotStorageError,
  };

  let paymentId = '';

  try {
    const result = await withTimeout(
      saveManualPaymentViaApi(paymentPayload),
      20000,
      'Payment save timed out. Please try again.'
    );
    paymentId = result.paymentId;
  } catch (apiError) {
    if (!db) {
      throw apiError;
    }

    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
    const paymentRef = await withTimeout(
      addDoc(collection(db, 'payments'), {
        ...paymentPayload,
        status: 'pending' as const,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
      20000,
      'Payment save timed out. Please check Firestore rules and try again.'
    );
    paymentId = paymentRef.id;
  }

  return {
    paymentId,
    screenshotUrl,
  };
};

export const getPendingPaymentsQuery = async () => {
  const db = await getFirebaseDb();

  if (!db) {
    throw new Error('Firestore is not configured.');
  }

  const { collection, query, where } = await import('firebase/firestore');

  return query(
    collection(db, 'payments'),
    where('status', '==', 'pending')
  );
};
