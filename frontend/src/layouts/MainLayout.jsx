import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen grid-bg">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-guardian-950" />
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 relative">
        <div className="lg:hidden">
          <Navbar />
        </div>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
