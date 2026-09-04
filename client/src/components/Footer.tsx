import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-slate-600 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Col 1: System Info */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                LK
              </div>
              <span className="font-bold text-slate-900 text-base">Flood-Safe-LK</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sri Lanka's community flood reporting and early warning system. Bridging citizen reporting and emergency response.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Community Verified Platform</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs tracking-wider uppercase mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-600 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 transition">
                  Live Flood Dashboard
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-blue-600 transition">
                  Interactive Sri Lanka Map
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-blue-600 transition">
                  Submit a Flood Report
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition">
                  Sri Lankan Crisis Context
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sri Lankan Emergency Numbers */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs tracking-wider uppercase mb-3">
              Emergency Hotlines
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-slate-700 font-medium">Disaster Management (DMC)</span>
                <a href="tel:117" className="font-bold text-red-600 hover:underline">117</a>
              </li>
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-slate-700 font-medium">Suwa Seriya Ambulance</span>
                <a href="tel:1990" className="font-bold text-red-600 hover:underline">1990</a>
              </li>
              <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                <span className="text-slate-700 font-medium">Police Emergency</span>
                <a href="tel:119" className="font-bold text-blue-600 hover:underline">119</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Advisory & Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs tracking-wider uppercase">
              Notice
            </h4>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-800 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Citizen Notice</span>
              </div>
              Flood-Safe-LK provides community reports. For life-threatening emergencies or evacuation directives, always comply with official announcements from the DMC.
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© 2026 Flood-Safe-LK — Community Resilience for Sri Lanka.</p>
        </div>
      </div>
    </footer>
  );
};
