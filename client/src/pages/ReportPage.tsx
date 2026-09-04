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
  DISTRICT_NAMES,
  getDistrictCoordinates,
  detectDistrictFromLocation,
  getTownSuggestions,
  TownLocation
} from '../utils/districts';
import {
  ShieldAlert,
  Send,
  MapPin,
  AlertTriangle,
  Info,
  Droplets,
  Users,
  Loader2,
  Navigation,
  Check
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

  const [autoDetectedMatch, setAutoDetectedMatch] = useState<{
    district: string;
    matchedTown: string;
  } | null>(null);

  const [townSuggestions, setTownSuggestions] = useState<TownLocation[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);



  // Handle Location Typing & Automatic District Detection
  const handleLocationChange = (val: string) => {
    setFormData((prev) => ({ ...prev, location: val }));

    if (val.trim().length >= 2) {
      const detection = detectDistrictFromLocation(val);
      if (detection.detectedDistrict) {
        setFormData((prev) => ({
          ...prev,
          location: val,
          district: detection.detectedDistrict!,
          latitude: detection.lat ?? prev.latitude,
          longitude: detection.lng ?? prev.longitude
        }));
        setAutoDetectedMatch({
          district: detection.detectedDistrict,
          matchedTown: detection.matchedTown || val
        });
      } else {
        setAutoDetectedMatch(null);
      }

      const suggestions = getTownSuggestions(val, 4);
      setTownSuggestions(suggestions);
    } else {
      setAutoDetectedMatch(null);
      setTownSuggestions([]);
    }
  };

  // Select Autocomplete Suggestion
  const handleSelectSuggestion = (item: TownLocation) => {
    setFormData((prev) => ({
      ...prev,
      location: item.town,
      district: item.district,
      latitude: item.lat,
      longitude: item.lng
    }));
    setAutoDetectedMatch({
      district: item.district,
      matchedTown: item.town
    });
    setTownSuggestions([]);
  };

  // Handle Manual District Change
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
      () => {
        onShowToast('info', 'GPS Access Denied', 'Using district center coordinates instead.');
      },
      { timeout: 8000 }
    );
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
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
          <span>Community Early Warning Dispatch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Report a Flood Situation in Sri Lanka
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
          Help emergency services, disaster volunteers, and neighboring residents know the live water levels, impassable roads, and urgent evacuation needs in your area.
        </p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <div>
            <div className="font-bold">Submission Error:</div>
            <div className="whitespace-pre-line mt-0.5">{serverError}</div>
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-6 shadow-sm">
        {/* Section 1: Location Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>1. Location & Automatic District Identification</span>
            </div>

            {autoDetectedMatch && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Auto-detected: {autoDetectedMatch.district} District</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location input with automatic detection */}
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                City / Town / Street / Village Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Type city e.g. Godagama, Wellampitiya, Biyagama, Kandy, Galle..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white border ${
                  formErrors.location ? 'border-red-500' : 'border-gray-300'
                } text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {formErrors.location && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.location}</p>
              )}

              {/* Autocomplete Quick Suggestions */}
              {townSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 space-y-1">
                  <div className="text-[10px] text-slate-500 px-2 py-0.5 uppercase tracking-wider font-semibold">
                    Matching Locations (Click to Auto-fill):
                  </div>
                  {townSuggestions.map((item) => (
                    <button
                      type="button"
                      key={`${item.town}-${item.district}`}
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between transition"
                    >
                      <span className="font-semibold text-slate-800">
                        📍 {item.town}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-slate-700 border border-gray-200">
                        {item.district} District
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* District dropdown (auto-selected or manual override) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Sri Lankan District <span className="text-red-600">*</span></span>
                {autoDetectedMatch && (
                  <span className="text-[10px] text-blue-600 font-medium">Auto-selected</span>
                )}
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Latitude (° N)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Longitude (° E)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGetDeviceLocation}
                className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-gray-300"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>Auto-Detect GPS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Severity & Category */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-gray-200 pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>2. Severity & Flood Classification</span>
          </div>

          {/* Severity selector pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Severity Level <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { value: 'Low', label: 'Low Risk', desc: 'Puddles / < 1 ft water', border: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
                { value: 'Moderate', label: 'Moderate', desc: '1-2 ft water / road block', border: 'border-yellow-300 bg-yellow-50 text-yellow-800' },
                { value: 'High', label: 'High Risk', desc: '2-4 ft / homes inundated', border: 'border-amber-300 bg-amber-50 text-amber-800' },
                { value: 'Critical', label: 'Critical', desc: '> 4 ft / Evacuation need', border: 'border-red-300 bg-red-50 text-red-800' }
              ].map((sev) => (
                <button
                  type="button"
                  key={sev.value}
                  onClick={() => setFormData({ ...formData, severity: sev.value as SeverityType })}
                  className={`p-3 rounded-xl border text-left transition ${
                    formData.severity === sev.value
                      ? `${sev.border} ring-2 ring-blue-600 font-bold shadow-sm`
                      : 'border-gray-200 bg-white text-slate-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs font-bold">{sev.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{sev.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flood Type & Water Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Flood Type / Origin <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.floodType}
                onChange={(e) => setFormData({ ...formData, floodType: e.target.value as FloodType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex justify-between">
                <span>Estimated Water Level</span>
                <span className="text-blue-700 font-bold">{formData.waterLevel} ft</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({ ...formData, waterLevel: parseFloat(e.target.value) })}
                  className="flex-1 accent-blue-600 cursor-pointer"
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({ ...formData, waterLevel: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-2 rounded-xl bg-white border border-gray-300 text-xs text-center text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Description */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>3. Situation Details & Observations</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Situation Description <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe road accessibility, rising river levels, trapped families, power outages, evacuation boat requirements..."
              className={`w-full p-3.5 rounded-xl bg-white border ${
                formErrors.description ? 'border-red-500' : 'border-gray-300'
              } text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed`}
            />
            {formErrors.description && (
              <p className="text-[11px] text-red-600 mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Affected count & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Estimated Affected People / Families
              </label>
              <input
                type="number"
                min="0"
                value={formData.affectedPeople}
                onChange={(e) => setFormData({ ...formData, affectedPeople: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Initial Alert Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-gray-200 pb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>4. Reporter Contact (Optional)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Reporter Name / Community Org
              </label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="e.g. Sunil Perera (Grama Niladhari division)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="e.g. +94 77 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>By submitting, you confirm this information is accurate to the best of your knowledge.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition disabled:opacity-50"
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
