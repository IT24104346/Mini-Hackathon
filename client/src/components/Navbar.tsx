import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Waves,
  ShieldAlert,
  MapPin,
  PlusCircle,
  Info,
  Menu,
  X,
  PhoneCall,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home', icon: Waves, end: true },
    { to: '/dashboard', label: 'Live Alerts', icon: ShieldAlert },
    { to: '/map', label: 'Disaster Map', icon: MapPin },
    { to: '/report', label: 'Report Flood', icon: PlusCircle, isHighlight: true },
    { to: '/about', label: 'About LK', icon: Info }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Sri Lanka Emergency Hotline Top Bar */}
      <div className="bg-red-50 border-b border-red-100 text-xs px-4 py-1.5 flex justify-between items-center text-slate-700">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="font-semibold text-red-700 tracking-wide uppercase text-[11px]">
            Sri Lanka Disaster Alert Network
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-600">
            Real-time Crowdsourced Flood Verification
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-red-700">
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="font-medium">DMC Emergency:</span>
            <a href="tel:117" className="font-bold underline hover:text-red-900">
              117
            </a>
          </div>
          <span className="text-slate-300">|</span>
          <div className="hidden sm:flex items-center gap-1 text-slate-600">
            <span>Suwa Seriya:</span>
            <a href="tel:1990" className="font-bold text-slate-800 hover:text-black">
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
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  Flood-Safe-LK
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
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
                    className="ml-1 flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition"
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
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}

            {/* Auth section */}
            <div className="ml-3 pl-3 border-l border-gray-200 flex items-center gap-2">
              {isAuthenticated && user && (
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-2.5 py-1.5 rounded-lg text-xs">
                    <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-[11px]">
                      {user.name.charAt(0)}
                    </div>
                    <div className="max-w-[140px] truncate">
                      <div className="font-semibold text-slate-800 text-[11px] truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500">{user.district || 'Citizen'}</div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-slate-600 hover:text-red-600 transition border border-gray-200 flex items-center gap-1.5 text-xs font-medium"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/report"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            {isAuthenticated && user && (
              <div className="flex items-center justify-between w-full">
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">{user.name}</span> ({user.district || 'Citizen'})
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
