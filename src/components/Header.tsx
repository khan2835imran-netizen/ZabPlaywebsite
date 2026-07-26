import React from 'react';
import { Download, ShieldCheck, Settings, Globe, Play, Sparkles } from 'lucide-react';
import { AppInfo } from '../types';

interface HeaderProps {
  appInfo: AppInfo;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onOpenDownload: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  appInfo,
  lang,
  onToggleLang,
  onOpenDownload,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <div className="relative group cursor-pointer" onClick={onOpenDownload}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <img
              src={appInfo.iconUrl}
              alt={appInfo.name}
              className="relative w-10 h-10 rounded-xl object-cover shadow-lg border border-slate-700/50"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                {appInfo.name}
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {lang === 'hi' ? 'Official' : 'Official'}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {lang === 'hi' ? 'All-in-One HD Video Player' : 'HD & 4K Video Player App'}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Demo Player Shortcut */}
          <a
            href="#interactive-demo"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-blue-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-lg transition"
          >
            <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            {lang === 'hi' ? 'Live Demo' : 'Live Demo'}
          </a>

          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 transition cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'hi' ? 'English' : 'Hindi'}</span>
          </button>

          {/* Admin Control Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
            title={lang === 'hi' ? 'Admin Panel' : 'Admin Panel'}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAdminLoggedIn ? (lang === 'hi' ? 'Admin Active' : 'Admin Active') : (lang === 'hi' ? 'Admin Mode' : 'Admin')}
            </span>
          </button>

          {/* Download App CTA Button */}
          <button
            onClick={onOpenDownload}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold rounded-lg group bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <span className="relative px-3.5 py-1.5 transition-all ease-in duration-75 rounded-md flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 animate-bounce" />
              <span>{lang === 'hi' ? 'Download App' : 'Download APK'}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
