import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analyze/message', label: 'Message' },
  { to: '/analyze/url', label: 'URL' },
];

export default function Navbar({ minimal = false }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-guardian-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to={minimal ? '/' : '/dashboard'} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-bold text-white tracking-tight">Guardian AI</span>
        </Link>

        {!minimal && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-cyan-500/15 text-cyan-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
          {minimal ? (
            <Link to="/dashboard">
              <Button>Open App</Button>
            </Link>
          ) : (
            <Link to="/results">
              <Button variant="ghost">Last Results</Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-slate-400"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && !minimal && (
        <nav className="md:hidden border-t border-slate-800 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
