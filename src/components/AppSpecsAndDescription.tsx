import React from 'react';
import { Info, Sparkles, CheckCircle2, HardDrive, Smartphone, Calendar, User, Code, Share2, Layers } from 'lucide-react';
import { AppInfo } from '../types';

interface AppSpecsAndDescriptionProps {
  appInfo: AppInfo;
  lang: 'en' | 'hi';
  onShareApp: () => void;
}

export const AppSpecsAndDescription: React.FC<AppSpecsAndDescriptionProps> = ({
  appInfo,
  lang,
  onShareApp,
}) => {
  return (
    <section className="py-12 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Full Description & Release Notes */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* What's New Box */}
            <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  {lang === 'hi' ? 'वर्जन 2.4.0 में क्या नया है?' : 'What\'s New in Version 2.4.0'}
                </h3>
              </div>
              <ul className="space-y-2">
                {appInfo.whatsNew[lang].map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About App Description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  {lang === 'hi' ? 'जै प्ले (Jai Play) ऐप के बारे में' : 'About Jai Play Video Player App'}
                </h3>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {appInfo.description[lang]}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {lang === 'hi' ? 'अंतिम अपडेट:' : 'Last Updated:'} <strong className="text-slate-200">{appInfo.updatedDate}</strong>
                </span>
                <button
                  onClick={onShareApp}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3.5 py-1.5 rounded-xl border border-blue-500/20 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'दोस्तों के साथ शेयर करें' : 'Share with Friends'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Technical Specifications Table */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>{lang === 'hi' ? 'तकनीकी विवरण (Technical Specs)' : 'Technical Specifications'}</span>
              </h3>

              <div className="space-y-3 text-xs">
                
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'ऐप का नाम' : 'App Name'}
                  </span>
                  <span className="font-bold text-white">{appInfo.name}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'वर्जन' : 'Version'}
                  </span>
                  <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {appInfo.version}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'फाइल साइज' : 'APK Size'}
                  </span>
                  <span className="font-bold text-white">{appInfo.size}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'आवश्यक एंड्रॉयड' : 'Min Android'}
                  </span>
                  <span className="font-bold text-white">6.0 & Higher</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'डेवलपर' : 'Developer'}
                  </span>
                  <span className="font-bold text-slate-200">{appInfo.developer}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'hi' ? 'अपडेट तिथि' : 'Updated'}
                  </span>
                  <span className="font-bold text-slate-200">{appInfo.updatedDate}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">{lang === 'hi' ? 'पैकेज नाम' : 'Package ID'}</span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {appInfo.packageName}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">{lang === 'hi' ? 'लाइसेंस' : 'License'}</span>
                  <span className="font-bold text-emerald-400">Free / Pro Features</span>
                </div>

              </div>

              {/* Security Audit Badge */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-center">
                <p className="text-[11px] font-semibold text-emerald-300">
                  ✓ {lang === 'hi' ? 'सुरक्षित और सत्यापित APK डिकोड' : 'Verified Security Audit Passed'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {lang === 'hi' ? 'कोई थर्ड-पार्टी एड्स या स्पायवेयर नहीं' : 'Zero Spyware & Clean Installation File'}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
