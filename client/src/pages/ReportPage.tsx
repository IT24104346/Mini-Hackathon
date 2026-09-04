import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateFloodInput,
  SeverityType,
  StatusType,
  FloodType
} from '../types/flood';
import {
  createFloodReport
} from '../services/api';
import {
  analyzeFloodDescriptionWithAI,
  AIAssessmentResult
} from '../services/aiAssistant';
import {
  DISTRICT_NAMES,
  getDistrictCoordinates,
  SRI_LANKA_DISTRICTS_DATA
} from '../utils/districts';
import {
  ShieldAlert,
  Send,
  Sparkles,
  MapPin,
  Compass,
  AlertTriangle,
  Info,
  Droplets,
  Users,
  CheckCircle2,
  Loader2,
  Navigation
} from 'lucide-react';

interface ReportPageProps {
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ onShowToast }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateFloodInput>({
    location: '',
    district: 'Colombo',
    description: '',
    floodType: 'River Overflow',
    severity: 'Moderate',
    waterLevel: 2.0,
    affectedPeople: 0,
    status: 'Active',
    latitude: 6.9271,
    longitude: 79.8612,
    reporterName: '',
    contactNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // AI Assistant State
  const [aiResult, setAiResult] = useState<AIAssessmentResult | null>(null);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  // Handle District Change
  const handleDistrictChange = (districtName: string) => {
    const coords = getDistrictCoordinates(districtName);
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      latitude: coords.lat,
      longitude: coords.lng
    }));
  };

  // Device GPS
  const handleGetDeviceLocation = () => {
    if (!navigator.geolocation) {
      onShowToast('warning', 'GPS Unsupported', 'Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: parseFloat(latitude.toFixed(4)),
          longitude: parseFloat(longitude.toFixed(4))
        }));
        onShowToast('success', 'Location Detected', `GPS set to ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`);
      },
      (error) => {
        onShowToast('info', 'GPS Access Denied', 'Using district center coordinates instead.');
      },
      { timeout: 8000 }
    );
  };

  // AI Analysis Trigger
  const handleRunAI = () => {
    if (!formData.description || formData.description.trim().length < 8) {
      onShowToast('warning', 'More Details Needed', 'Please type at least 8 characters in the description before running AI analysis.');
      return;
    }

    setIsAnalyzingAI(true);
    setTimeout(() => {
      const assessment = analyzeFloodDescriptionWithAI(formData.description, formData.waterLevel);
      setAiResult(assessment);
      setIsAnalyzingAI(false);
      onShowToast('info', 'AI Analysis Ready', `Suggested: ${assessment.suggestedSeverity} Risk • ${assessment.suggestedFloodType}`);
    }, 400);
  };

  const applyAISuggestions = () => {
    if (!aiResult) return;
    setFormData((prev) => ({
      ...prev,
      severity: aiResult.suggestedSeverity,
      floodType: aiResult.suggestedFloodType
    }));
    onShowToast('success', 'AI Recommendations Applied', 'Severity and Flood Type updated from AI assessment.');
  };

  // Validation
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.location || formData.location.trim().length < 2) {
      errors.location = 'Please enter a valid location name (at least 2 characters).';
    }

    if (!formData.district) {
      errors.district = 'Please select a Sri Lankan district.';
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Please provide a descriptive explanation (at least 10 characters).';
    }

    if (formData.waterLevel === undefined || formData.waterLevel < 0) {
      errors.waterLevel = 'Water level cannot be negative.';
    }

    if (formData.affectedPeople < 0) {
      errors.affectedPeople = 'Affected count cannot be negative.';
    }

    if (formData.latitude < 5.5 || formData.latitude > 10.0) {
      errors.latitude = 'Latitude must be within Sri Lanka bounds (5.5° to 10.0° N).';
    }

    if (formData.longitude < 79.0 || formData.longitude > 82.5) {
      errors.longitude = 'Longitude must be within Sri Lanka bounds (79.0° to 82.5° E).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      onShowToast('error', 'Validation Error', 'Please check the highlighted fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createFloodReport(formData);
      onShowToast('success', 'Alert Published!', 'Your community flood report is now live on the dashboard.');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Submission failed:', err);
      setServerError(err.message || 'Failed to submit flood report to backend.');
      onShowToast('error', 'Submission Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Community Early Warning Dispatch</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Report a Flood Situation in Sri Lanka
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Help emergency services, disaster volunteers, and neighboring residents know the live water levels, impassable roads, and urgent evacuation needs in your area.
        </p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <div>
            <div className="font-bold">Submission Error:</div>
            <div className="whitespace-pre-line mt-0.5">{serverError}</div>
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8 shadow-2xl">
        {/* Section 1: Location Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">
            <MapPin className="w-4 h-4" />
            <span>1. Location & District Identification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location input */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Location / Street / Village Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Wellampitiya Lowlands, Kotikawatta"
                className={`w-full px-4 py-3 rounded-2xl bg-slate-950 border ${
                  formErrors.location ? 'border-rose-500' : 'border-slate-700/80'
                } text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
              {formErrors.location && (
                <p className="text-[11px] text-rose-400 mt-1">{formErrors.location}</p>
              )}
            </div>

            {/* District dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Sri Lankan District <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d}>
                    {d} District
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coordinates row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Latitude (° N)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Longitude (° E)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGetDeviceLocation}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Auto-Detect GPS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Severity & Category */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>2. Severity & Flood Classification</span>
          </div>

          {/* Severity selector pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-2">
              Select Severity Level <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { value: 'Low', label: 'Low Risk', desc: 'Puddles / < 1 ft water', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' },
                { value: 'Moderate', label: 'Moderate', desc: '1-2 ft water / road block', color: 'border-yellow-500/40 bg-yellow-950/20 text-yellow-300' },
                { value: 'High', label: 'High Risk', desc: '2-4 ft / homes inundated', color: 'border-amber-500/40 bg-amber-950/20 text-amber-400' },
                { value: 'Critical', label: 'Critical', desc: '> 4 ft / Evacuation boat need', color: 'border-rose-500/40 bg-rose-950/20 text-rose-400' }
              ].map((sev) => (
                <button
                  type="button"
                  key={sev.value}
                  onClick={() => setFormData({ ...formData, severity: sev.value as SeverityType })}
                  className={`p-3 rounded-2xl border text-left transition ${
                    formData.severity === sev.value
                      ? `${sev.color} ring-2 ring-cyan-400 font-bold`
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs">{sev.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{sev.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flood Type & Water Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Flood Type / Origin <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.floodType}
                onChange={(e) => setFormData({ ...formData, floodType: e.target.value as FloodType })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="River Overflow">River Overflow (Kelani/Kalu/Gin/Nilwala)</option>
                <option value="Flash Flood">Flash Flood (Sudden Torrential Runoff)</option>
                <option value="Urban Flood">Urban Street Inundation / Blocked Drains</option>
                <option value="Landslide-related Flooding">Landslide / Hillside Runoff</option>
                <option value="Heavy Rain Flooding">Heavy Rain Waterlogging</option>
                <option value="Coastal Surge">Coastal Surge / Estuary Blockage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex justify-between">
                <span>Estimated Water Level</span>
                <span className="text-cyan-400 font-bold">{formData.waterLevel} ft</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({ ...formData, waterLevel: parseFloat(e.target.value) })}
                  className="flex-1 accent-cyan-500 cursor-pointer"
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({ ...formData, waterLevel: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-center text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Description & Optional AI Assistant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <Droplets className="w-4 h-4" />
              <span>3. Situation Details & Observations</span>
            </div>
            
            {/* AI Assistant Button */}
            <button
              type="button"
              onClick={handleRunAI}
              disabled={isAnalyzingAI}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-sm transition"
            >
              {isAnalyzingAI ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>AI Severity Assessor</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Situation Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe road accessibility, rising river levels, trapped families, power outages, evacuation boat requirements..."
              className={`w-full p-4 rounded-2xl bg-slate-950 border ${
                formErrors.description ? 'border-rose-500' : 'border-slate-700/80'
              } text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed`}
            />
            {formErrors.description && (
              <p className="text-[11px] text-rose-400 mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* AI Assessment Card (if evaluated) */}
          {aiResult && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40 border border-cyan-800/60 animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-white">
                      AI Assessment: {aiResult.urgencyLevel}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                      Confidence: {aiResult.confidenceScore}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {aiResult.reasoning}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <span>Suggested Severity: <strong className="text-cyan-300">{aiResult.suggestedSeverity}</strong></span>
                    <span>•</span>
                    <span>Suggested Type: <strong className="text-cyan-300">{aiResult.suggestedFloodType}</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={applyAISuggestions}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition"
                >
                  Apply to Form
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic">
                * Note: AI suggestions are assistive guidelines and do not replace official emergency protocols.
              </p>
            </div>
          )}

          {/* Affected count & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Estimated Affected People / Families
              </label>
              <input
                type="number"
                min="0"
                value={formData.affectedPeople}
                onChange={(e) => setFormData({ ...formData, affectedPeople: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g. 50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Initial Alert Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusType })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Active">🔴 Active Emergency</option>
                <option value="Monitoring">🟡 Monitoring Situation</option>
                <option value="Resolved">🟢 Resolved / Clear</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Optional Reporter Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">
            <Users className="w-4 h-4" />
            <span>4. Reporter Contact (Optional)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Reporter Name / Community Org
              </label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="e.g. Sunil Perera (Grama Niladhari division)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="e.g. +94 77 123 4567"
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>By submitting, you confirm this information is accurate to the best of your knowledge.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Alert...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Flood Alert</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
