import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, AlertTriangle, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: System Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-xs">
                LK
              </div>
              <span className="font-bold text-white text-base">Flood-Safe-LK</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sri Lanka's real-time community flood reporting & situational awareness network. Bridging local citizen observation and emergency response.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Community Verified Platform</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition">
                  Live Flood Dashboard
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-cyan-400 transition">
                  Interactive Sri Lanka Map
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-cyan-400 transition">
                  Submit a Flood Report
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  Sri Lankan Crisis Context
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sri Lankan Emergency Numbers */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">
              Emergency Hotlines (Sri Lanka)
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Disaster Management Centre (DMC)</span>
                <a href="tel:117" className="font-bold text-amber-400 hover:underline">117</a>
              </li>
              <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Suwa Seriya Ambulance</span>
                <a href="tel:1990" className="font-bold text-red-400 hover:underline">1990</a>
              </li>
              <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Sri Lanka Police Emergency</span>
                <a href="tel:119" className="font-bold text-sky-400 hover:underline">119</a>
              </li>
              <li className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-300">Sri Lanka Navy Flood Rescue</span>
                <a href="tel:0112445368" className="font-bold text-slate-200 hover:underline">011-2445368</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Advisory & Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase">
              Official Disclaimer
            </h4>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/80 leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Notice to Citizens</span>
              </div>
              Flood-Safe-LK provides crowdsourced community information. For life-threatening emergencies or evacuation directives, always comply with official announcements from the Disaster Management Centre (DMC) and Department of Meteorology.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© 2026 Flood-Safe-LK — Built for SE3090 Software Engineering Frameworks Assignment 2.</p>
          <div className="flex items-center gap-1">
            <span>Community Resilience for Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
