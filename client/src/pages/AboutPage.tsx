import React from 'react';
import {
  Waves,
  Shield,
  Users,
  Code,
  GitBranch,
  Database,
  Cpu,
  Layers,
  CheckCircle,
  ExternalLink,
  MapPin,
  Server,
  Cloud
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-12">
      {/* Title & Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>SE3090 Software Engineering Frameworks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About Flood-Safe-LK & The Sri Lankan Flood Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          A dedicated community-driven early warning and disaster response system designed specifically for Sri Lanka's vulnerable river basins and urban catchments.
        </p>
      </div>

      {/* Sri Lankan Context & Geography */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
            <Waves className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">
            The Sri Lankan Flooding Problem
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            Flooding is the most frequent and economically devastating natural disaster in Sri Lanka. The island's geography features a central highland massif flanked by rolling plains and coastal lowlands, giving rise to 103 distinct river basins.
          </p>
          <p>
            During the South-West Monsoon (May to September) and North-East Monsoon (November to February), extreme precipitation exceeding 150mm to 250mm within 24 hours causes major river basins—notably the <strong>Kelani Ganga, Kalu Ganga, Gin Ganga, and Nilwala Ganga</strong>—to exceed major flood thresholds within hours.
          </p>
        </div>

        {/* River Basins Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Kelani River Basin</span>
            <h4 className="text-sm font-bold text-white">Colombo & Gampaha</h4>
            <p className="text-xs text-slate-400">
              Affects high-density areas: Wellampitiya, Kolonnawa, Sedawatta, Biyagama, and Kelaniya.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Kalu River Basin</span>
            <h4 className="text-sm font-bold text-white">Ratnapura & Kalutara</h4>
            <p className="text-xs text-slate-400">
              Steep catchment prone to rapid 15-20m crests inundating Ratnapura town, Millakanda, and Putupaula.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Gin & Nilwala Basins</span>
            <h4 className="text-sm font-bold text-white">Galle & Matara</h4>
            <p className="text-xs text-slate-400">
              Submerges agricultural lands and transport arteries across Baddegama, Thihagoda, and Akuressa.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Mahaweli & Dry Zone</span>
            <h4 className="text-sm font-bold text-white">Kandy & Polonnaruwa</h4>
            <p className="text-xs text-slate-400">
              Upstream reservoir spill gate discharges and sudden localized heavy flash floods.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Team Members & Functional Module Ownership */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Team Member Responsibility & Contribution Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Clear functional ownership across four registered members and individual Git feature branches.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Git Branch</th>
                <th className="py-3 px-4">Module Ownership</th>
                <th className="py-3 px-4">Key Code Deliverables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">IT24104346</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">feature/flood-reporting</td>
                <td className="py-3 px-4 font-semibold text-white">Flood Reporting Module</td>
                <td className="py-3 px-4">
                  <code>ReportPage.tsx</code>, GPS coordinate autofill, client-side validation, <code>aiAssistant.ts</code>, <code>POST /api/floods</code> controller and validation middleware.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">IT24100435</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">feature/live-dashboard</td>
                <td className="py-3 px-4 font-semibold text-white">Live Dashboard & Analytics Module</td>
                <td className="py-3 px-4">
                  <code>DashboardPage.tsx</code>, <code>StatCard.tsx</code>, live multi-field search, multi-criteria filtering (district, severity, status), sorting, <code>GET /api/floods/stats</code>.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">IT24102180</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">feature/flood-management</td>
                <td className="py-3 px-4 font-semibold text-white">Flood Management & CRUD Module</td>
                <td className="py-3 px-4">
                  <code>FloodDetailModal.tsx</code>, <code>EditFloodModal.tsx</code>, <code>DeleteConfirmModal.tsx</code>, <code>PUT /api/floods/:id</code> & <code>DELETE /api/floods/:id</code> endpoints.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">IT24610820</td>
                <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">feature/ui-map-deployment</td>
                <td className="py-3 px-4 font-semibold text-white">UI/UX, Map & Deployment Module</td>
                <td className="py-3 px-4">
                  <code>HomePage.tsx</code>, <code>SriLankaMap.tsx</code> (Leaflet), <code>Navbar.tsx</code>, <code>Footer.tsx</code>, <code>AboutPage.tsx</code>, seed data engine, responsive theming, build & deployment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* System Architecture & Tech Stack */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              System Architecture & Tech Stack
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Production-ready full-stack decoupled architecture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Code className="w-4 h-4" />
              <span>Frontend Layer</span>
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• React 18 + TypeScript</li>
              <li>• Vite Build Tooling</li>
              <li>• Tailwind CSS Design System</li>
              <li>• React Router DOM (v7)</li>
              <li>• Leaflet & React-Leaflet Maps</li>
              <li>• Lucide React Icons</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Server className="w-4 h-4" />
              <span>Backend Layer</span>
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• Node.js + Express.js</li>
              <li>• TypeScript Compilation</li>
              <li>• RESTful API Architecture</li>
              <li>• CORS & Environment Config</li>
              <li>• Custom Error Handling Middleware</li>
              <li>• Strict Input Validation</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Database className="w-4 h-4" />
              <span>Database & Cloud</span>
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>• MongoDB Atlas (Online Cloud DB)</li>
              <li>• Mongoose ODM Schema</li>
              <li>• Automatic Geospatial Indexing</li>
              <li>• Auto-seeding Sample Dataset</li>
              <li>• Deployed on Render & Vercel</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
