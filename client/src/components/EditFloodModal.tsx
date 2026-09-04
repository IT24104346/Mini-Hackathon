import React, { useState, useEffect } from 'react';
import { FloodReport, UpdateFloodInput, SeverityType, StatusType, FloodType } from '../types/flood';
import { DISTRICT_NAMES, detectDistrictFromLocation, getTownSuggestions, TownLocation } from '../utils/districts';
import { X, Save, AlertCircle, Loader2, Check } from 'lucide-react';

interface EditFloodModalProps {
  report: FloodReport | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: UpdateFloodInput) => Promise<void>;
}

export const EditFloodModal: React.FC<EditFloodModalProps> = ({
  report,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<UpdateFloodInput>({
    location: '',
    district: 'Colombo',
    description: '',
    floodType: 'Heavy Rain Flooding',
    severity: 'Moderate',
    waterLevel: 0,
    affectedPeople: 0,
    status: 'Active'
  });

  const [autoDetectedMatch, setAutoDetectedMatch] = useState<{
    district: string;
    matchedTown: string;
  } | null>(null);

  const [townSuggestions, setTownSuggestions] = useState<TownLocation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (report) {
      setFormData({
        location: report.location,
        district: report.district,
        description: report.description,
        floodType: report.floodType,
        severity: report.severity,
        waterLevel: report.waterLevel,
        affectedPeople: report.affectedPeople,
        status: report.status,
        latitude: report.latitude,
        longitude: report.longitude,
        reporterName: report.reporterName || '',
        contactNumber: report.contactNumber || ''
      });
      setAutoDetectedMatch(null);
      setTownSuggestions([]);
      setErrorMessage(null);
    }
  }, [report]);

  if (!isOpen || !report) return null;

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

      const suggestions = getTownSuggestions(val, 3);
      setTownSuggestions(suggestions);
    } else {
      setAutoDetectedMatch(null);
      setTownSuggestions([]);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.location || formData.location.trim().length < 2) {
      setErrorMessage('Please enter a location name (at least 2 characters).');
      return;
    }

    if (!formData.description || formData.description.trim().length < 10) {
      setErrorMessage('Description must contain at least 10 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(report._id, formData);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update flood report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Update Flood Situation Report</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Reflect current water level, status changes, and updated affected numbers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="whitespace-pre-line">{errorMessage}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Status & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Current Status <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="Active">🔴 Active (Ongoing Emergency)</option>
                <option value="Monitoring">🟡 Monitoring (Stable / Cautious)</option>
                <option value="Resolved">🟢 Resolved (Water Receded)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Severity Level <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as SeverityType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>
          </div>

          {/* Location & District with Auto Detection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Location Name / Town <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="e.g. Wellampitiya, Biyagama, Galle..."
                required
              />
              {autoDetectedMatch && (
                <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Detected: {autoDetectedMatch.district} District</span>
                </p>
              )}

              {townSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1.5 space-y-1">
                  {townSuggestions.map((item) => (
                    <button
                      type="button"
                      key={`${item.town}-${item.district}`}
                      onClick={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                    >
                      <span className="text-slate-200">📍 {item.town}</span>
                      <span className="text-[10px] text-cyan-400 font-semibold">{item.district}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                District <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                {DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Flood Type & Water Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Flood Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.floodType}
                onChange={(e) => setFormData({ ...formData, floodType: e.target.value as FloodType })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="River Overflow">River Overflow</option>
                <option value="Flash Flood">Flash Flood</option>
                <option value="Urban Flood">Urban Flood</option>
                <option value="Landslide-related Flooding">Landslide-related Flooding</option>
                <option value="Heavy Rain Flooding">Heavy Rain Flooding</option>
                <option value="Coastal Surge">Coastal Surge</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Water Level (in feet) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="50"
                value={formData.waterLevel ?? 0}
                onChange={(e) => setFormData({ ...formData, waterLevel: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Affected People & Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Estimated Affected People
            </label>
            <input
              type="number"
              min="0"
              value={formData.affectedPeople ?? 0}
              onChange={(e) => setFormData({ ...formData, affectedPeople: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Situation Description & Update Notes <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              placeholder="Describe current status, road accessibility, water depth changes..."
              required
            />
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
