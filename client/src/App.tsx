import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportPage } from './pages/ReportPage';
import { MapPage } from './pages/MapPage';
import { AboutPage } from './pages/AboutPage';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';

export const App: React.FC = () => {
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

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<HomePage onShowToast={addToast} />} />
            <Route path="/dashboard" element={<DashboardPage onShowToast={addToast} />} />
            <Route path="/report" element={<ReportPage onShowToast={addToast} />} />
            <Route path="/map" element={<MapPage onShowToast={addToast} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage onShowToast={addToast} />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    </BrowserRouter>
  );
};

export default App;
