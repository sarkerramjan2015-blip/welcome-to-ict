const cleanString = (value: unknown) =>
  String(value || '').replace(/['"]/g, '').trim();

const getFirebaseClientConfig = () => ({
  apiKey: cleanString(process.env.VITE_FIREBASE_API_KEY),
  authDomain: cleanString(process.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: cleanString(process.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: cleanString(process.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanString(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanString(process.env.VITE_FIREBASE_APP_ID),
  measurementId: cleanString(process.env.VITE_FIREBASE_MEASUREMENT_ID),
});

export default function firebaseConfig(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const config = getFirebaseClientConfig();
  const missingKeys = Object.entries({
    VITE_FIREBASE_API_KEY: config.apiKey,
    VITE_FIREBASE_AUTH_DOMAIN: config.authDomain,
    VITE_FIREBASE_PROJECT_ID: config.projectId,
    VITE_FIREBASE_APP_ID: config.appId,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  res.setHeader('Cache-Control', 'no-store');

  if (missingKeys.length > 0) {
    return res.status(500).json({
      success: false,
      error: `Firebase client config is missing: ${missingKeys.join(', ')}`,
    });
  }

  return res.status(200).json({
    success: true,
    config,
  });
}
