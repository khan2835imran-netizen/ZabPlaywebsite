import React from 'react';
import { ShieldCheck, Heart, ArrowUp, Settings, Play } from 'lucide-react';
import { AppInfo } from '../types';

interface FooterProps {
  appInfo: AppInfo;
  lang: 'en' | 'hi';
  onOpenAdmin: () => void;
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  appInfo,
  lang,
  onOpenAdmin,
  onOpenDownload,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          <div className="flex items-center space-x-3">
            <img
              src={appInfo.iconUrl}
              alt={appInfo.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-800"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                {appInfo.name}
              </span>
              <p className="text-[11px] text-slate-400">
                {lang === 'hi'
                  ? 'Official Android 4K Video Player APK Center'
                  : 'Official Android APK Download Center'}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenDownload}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              {lang === 'hi' ? 'Download APK' : 'Download APK'}
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400">
          <p className="text-[11px]">
            © {new Date().getFullYear()} {appInfo.developer}. {lang === 'hi' ? 'All rights reserved.' : 'All rights reserved.'}
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Virus Free APK</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
