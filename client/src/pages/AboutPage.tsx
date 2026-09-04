import React from 'react';
import {
  Waves,
  Shield,
  PhoneCall,
  AlertTriangle,
  LifeBuoy,
  HeartHandshake,
  Navigation
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Title & Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Sri Lanka Disaster Management & Community Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          About Flood-Safe-LK & The Sri Lankan Flood Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          A dedicated community-driven early warning and disaster response platform designed specifically for Sri Lanka's vulnerable river basins, catchments, and coastal districts.
        </p>
      </div>

      {/* Sri Lankan Context & Geography */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Waves className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            The Sri Lankan Flooding Problem
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Flooding is the most frequent and economically devastating natural disaster in Sri Lanka. The island's geography features a central highland massif flanked by rolling plains and coastal lowlands, giving rise to 103 distinct river basins.
          </p>
          <p>
            During the South-West Monsoon (May to September) and North-East Monsoon (November to February), extreme precipitation exceeding 150mm to 250mm within 24 hours causes major river basins—notably the <strong>Kelani Ganga, Kalu Ganga, Gin Ganga, and Nilwala Ganga</strong>—to exceed major flood thresholds within hours.
          </p>
        </div>

        {/* River Basins Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Kelani River Basin</span>
            <h4 className="text-sm font-bold text-slate-900">Colombo & Gampaha</h4>
            <p className="text-xs text-slate-600">
              Affects high-density areas: Godagama, Wellampitiya, Kolonnawa, Sedawatta, Biyagama, and Kelaniya.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Kalu River Basin</span>
            <h4 className="text-sm font-bold text-slate-900">Ratnapura & Kalutara</h4>
            <p className="text-xs text-slate-600">
              Steep catchment prone to rapid 15-20m crests inundating Ratnapura town, Millakanda, and Putupaula.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Gin & Nilwala Basins</span>
            <h4 className="text-sm font-bold text-slate-900">Galle & Matara</h4>
            <p className="text-xs text-slate-600">
              Submerges agricultural lands and transport arteries across Baddegama, Thihagoda, and Akuressa.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Mahaweli & Dry Zone</span>
            <h4 className="text-sm font-bold text-slate-900">Kandy & Polonnaruwa</h4>
            <p className="text-xs text-slate-600">
              Upstream reservoir spill gate discharges and sudden localized heavy flash floods.
            </p>
          </div>
        </div>
      </section>

      {/* Flood Preparedness & Community Safety Directives */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Emergency Directives & Community Safety Actions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standard operating guidelines recommended by Sri Lanka Disaster Management Centre (DMC).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <LifeBuoy className="w-4 h-4 text-blue-600" />
              <span>1. Early Warning & Evacuation</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When water levels exceed amber risk status or spill gates open, immediately move elderly family members, children, and essential medications to designated high ground or local Grama Niladhari safe shelters.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <Navigation className="w-4 h-4 text-amber-600" />
              <span>2. Transport & Road Safety</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Never attempt to drive or walk through fast-flowing flood water or submerged bridges. 15cm of flowing water can knock down an adult, and 30cm can float most vehicles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>3. Community Reporting</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Submit verified real-time field reports with precise water level and affected population counts using Flood-Safe-LK to direct Navy and volunteer boat rescue units efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Hotlines Box */}
      <section className="rounded-2xl p-6 sm:p-8 bg-red-50 border border-red-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-red-100 border border-red-200 text-red-600 flex-shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-900">
              Official Sri Lanka Emergency Hotlines
            </h3>
            <p className="text-xs text-red-700 mt-1 max-w-xl leading-relaxed">
              In life-threatening situations, boat rescue requests, or medical emergencies, contact national emergency dispatch services immediately.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <a
            href="tel:117"
            className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition"
          >
            DMC Emergency: 117
          </a>
          <a
            href="tel:1990"
            className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-slate-800 font-semibold text-xs border border-gray-300 transition shadow-sm"
          >
            Suwa Seriya: 1990
          </a>
        </div>
      </section>
    </div>
  );
};
