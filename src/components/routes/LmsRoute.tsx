import { Outlet } from 'react-router-dom';
import { LmsProvider } from '../../context/LmsContext';

export default function LmsRoute() {
  return (
    <LmsProvider>
      <Outlet />
    </LmsProvider>
  );
}
