export interface CreateCoursePaymentInput {
  userId: string;
  fullName: string;
  email: string;
  courseId: string;
}

export interface CreateCoursePaymentResult {
  success: true;
  paymentUrl: string;
  course: {
    title: string;
    type: 'RECORDED' | 'LIVE';
    fee: number;
  };
}

export interface VerifyCoursePaymentResult {
  success: true;
  enrolled: boolean;
  message?: string;
  payment: {
    invoice_id?: string;
    status?: string;
    amount?: string;
    metadata?: Record<string, any>;
  };
  enrollment?: {
    courseId: string;
    courseTitle?: string;
    courseType: 'RECORDED' | 'LIVE';
    amount: number;
    status: 'enrolled';
  };
}

const postPaymentAction = async <T,>(body: Record<string, unknown>): Promise<T> => {
  const response = await fetch('/api/paymentAction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Payment request failed.');
  }

  return data as T;
};

export const createCoursePayment = (input: CreateCoursePaymentInput) =>
  postPaymentAction<CreateCoursePaymentResult>({
    action: 'createPayment',
    ...input,
  });

export const verifyCoursePayment = (invoiceId: string) =>
  postPaymentAction<VerifyCoursePaymentResult>({
    action: 'verifyPayment',
    invoiceId,
  });
