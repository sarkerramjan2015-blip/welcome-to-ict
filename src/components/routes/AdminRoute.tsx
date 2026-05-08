import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }: { children?: React.ReactNode }) {
  const { authReady, user } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8 text-center font-semibold text-slate-600 dark:text-slate-300">
        Verifying admin access...
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children || <Outlet />}</>;
}

