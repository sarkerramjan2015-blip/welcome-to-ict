import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Auth, GoogleAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

/** Strip accidental literal quote characters that Vercel can inject into env values. */
function sanitizeEnv(value: string | undefined): string {
  if (!value) return '';
  return String(value).replace(/['"]/g, '').trim();
}

const buildFirebaseConfig = (source: Record<string, any>): FirebaseOptions => ({
  apiKey: sanitizeEnv(source.VITE_FIREBASE_API_KEY || source.apiKey),
  authDomain: sanitizeEnv(source.VITE_FIREBASE_AUTH_DOMAIN || source.authDomain),
  projectId: sanitizeEnv(source.VITE_FIREBASE_PROJECT_ID || source.projectId),
  storageBucket: sanitizeEnv(source.VITE_FIREBASE_STORAGE_BUCKET || source.storageBucket),
  messagingSenderId: sanitizeEnv(source.VITE_FIREBASE_MESSAGING_SENDER_ID || source.messagingSenderId),
  appId: sanitizeEnv(source.VITE_FIREBASE_APP_ID || source.appId),
  measurementId: sanitizeEnv(source.VITE_FIREBASE_MEASUREMENT_ID || source.measurementId),
});

const hasRequiredFirebaseConfig = (config: FirebaseOptions | null | undefined) =>
  Boolean(config?.apiKey && config.authDomain && config.projectId && config.appId);

const buildTimeFirebaseConfig = buildFirebaseConfig(import.meta.env);

const fetchRuntimeFirebaseConfig = async (): Promise<FirebaseOptions | null> => {
  if (typeof window === 'undefined') return null;

  try {
    const response = await fetch('/api/firebaseConfig', {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    const data = await response.json().catch(() => ({}));
    const runtimeConfig = buildFirebaseConfig(data?.config || {});
    return response.ok && hasRequiredFirebaseConfig(runtimeConfig) ? runtimeConfig : null;
  } catch (error) {
    console.warn('Runtime Firebase config could not be loaded:', error);
    return null;
  }
};

export const isFirebaseConfigured = hasRequiredFirebaseConfig(buildTimeFirebaseConfig);

let firebaseConfigPromise: Promise<FirebaseOptions | null> | null = null;
let firebaseAppPromise: Promise<FirebaseApp | null> | null = null;
let firebaseAuthPromise: Promise<Auth | null> | null = null;
let firebaseDbPromise: Promise<Firestore | null> | null = null;
let firebaseStoragePromise: Promise<FirebaseStorage | null> | null = null;
let googleProviderPromise: Promise<GoogleAuthProvider | null> | null = null;

const getFirebaseConfig = async () => {
  if (hasRequiredFirebaseConfig(buildTimeFirebaseConfig)) {
    return buildTimeFirebaseConfig;
  }

  if (!firebaseConfigPromise) {
    firebaseConfigPromise = fetchRuntimeFirebaseConfig();
  }

  return firebaseConfigPromise;
};

export const getFirebaseApp = async (): Promise<FirebaseApp | null> => {
  const firebaseConfig = await getFirebaseConfig();
  if (!firebaseConfig) return null;

  if (!firebaseAppPromise) {
    firebaseAppPromise = import('firebase/app').then(({ getApps, initializeApp }) =>
      getApps()[0] ?? initializeApp(firebaseConfig)
    );
  }

  return firebaseAppPromise;
};

export const getFirebaseAuth = async (): Promise<Auth | null> => {
  const firebaseConfig = await getFirebaseConfig();
  if (!firebaseConfig) return null;

  if (!firebaseAuthPromise) {
    firebaseAuthPromise = Promise.all([
      getFirebaseApp(),
      import('firebase/auth'),
    ]).then(([app, { getAuth }]) => app ? getAuth(app) : null);
  }

  return firebaseAuthPromise;
};

export const getFirebaseDb = async (): Promise<Firestore | null> => {
  const firebaseConfig = await getFirebaseConfig();
  if (!firebaseConfig) return null;

  if (!firebaseDbPromise) {
    firebaseDbPromise = Promise.all([
      getFirebaseApp(),
      import('firebase/firestore'),
    ]).then(([app, { getFirestore }]) => app ? getFirestore(app) : null);
  }

  return firebaseDbPromise;
};

export const getFirebaseStorage = async (): Promise<FirebaseStorage | null> => {
  const firebaseConfig = await getFirebaseConfig();
  if (!firebaseConfig?.storageBucket) return null;

  if (!firebaseStoragePromise) {
    firebaseStoragePromise = Promise.all([
      getFirebaseApp(),
      import('firebase/storage'),
    ]).then(([app, { getStorage }]) => app ? getStorage(app) : null);
  }

  return firebaseStoragePromise;
};

export const getGoogleProvider = async (): Promise<GoogleAuthProvider | null> => {
  const firebaseConfig = await getFirebaseConfig();
  if (!firebaseConfig) return null;

  if (!googleProviderPromise) {
    googleProviderPromise = import('firebase/auth').then(({ GoogleAuthProvider }) => {
      const provider = new GoogleAuthProvider();
      return provider;
    });
  }

  return googleProviderPromise;
};
