import React from 'react';
import { X, ShieldCheck, Download, Smartphone, Settings, CheckCircle } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {lang === 'hi' ? 'How to Install APK on Android' : 'How to Install APK on Android'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'hi'
              ? 'Follow these 4 simple steps to install ZabPlay safely on your phone:'
              : 'Follow these 4 simple steps to install ZabPlay safely on your phone:'}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-6">
          
          <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-blue-400" />
                {lang === 'hi' ? 'Download APK File' : 'Download APK File'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'Tap "Download APK" button above and wait for the download to complete.'
                  : 'Tap "Download APK" button above and wait for the download to complete.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                {lang === 'hi' ? 'Open Downloaded File' : 'Open Downloaded File'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'Go to Downloads and tap "ZabPlay_v2.4.0.apk".'
                  : 'Go to Downloads and tap "ZabPlay_v2.4.0.apk".'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'hi' ? 'Allow Unknown Sources (If Prompted)' : 'Allow Unknown Sources (If Prompted)'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'If Chrome or File Manager asks, go to Settings and turn on "Allow from this source".'
                  : 'If Chrome or File Manager asks, go to Settings and turn on "Allow from this source".'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'hi' ? 'Tap Install & Launch' : 'Tap Install & Launch'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'Click "Install" and enjoy ZabPlay HD Video Player!'
                  : 'Click "Install" and enjoy ZabPlay HD Video Player!'}
              </p>
            </div>
          </div>

        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition cursor-pointer"
          >
            {lang === 'hi' ? 'Understood' : 'Understood'}
          </button>
        </div>

      </div>
    </div>
  );
};
