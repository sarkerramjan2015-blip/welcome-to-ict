import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Auth, GoogleAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

/** Strip accidental literal quote characters that Vercel can inject into env values. */
function sanitizeEnv(value: string | undefined): string {
  if (!value) return '';
  return String(value).replace(/['"]/g, '').trim();
}

const firebaseConfig: FirebaseOptions = {
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

let firebaseAppPromise: Promise<FirebaseApp | null> | null = null;
let firebaseAuthPromise: Promise<Auth | null> | null = null;
let firebaseDbPromise: Promise<Firestore | null> | null = null;
let firebaseStoragePromise: Promise<FirebaseStorage | null> | null = null;
let googleProviderPromise: Promise<GoogleAuthProvider | null> | null = null;

export const getFirebaseApp = async (): Promise<FirebaseApp | null> => {
  if (!isFirebaseConfigured) return null;

  if (!firebaseAppPromise) {
    firebaseAppPromise = import('firebase/app').then(({ getApps, initializeApp }) =>
      getApps()[0] ?? initializeApp(firebaseConfig)
    );
  }

  return firebaseAppPromise;
};

export const getFirebaseAuth = async (): Promise<Auth | null> => {
  if (!isFirebaseConfigured) return null;

  if (!firebaseAuthPromise) {
    firebaseAuthPromise = Promise.all([
      getFirebaseApp(),
      import('firebase/auth'),
    ]).then(([app, { getAuth }]) => app ? getAuth(app) : null);
  }

  return firebaseAuthPromise;
};

export const getFirebaseDb = async (): Promise<Firestore | null> => {
  if (!isFirebaseConfigured) return null;

  if (!firebaseDbPromise) {
    firebaseDbPromise = Promise.all([
      getFirebaseApp(),
      import('firebase/firestore'),
    ]).then(([app, { getFirestore }]) => app ? getFirestore(app) : null);
  }

  return firebaseDbPromise;
};

export const getFirebaseStorage = async (): Promise<FirebaseStorage | null> => {
  if (!isFirebaseConfigured || !firebaseConfig.storageBucket) return null;

  if (!firebaseStoragePromise) {
    firebaseStoragePromise = Promise.all([
      getFirebaseApp(),
      import('firebase/storage'),
    ]).then(([app, { getStorage }]) => app ? getStorage(app) : null);
  }

  return firebaseStoragePromise;
};

export const getGoogleProvider = async (): Promise<GoogleAuthProvider | null> => {
  if (!isFirebaseConfigured) return null;

  if (!googleProviderPromise) {
    googleProviderPromise = import('firebase/auth').then(({ GoogleAuthProvider }) => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      return provider;
    });
  }

  return googleProviderPromise;
};
