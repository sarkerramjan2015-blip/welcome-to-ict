export interface CreateCoursePaymentInput {
  userId: string;
  fullName: string;
  email: string;
  courseId: string;
}

export interface CreateSuggestionPaymentInput {
  userId: string;
  fullName: string;
  email: string;
}

export interface CreateChallengePaymentInput {
  userId: string;
  fullName: string;
  email: string;
  challengeId: string;
  challengeTitle: string;
  amount: number;
  challengeMonth?: string;
  challengeYear?: number;
}

export interface CreatePaymentResult {
  success: true;
  paymentUrl: string;
  item: {
    id: string;
    title: string;
    itemType: 'COURSE' | 'SUGGESTION' | 'CHALLENGE';
    fee: number;
    courseType?: 'RECORDED' | 'LIVE';
  };
  course?: {
    title: string;
    type: 'RECORDED' | 'LIVE';
    fee: number;
  };
}

export type CreateCoursePaymentResult = CreatePaymentResult;

export interface VerifyPaymentResult {
  success: true;
  enrolled: boolean;
  message?: string;
  item?: {
    id: string;
    title: string;
    itemType: 'COURSE' | 'SUGGESTION' | 'CHALLENGE';
    fee: number;
    courseType?: 'RECORDED' | 'LIVE';
  };
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
  purchase?: {
    itemId: string;
    itemTitle: string;
    itemType: 'SUGGESTION';
    amount: number;
    status: 'active';
  };
  challengeEnrollment?: {
    challengeId: string;
    challengeTitle?: string;
    challenge: {
      month: string;
      year: number;
      fee: number;
    };
    amount: number;
    paymentStatus: 'PAID';
    score: null;
  };
}

export type VerifyCoursePaymentResult = VerifyPaymentResult;

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
  postPaymentAction<CreatePaymentResult>({
    action: 'createPayment',
    itemType: 'COURSE',
    ...input,
  });

export const createSuggestionPayment = (input: CreateSuggestionPaymentInput) =>
  postPaymentAction<CreatePaymentResult>({
    action: 'createPayment',
    itemType: 'SUGGESTION',
    itemId: 'hsc-ict-master-suggestion',
    ...input,
  });

export const createChallengePayment = (input: CreateChallengePaymentInput) =>
  postPaymentAction<CreatePaymentResult>({
    action: 'createPayment',
    itemType: 'CHALLENGE',
    ...input,
  });

export const verifyCoursePayment = (invoiceId: string) =>
  postPaymentAction<VerifyPaymentResult>({
    action: 'verifyPayment',
    invoiceId,
  });
