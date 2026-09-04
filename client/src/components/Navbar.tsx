import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Waves,
  ShieldAlert,
  MapPin,
  PlusCircle,
  Info,
  Menu,
  X,
  PhoneCall,
  Activity
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Waves, end: true },
    { to: '/dashboard', label: 'Live Alerts', icon: ShieldAlert },
    { to: '/map', label: 'Disaster Map', icon: MapPin },
    { to: '/report', label: 'Report Flood', icon: PlusCircle, isHighlight: true },
    { to: '/about', label: 'About LK', icon: Info }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      {/* Sri Lanka Emergency Hotline Top Bar */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-sky-950/80 border-b border-red-900/30 text-xs px-4 py-1.5 flex justify-between items-center text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-semibold text-red-300 tracking-wide uppercase text-[11px]">
            Sri Lanka Disaster Alert Network
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-400">
            Real-time Crowdsourced Flood Verification
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-300">
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="font-medium">DMC Emergency:</span>
            <a href="tel:117" className="font-bold underline hover:text-white">
              117
            </a>
          </div>
          <span className="text-slate-600">|</span>
          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <span>Suwa Seriya:</span>
            <a href="tel:1990" className="font-bold hover:text-white">
              1990
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  Flood-Safe-LK
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Sri Lanka Community Early Warning
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              if (link.isHighlight) {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/report"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-medium text-xs shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
