import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen grid-bg">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-guardian-950" />
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
