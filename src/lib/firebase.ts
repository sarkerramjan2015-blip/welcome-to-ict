import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/** Strip accidental literal quote characters that Vercel can inject into env values. */
function sanitizeEnv(value: string | undefined): string {
  if (!value) return '';
  return String(value).replace(/['"]/g, '').trim();
}

const firebaseConfig = {
  apiKey:            sanitizeEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain:        sanitizeEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId:         sanitizeEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket:     sanitizeEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: sanitizeEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId:             sanitizeEnv(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId:     sanitizeEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

export const firebaseApp = isFirebaseConfigured
  ? (getApps()[0] ?? initializeApp(firebaseConfig))
  : null;

export const firebaseAuth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;
export const firebaseDb: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
