import { Navigate, Route, Routes } from 'react-router-dom';
import { isSscIctEnabled } from './config';
import SscIctAdminPage from './admin';
import { SscFeatureDisabledPage } from './pages';

export default function SscIctAdminRoutes() {
  if (!isSscIctEnabled) {
    return <SscFeatureDisabledPage />;
  }

  return (
    <Routes>
      <Route index element={<SscIctAdminPage />} />
      <Route path="chapters" element={<SscIctAdminPage />} />
      <Route path="questions" element={<SscIctAdminPage />} />
      <Route path="orders" element={<SscIctAdminPage />} />
      <Route path="*" element={<Navigate to="/admin/ssc-ict" replace />} />
    </Routes>
  );
}

