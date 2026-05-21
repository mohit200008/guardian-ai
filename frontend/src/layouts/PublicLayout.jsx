import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen grid-bg">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-cyan-950/25 via-transparent to-guardian-950" />
      <Navbar minimal />
      <Outlet />
    </div>
  );
}
