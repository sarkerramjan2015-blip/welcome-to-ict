import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mail, Check, X } from 'lucide-react';

export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  profileImage?: string | null;
  bio?: string | null;
  phone?: string | null;
  institution?: string | null;
  district?: string | null;
  upazila?: string | null;
}

interface LoginInput {
  email: string;
  password?: string;
  name?: string;
  role?: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (credentials?: LoginInput) => Promise<User | void>;
  register: (data: LoginInput) => Promise<User>;
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
    return JSON.parse(localStorage.getItem(USER_DIRECTORY_KEY) || '[]') as User[];
  } catch {
    return [];
  }
};

const saveUserToDirectory = (user: User) => {
  const users = getStoredUsers();
  const nextUsers = users.some(item => item.id === user.id)
    ? users.map(item => item.id === user.id ? { ...item, ...user } : item)
    : [user, ...users];
  localStorage.setItem(USER_DIRECTORY_KEY, JSON.stringify(nextUsers));
};

const makeUserId = (email: string, role: UserRole) =>
  `${role}-${email.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'user'}`;

const buildMockUser = ({ email, name, role = 'student' }: LoginInput): User => {
  const normalizedEmail = email.trim().toLowerCase();
  return {
    id: makeUserId(normalizedEmail, role),
    name: name?.trim() || (role === 'admin' ? 'Admin' : 'Student'),
    email: normalizedEmail,
    role,
  };
};

const navigateWithoutRouter = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showMockLogin, setShowMockLogin] = useState(false);
  const [mockEmail, setMockEmail] = useState('');

  const persistSession = (nextUser: User) => {
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    localStorage.setItem(TOKEN_KEY, `mock-token-${nextUser.id}`);
    saveUserToDirectory(nextUser);

    if (nextUser.role === 'admin') {
      localStorage.setItem(ADMIN_TOKEN_KEY, `mock-admin-token-${nextUser.id}`);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        saveUserToDirectory(parsedUser);
      } catch {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      }
    }

    // Listen for OAuth messages
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const oAuthUser = event.data.user;
        persistSession({
          id: oAuthUser.id || makeUserId(oAuthUser.email || 'student@gmail.com', 'student'),
          name: oAuthUser.name || 'Student',
          email: oAuthUser.email || 'student@gmail.com',
          profileImage: oAuthUser.profileImage || null,
          role: 'student',
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const register = async (data: LoginInput) => {
    const nextUser = buildMockUser(data);
    persistSession(nextUser);
    return nextUser;
  };

  const login = async (credentials?: LoginInput) => {
    if (!credentials) {
      setShowMockLogin(true);
      return;
    }

    const role = credentials.role || (credentials.email.toLowerCase() === 'admin@ict.com' ? 'admin' : 'student');

    if (role === 'admin') {
      const validAdmin = credentials.email.trim().toLowerCase() === 'admin@ict.com' && credentials.password === 'admin123';
      if (!validAdmin) {
        throw new Error('Invalid admin credentials');
      }
    }

    const nextUser = buildMockUser({ ...credentials, role });
    persistSession(nextUser);
    return nextUser;
  };

  const handleMockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextUser = await login({
      email: mockEmail || 'student@gmail.com',
      name: 'Student',
      role: 'student',
    });
    setShowMockLogin(false);
    setMockEmail('');
    if (nextUser) {
      navigateWithoutRouter(nextUser.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data, role: user.role };
    persistSession(updatedUser);
  };

  const isAuthenticated = Boolean(user);
  const userRole = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userRole, login, register, logout, updateProfile }}>
      {children}
      
      {/* Simulated Google Login Popup */}
      {showMockLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </h2>
              <button onClick={() => setShowMockLogin(false)} className="text-slate-500 dark:text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6 border-l-4 border-amber-500 pl-3 bg-amber-50 p-2 rounded">
              Actual Google Auth requires API Keys. This is a simulated fallback for preview purposes.
            </p>
            
            <form onSubmit={handleMockSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-gray-400" />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Gmail"
                    value={mockEmail}
                    onChange={(e) => setMockEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                Continue <Check className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
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
