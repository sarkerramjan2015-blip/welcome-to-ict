import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { authReady, isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return <div className="flex-1 p-8 text-center text-slate-900 dark:text-white">Loading your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
