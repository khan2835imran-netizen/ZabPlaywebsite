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
            {lang === 'hi' ? 'एंड्रॉयड पर APK कैसे इनस्टॉल करें' : 'How to Install APK on Android'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'hi'
              ? 'जै प्ले (Jai Play) ऐप को सुरक्षित रूप से इनस्टॉल करने के आसान 4 स्टेप्स:'
              : 'Follow these 4 simple steps to install Jai Play safely on your phone:'}
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
                {lang === 'hi' ? 'APK फाइल डाउनलोड करें' : 'Download APK File'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'ऊपर "डाउनलोड APK" बटन दबाएं और फाइल सेव होने का इंतजार करें।'
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
                {lang === 'hi' ? 'डाउनलोड हुई फाइल खोलें' : 'Open Downloaded File'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'ब्राउज़र के डाउनलोड फोल्डर में जाएं और "JaiPlay_v2.4.0.apk" पर टैप करें।'
                  : 'Go to Downloads and tap "JaiPlay_v2.4.0.apk".'}
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
                {lang === 'hi' ? 'अननोन सोर्सेज की अनुमति दें' : 'Allow Unknown Sources (If Prompted)'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? 'यदि फोन पूछे तो Settings > "Allow from this source" पर स्विच ऑन करें।'
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
                {lang === 'hi' ? 'इनस्टॉल करें और आनंद लें' : 'Tap Install & Launch'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'hi'
                  ? '"Install" दबाएं और ऐप खुलने पर 4K वीडियो प्लेयर का मजा लें!'
                  : 'Click "Install" and enjoy Jai Play HD Video Player!'}
              </p>
            </div>
          </div>

        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition cursor-pointer"
          >
            {lang === 'hi' ? 'समझ आ गया! (Got it)' : 'Understood'}
          </button>
        </div>

      </div>
    </div>
  );
};
