import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User as FirebaseUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';

export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  isPremium: boolean;
  premiumPlan?: 'monthly' | 'yearly' | null;
  premiumSince?: string | null;
  profileImage?: string | null;
  bio?: string | null;
  phone?: string | null;
  institution?: string | null;
  district?: string | null;
  upazila?: string | null;
}

interface LoginOptions {
  redirectTo?: string;
  replace?: boolean;
}

interface AuthContextType {
  user: User | null;
  authReady: boolean;
  authError: string;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (options?: LoginOptions) => Promise<void>;
  loginWithGoogle: (options?: LoginOptions) => Promise<User | void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
const ADMIN_TOKEN_KEY = 'adminToken';
const USER_DIRECTORY_KEY = 'lms:users';

const getStoredUsers = (): User[] => {
  try {
    const users = JSON.parse(localStorage.getItem(USER_DIRECTORY_KEY) || '[]') as Partial<User>[];
    return users.map(normalizeUser);
  } catch {
    return [];
  }
};

const normalizeUser = (user: Partial<User>): User => ({
  id: user.id || makeUserId(user.email || 'student@gmail.com', user.role || 'student'),
  name: user.name || null,
  email: user.email || 'student@gmail.com',
  role: user.role || inferRole(user.email || 'student@gmail.com'),
  isPremium: Boolean(user.isPremium),
  premiumPlan: user.premiumPlan || null,
  premiumSince: user.premiumSince || null,
  profileImage: user.profileImage || null,
  bio: user.bio || null,
  phone: user.phone || null,
  institution: user.institution || null,
  district: user.district || null,
  upazila: user.upazila || null,
});

const saveUserToDirectory = (user: User) => {
  const normalizedUser = normalizeUser(user);
  const users = getStoredUsers();
  const nextUsers = users.some(item => item.id === normalizedUser.id)
    ? users.map(item => item.id === normalizedUser.id ? { ...item, ...normalizedUser } : item)
    : [normalizedUser, ...users];
  localStorage.setItem(USER_DIRECTORY_KEY, JSON.stringify(nextUsers));
};

const makeUserId = (email: string, role: UserRole) =>
  `${role}-${email.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'user'}`;

const inferRole = (email: string, fallback: UserRole = 'student'): UserRole =>
  email.trim().toLowerCase() === 'admin@ict.com' ? 'admin' : fallback;

const buildFirebaseUser = (firebaseUser: FirebaseUser): User => {
  const email = firebaseUser.email || 'student@gmail.com';
  const role = inferRole(email);
  const existingUser = getStoredUsers().find(item =>
    item.id === firebaseUser.uid || item.email.toLowerCase() === email.toLowerCase()
  );
  return {
    id: firebaseUser.uid || makeUserId(email, role),
    name: firebaseUser.displayName || existingUser?.name || 'Student',
    email,
    profileImage: firebaseUser.photoURL || existingUser?.profileImage || null,
    role,
    isPremium: existingUser?.isPremium || false,
    premiumPlan: existingUser?.premiumPlan || null,
    premiumSince: existingUser?.premiumSince || null,
  };
};

const getAuthErrorMessage = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';
  const message = typeof error === 'object' && error && 'message' in error
    ? String((error as { message?: unknown }).message)
    : error instanceof Error
      ? error.message
      : String(error || 'Unknown Firebase auth error');

  return code ? `${code}: ${message}` : message;
};

const getUserHomePath = (nextUser: User) =>
  nextUser.role === 'admin' ? '/admin/dashboard' : '/dashboard';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const pendingLoginOptionsRef = useRef<LoginOptions | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const clearStoredSession = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  }, []);

  const persistSession = useCallback((nextUser: User) => {
    const normalizedUser = normalizeUser(nextUser);
    setUser(normalizedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));
    localStorage.setItem(TOKEN_KEY, `firebase-token-${normalizedUser.id}`);
    saveUserToDirectory(normalizedUser);

    if (normalizedUser.role === 'admin') {
      localStorage.setItem(ADMIN_TOKEN_KEY, `firebase-admin-token-${normalizedUser.id}`);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  }, []);

  useEffect(() => {
    const isManualAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!firebaseAuth) {
      if (isManualAdmin) {
        setUser({
          id: 'admin-manual',
          name: 'Super Admin',
          email: 'admin@ict.com',
          role: 'admin',
          isPremium: true,
        });
      } else {
        clearStoredSession();
        setUser(null);
      }
      setAuthReady(true);
      return undefined;
    }

    return onAuthStateChanged(
      firebaseAuth,
      firebaseUser => {
        if (firebaseUser) {
          const nextUser = buildFirebaseUser(firebaseUser);
          persistSession(nextUser);
          const options = pendingLoginOptionsRef.current;
          if (options) {
            pendingLoginOptionsRef.current = null;
            navigate(options.redirectTo || getUserHomePath(nextUser), { replace: options.replace ?? true });
          }
        } else if (isManualAdmin) {
          // Keep manual admin session even if Firebase auth is signed out
          setUser({
            id: 'admin-manual',
            name: 'Super Admin',
            email: 'admin@ict.com',
            role: 'admin',
            isPremium: true,
          });
        } else {
          setUser(null);
          clearStoredSession();
        }
        setAuthReady(true);
      },
      error => {
        if (isManualAdmin) {
          setUser({
            id: 'admin-manual',
            name: 'Super Admin',
            email: 'admin@ict.com',
            role: 'admin',
            isPremium: true,
          });
        } else {
          setAuthError(getAuthErrorMessage(error));
        }
        setAuthReady(true);
      }
    );
  }, [clearStoredSession, persistSession]);


  const loginWithGoogle = async (options: LoginOptions = {}) => {
    setAuthError('');

    if (!isFirebaseConfigured || !firebaseAuth) {
      setAuthError('auth/missing-config: Firebase keys are not configured. Check your VITE_FIREBASE_* environment variables.');
      return;
    }

    try {
      pendingLoginOptionsRef.current = options;
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error: any) {
      pendingLoginOptionsRef.current = null;
      if (error?.code === 'auth/popup-closed-by-user') {
        return; // handle silently
      }
      
      const message = getAuthErrorMessage(error);
      setAuthError(message);
      
      setToastMessage('লগইন করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
      setTimeout(() => setToastMessage(''), 4000);
      return;
    }
  };

  const login = async (options?: LoginOptions) => {
    await loginWithGoogle(options);
  };

  const logout = () => {
    setUser(null);
    clearStoredSession();
    localStorage.removeItem('isAdmin');
    if (firebaseAuth) {
      void signOut(firebaseAuth).catch(() => undefined);
    }
  };


  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data, role: user.role };
    persistSession(normalizeUser(updatedUser));
  };

  const isAuthenticated = Boolean(user);
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, authReady, authError, isAuthenticated, userRole, login, loginWithGoogle, logout, updateProfile }}>
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-red-500/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-red-400/50 flex items-center gap-3 font-medium whitespace-nowrap"
          >
            <span className="text-xl">⚠️</span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
