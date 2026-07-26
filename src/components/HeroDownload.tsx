import React from 'react';
import { Download, Star, ShieldCheck, QrCode, HelpCircle, Share2, CheckCircle2, Sparkles, HardDrive, Smartphone, Flame } from 'lucide-react';
import { AppInfo } from '../types';

interface HeroDownloadProps {
  appInfo: AppInfo;
  lang: 'en' | 'hi';
  onStartDownload: () => void;
  onOpenInstallGuide: () => void;
  onOpenQrCode: () => void;
  onShareApp: () => void;
}

export const HeroDownload: React.FC<HeroDownloadProps> = ({
  appInfo,
  lang,
  onStartDownload,
  onOpenInstallGuide,
  onOpenQrCode,
  onShareApp,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Announcement Banner */}
        {appInfo.announcement && (
          <div className="mb-6 bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 border border-blue-500/30 rounded-2xl p-3 sm:p-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                <Flame className="w-5 h-5 animate-pulse text-amber-400" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-200">
                {appInfo.announcement}
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-1 rounded-full whitespace-nowrap">
              {lang === 'hi' ? 'नया अपडेट' : 'Latest Release'}
            </span>
          </div>
        )}

        {/* Main App Container Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-blue-950/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: App Thumbnail & App Meta */}
            <div className="md:col-span-8 flex flex-col sm:flex-row gap-6 items-start">
              {/* App Icon */}
              <div className="relative group self-center sm:self-start flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={appInfo.iconUrl}
                  alt={appInfo.name}
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-2xl border-2 border-slate-700/80 bg-slate-950"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SAFE
                </div>
              </div>

              {/* Title & Stats */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {lang === 'hi' ? 'ऑल-इन-वन वीडियो प्लेयर' : 'All-in-One Player'}
                  </span>
                  <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {appInfo.version}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {appInfo.name}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {appInfo.subtitle}
                </p>

                <p className="text-xs text-blue-400 font-semibold mb-5 flex items-center justify-center sm:justify-start gap-1">
                  <span>{lang === 'hi' ? 'डेवलपर:' : 'Developer:'}</span>
                  <span className="text-slate-200">{appInfo.developer}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </p>

                {/* Key Store Badges (Rating, Downloads, Size, Age) */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 py-3 border-y border-slate-800/80">
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start text-amber-400 font-bold text-base">
                      <span>{appInfo.rating}</span>
                      <Star className="w-4 h-4 fill-amber-400 ml-1" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {appInfo.totalRatings.toLocaleString()} {lang === 'hi' ? 'रिव्यूज' : 'reviews'}
                    </p>
                  </div>

                  <div className="text-center sm:text-left border-l border-slate-800 pl-3">
                    <div className="text-white font-bold text-base">
                      {appInfo.downloads}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'hi' ? 'डाउनलोड्स' : 'Downloads'}
                    </p>
                  </div>

                  <div className="text-center sm:text-left border-l border-slate-800 pl-3">
                    <div className="text-white font-bold text-base flex items-center justify-center sm:justify-start gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{appInfo.size}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'hi' ? 'फाइल साइज' : 'APK Size'}
                    </p>
                  </div>

                  <div className="hidden sm:block text-left border-l border-slate-800 pl-3">
                    <div className="text-emerald-400 font-bold text-base flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>3+</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'hi' ? 'एंड्रॉयड 6.0+' : 'Android 6.0+'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Download Action Box */}
            <div className="md:col-span-4 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-inner">
              <div className="text-center md:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center justify-center md:justify-start gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {lang === 'hi' ? '100% सुरक्षित और वायरस फ्री APK' : '100% Verified Safe & Virus Free'}
                </span>
                <p className="text-xs text-slate-400">
                  {lang === 'hi' 
                    ? 'बिना किसी विज्ञापन या बग के डायरेक्ट हाई-स्पीड डाउनलोड।' 
                    : 'Direct high-speed APK download with zero malware.'}
                </p>
              </div>

              {/* Big Download APK Button */}
              <button
                onClick={onStartDownload}
                className="w-full relative group overflow-hidden rounded-xl p-0.5 font-extrabold text-white text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl"></div>
                <div className="relative px-6 py-4 bg-slate-950/30 rounded-lg flex items-center justify-center gap-3">
                  <Download className="w-6 h-6 animate-bounce text-white" />
                  <div className="text-left leading-tight">
                    <div className="text-base font-black tracking-wide text-white">
                      {lang === 'hi' ? 'डाउनलोड APK (v2.4.0)' : 'DOWNLOAD APK'}
                    </div>
                    <div className="text-[11px] font-normal text-blue-200">
                      {appInfo.size} • {lang === 'hi' ? 'डायरेक्ट फाइल' : 'Direct Android File'}
                    </div>
                  </div>
                </div>
              </button>

              {/* Secondary Buttons Row */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button
                  onClick={onOpenInstallGuide}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition text-center cursor-pointer"
                  title="How to install APK"
                >
                  <HelpCircle className="w-4 h-4 text-blue-400 mb-1" />
                  <span className="text-[10px] font-medium leading-tight">
                    {lang === 'hi' ? 'कैसे इनस्टॉल करें' : 'Install Guide'}
                  </span>
                </button>

                <button
                  onClick={onOpenQrCode}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition text-center cursor-pointer"
                  title="QR Code Scan"
                >
                  <QrCode className="w-4 h-4 text-indigo-400 mb-1" />
                  <span className="text-[10px] font-medium leading-tight">
                    {lang === 'hi' ? 'QR कोड स्कैन' : 'Scan QR'}
                  </span>
                </button>

                <button
                  onClick={onShareApp}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition text-center cursor-pointer"
                  title="Share App"
                >
                  <Share2 className="w-4 h-4 text-purple-400 mb-1" />
                  <span className="text-[10px] font-medium leading-tight">
                    {lang === 'hi' ? 'शेयर करें' : 'Share App'}
                  </span>
                </button>
              </div>

              {/* Security Badges Footer */}
              <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-3 pt-1">
                <span>✓ {lang === 'hi' ? 'गूगल प्ले प्रोटेक्ट टेस्टेड' : 'Google Play Protect Verified'}</span>
                <span>•</span>
                <span>✓ {lang === 'hi' ? 'नो रूट रिक्वायर्ड' : 'No Root Needed'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
