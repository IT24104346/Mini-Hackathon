import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportPage } from './pages/ReportPage';
import { MapPage } from './pages/MapPage';
import { AboutPage } from './pages/AboutPage';
import { AuthGatewayPage } from './pages/AuthGatewayPage';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, title: string, message?: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // If user is not authenticated, show ONLY the clean login & registration gateway (no data UI or navbar)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 text-slate-900">
        <AuthGatewayPage onShowToast={addToast} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  // Once authenticated, unlock full Flood-Safe-LK Portal with Home Page, Navbar, Map, and Data UI
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            {/* Authenticated Landing Page */}
            <Route path="/" element={<HomePage onShowToast={addToast} />} />
            
            {/* Community Flood Alerts Dashboard */}
            <Route path="/dashboard" element={<DashboardPage onShowToast={addToast} />} />
            
            {/* Report New Flood */}
            <Route path="/report" element={<ReportPage onShowToast={addToast} />} />
            
            {/* Disaster Map View */}
            <Route path="/map" element={<MapPage onShowToast={addToast} />} />
            
            {/* About Sri Lanka Flood Context */}
            <Route path="/about" element={<AboutPage />} />

            {/* Fallback to Home Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
