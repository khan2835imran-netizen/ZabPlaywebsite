import React from 'react';
import { Film, Cpu, Volume2, Lock, PictureInPicture, Subtitles, Sliders, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { FeatureItem } from '../types';

interface FeaturesListProps {
  features: FeatureItem[];
  lang: 'en' | 'hi';
}

const iconMap: Record<string, React.ElementType> = {
  Film,
  Cpu,
  Volume2,
  Lock,
  PictureInPicture,
  Subtitles,
  Sliders,
  Download,
};

export const FeaturesList: React.FC<FeaturesListProps> = ({ features, lang }) => {
  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'Key Feature Highlights' : 'Key Feature Highlights'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'Why ZabPlay is the Ultimate Video Player' : 'Why ZabPlay is the Ultimate Video Player'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {lang === 'hi'
              ? 'From 4K Ultra HD video playback to 200% sound boost & private vault, ZabPlay has it all.'
              : 'From 4K Ultra HD video playback to 200% sound boost & private vault, ZabPlay has it all.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const IconComponent = iconMap[item.iconName] || Film;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {item.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'Supported' : 'Included Pro Feature'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
