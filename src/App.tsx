import React, { useState, useEffect } from 'react';
import { initialData } from './data/initialData';
import { AppState, AppInfo, ScreenshotCard, UserReview } from './types';

import { Header } from './components/Header';
import { HeroDownload } from './components/HeroDownload';
import { AppScreenshots } from './components/AppScreenshots';
import { FeaturesList } from './components/FeaturesList';
import { AppSpecsAndDescription } from './components/AppSpecsAndDescription';
import { ReviewsSection } from './components/ReviewsSection';
import { InstallGuideModal } from './components/InstallGuideModal';
import { DownloadProgressModal } from './components/DownloadProgressModal';
import { QrCodeModal } from './components/QrCodeModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'zab_play_app_store_v2';

export default function App() {
  const [lang, setLang] = useState<'en' | 'hi'>('hi'); // Default to Hindi as requested by user
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved state', e);
    }
    return initialData;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Modal States
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check URL hash (#admin), path (/admin), or keyboard shortcut for secret admin access
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (hash.includes('admin') || pathname.includes('/admin') || search.includes('admin=true')) {
        setIsAdminModalOpen(true);
      }
    };

    checkAdminRoute();

    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Secret Keyboard shortcut: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [appState]);

  // Handlers
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleUpdateAppInfo = (updated: Partial<AppInfo>) => {
    setAppState((prev) => ({
      ...prev,
      appInfo: {
        ...prev.appInfo,
        ...updated,
      },
    }));
  };

  const handleUpdateAdminPin = (newPin: string) => {
    setAppState((prev) => ({
      ...prev,
      adminPin: newPin,
    }));
  };

  const handleAddScreenshot = (newCard: Omit<ScreenshotCard, 'id'>) => {
    const createdCard: ScreenshotCard = {
      ...newCard,
      id: `sc-${Date.now()}`,
    };
    setAppState((prev) => ({
      ...prev,
      screenshots: [createdCard, ...prev.screenshots],
    }));
  };

  const handleDeleteScreenshot = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((s) => s.id !== id),
    }));
  };

  const handleAddReview = (review: Omit<UserReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: UserReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      helpfulCount: 1,
    };
    setAppState((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews],
    }));
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: appState.appInfo.name,
        text: `Download ${appState.appInfo.name} - All-in-One HD & 4K Video Player with 200% Sound Booster & Private Vault!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'Website link copied to clipboard!' : 'App download link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Navbar */}
      <Header
        appInfo={appState.appInfo}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Sections */}
      <main>
        {/* Play Store Style Download Hero Section */}
        <HeroDownload
          appInfo={appState.appInfo}
          lang={lang}
          onStartDownload={() => setIsDownloadModalOpen(true)}
          onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
          onOpenQrCode={() => setIsQrCodeOpen(true)}
          onShareApp={handleShareApp}
        />

        {/* App Screenshot Cards & Design Posts */}
        <AppScreenshots
          screenshots={appState.screenshots}
          lang={lang}
          isAdminLoggedIn={isAdminLoggedIn}
          onAddScreenshot={handleAddScreenshot}
          onDeleteScreenshot={handleDeleteScreenshot}
        />

        {/* Key Features Breakdown Grid */}
        <FeaturesList
          features={appState.features}
          lang={lang}
        />

        {/* App Overview, Technical Specs & Release Notes */}
        <AppSpecsAndDescription
          appInfo={appState.appInfo}
          lang={lang}
          onShareApp={handleShareApp}
        />

        {/* User Reviews & Feedback */}
        <ReviewsSection
          reviews={appState.reviews}
          lang={lang}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer */}
      <Footer
        appInfo={appState.appInfo}
        lang={lang}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DownloadProgressModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        appInfo={appState.appInfo}
        lang={lang}
      />

      <InstallGuideModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
        lang={lang}
      />

      <QrCodeModal
        isOpen={isQrCodeOpen}
        onClose={() => setIsQrCodeOpen(false)}
        appInfo={appState.appInfo}
        lang={lang}
      />

      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash.toLowerCase().includes('admin')) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        appInfo={appState.appInfo}
        screenshots={appState.screenshots}
        adminPin={appState.adminPin}
        isAdminLoggedIn={isAdminLoggedIn}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
        onLogout={() => setIsAdminLoggedIn(false)}
        onUpdateAppInfo={handleUpdateAppInfo}
        onUpdateAdminPin={handleUpdateAdminPin}
        onAddScreenshot={handleAddScreenshot}
        onDeleteScreenshot={handleDeleteScreenshot}
        lang={lang}
      />
    </div>
  );
}
