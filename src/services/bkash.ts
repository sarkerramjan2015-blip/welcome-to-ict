const BKASH_BASE_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta";

interface BkashTokenResponse {
  statusCode: string;
  statusMessage: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export const getBkashToken = async (): Promise<string> => {
  const { BKASH_APP_KEY, BKASH_APP_SECRET, BKASH_USERNAME, BKASH_PASSWORD } = process.env;

  const response = await fetch(`${BKASH_BASE_URL}/tokenized/checkout/token/grant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "username": BKASH_USERNAME || "",
      "password": BKASH_PASSWORD || "",
    },
    body: JSON.stringify({
      app_key: BKASH_APP_KEY,
      app_secret: BKASH_APP_SECRET,
    }),
  });

  const data = await response.json() as BkashTokenResponse;
  
  if (!data.id_token) {
    console.error("Failed to get bKash token", data);
    throw new Error("Failed to get bKash token");
  }

  return data.id_token;
};

export const createPayment = async (amount: number, invoiceId: string) => {
  const token = await getBkashToken();
  const { BKASH_APP_KEY } = process.env;

  const response = await fetch(`${BKASH_BASE_URL}/tokenized/checkout/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
      "X-APP-Key": BKASH_APP_KEY || "",
    },
    body: JSON.stringify({
      mode: "0011",
      payerReference: "User Enrollment",
      callbackURL: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/api/challenges/pay/bkash/callback`,
      amount: amount.toString(),
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: invoiceId,
    }),
  });

  const data = await response.json();
  return data; // contains bkashURL and paymentID
};

export const executePayment = async (paymentID: string) => {
  const token = await getBkashToken();
  const { BKASH_APP_KEY } = process.env;

  const response = await fetch(`${BKASH_BASE_URL}/tokenized/checkout/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
      "X-APP-Key": BKASH_APP_KEY || "",
    },
    body: JSON.stringify({ paymentID }),
  });

  const data = await response.json();
  return data; // contains statusCode, statusMessage, trxID
};
