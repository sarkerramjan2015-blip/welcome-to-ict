import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export default function AdminRoute({ children }: { children?: React.ReactNode }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children || <Outlet />}</>;
}


