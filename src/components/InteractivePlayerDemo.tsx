import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Maximize, Sliders, Subtitles, FastForward, PictureInPicture, Zap, Sparkles, Shield, RotateCcw } from 'lucide-react';

interface InteractivePlayerDemoProps {
  lang: 'en' | 'hi';
}

export const InteractivePlayerDemo: React.FC<InteractivePlayerDemoProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(150); // 150% boosted volume default
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [subtitle, setSubtitle] = useState<'off' | 'hi' | 'en'>('hi');
  const [eqPreset, setEqPreset] = useState('Bass Boost 200%');
  const [isPipMode, setIsPipMode] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'fit' | 'stretch' | 'zoom'>('fit');
  const [progress, setProgress] = useState(35);

  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

  return (
    <section id="interactive-demo" className="py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'वेबसाइट पर ही चलाकर देखें' : 'Try Live Feature Test Drive'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'जै प्ले वीडियो प्लेयर - लाइव डेमो' : 'Jai Play HD Player - Interactive Demo'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {lang === 'hi'
              ? '200% वॉल्यूम बूस्ट, सबटाइटल, फ्लोटिंग PIP मोड और इक्वलाइज़र का लाइव अनुभव लें!'
              : 'Test Jai Play features below: 200% sound boost, live subtitle sync, equalizer presets, and PIP window.'}
          </p>
        </div>

        {/* Demo Player Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Interactive Player Window */}
            <div className={`lg:col-span-8 transition-all duration-300 ${isPipMode ? 'fixed bottom-6 right-6 w-80 z-50 shadow-2xl rounded-2xl overflow-hidden border-2 border-blue-500' : 'relative w-full rounded-2xl overflow-hidden bg-black border border-slate-800'}`}>
              
              {/* Video Element */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src={sampleVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full ${
                    aspectRatio === 'fit' ? 'object-contain' : aspectRatio === 'stretch' ? 'object-fill' : 'object-cover'
                  }`}
                />

                {/* Subtitle Overlay */}
                {subtitle !== 'off' && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-xs sm:text-sm font-bold px-3 py-1 rounded-md border border-yellow-500/30 text-center max-w-[90%] shadow-lg">
                    {subtitle === 'hi'
                      ? 'जै प्ले: 4K अल्ट्रा एचडी प्लेबैक और सबटाइटल ऑटो सिंक एक्टिवेटेड'
                      : 'Jai Play: 4K Ultra HD playback with live hardware acceleration'}
                  </div>
                )}

                {/* Player HUD Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold">Jai Play HW+ 4K</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600/80 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                      EQ: {eqPreset}
                    </span>
                    <span className="bg-purple-600/80 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                      {volume}% Vol
                    </span>
                  </div>
                </div>

                {/* Center Play/Pause button */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-14 h-14 bg-blue-600/80 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                </button>
              </div>

              {/* Player Controls Bar */}
              <div className="bg-slate-950 p-3 sm:p-4 border-t border-slate-800 space-y-3">
                
                {/* Seek Bar */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>01:15</span>
                  <div className="flex-1 bg-slate-800 h-1.5 rounded-full relative cursor-pointer group">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow border border-blue-500" style={{ left: `${progress}%` }}></div>
                  </div>
                  <span>03:20</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-800 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                      {[0.5, 1.0, 1.5, 2.0].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                            playbackSpeed === spd ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* PIP Mode Toggle */}
                    <button
                      onClick={() => setIsPipMode(!isPipMode)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                        isPipMode
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                      title="Toggle Floating Window"
                    >
                      <PictureInPicture className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isPipMode ? 'Exit PIP' : 'PIP Mode'}</span>
                    </button>

                    {/* Aspect Ratio */}
                    <button
                      onClick={() => {
                        const next = aspectRatio === 'fit' ? 'stretch' : aspectRatio === 'stretch' ? 'zoom' : 'fit';
                        setAspectRatio(next);
                      }}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-xs font-semibold uppercase cursor-pointer"
                    >
                      {aspectRatio}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Controls & Presets Sandbox */}
            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>{lang === 'hi' ? 'जै प्ले फीचर्स कंट्रोल टूलकिट' : 'Jai Play Feature Controls'}</span>
              </h3>

              {/* Volume Booster Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    {lang === 'hi' ? '200% वॉल्यूम बूस्टर' : 'Volume Amplifier (Up to 200%)'}
                  </span>
                  <span className="text-purple-400 font-bold">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Mute</span>
                  <span>100% Normal</span>
                  <span className="text-purple-400 font-bold">200% Boosted</span>
                </div>
              </div>

              {/* Subtitle Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  <Subtitles className="w-3.5 h-3.5 inline mr-1 text-blue-400" />
                  {lang === 'hi' ? 'सबटाइटल भाषा सिंक' : 'Live Subtitle Sync Language'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSubtitle('off')}
                    className={`py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                      subtitle === 'off' ? 'bg-slate-800 text-white border-slate-600' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Off
                  </button>
                  <button
                    onClick={() => setSubtitle('hi')}
                    className={`py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                      subtitle === 'hi' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    हिंदी (Hindi)
                  </button>
                  <button
                    onClick={() => setSubtitle('en')}
                    className={`py-1.5 text-xs font-semibold rounded-lg border cursor-pointer ${
                      subtitle === 'en' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Equalizer Preset Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  <Zap className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                  {lang === 'hi' ? 'इक्वलाइज़र और 3D बेस बूस्ट प्रीसेट्स' : '10-Band Equalizer Sound Presets'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Bass Boost 200%', '3D Surround', 'Cinematic Rock', 'Vocal Enhancer'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setEqPreset(preset)}
                      className={`px-3 py-2 text-[11px] font-bold rounded-xl border text-left transition cursor-pointer ${
                        eqPreset === preset
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Badge Footer */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  {lang === 'hi' ? 'HW+ एक्सीलरेशन ऑन' : 'HW+ Acceleration ON'}
                </span>
                <span className="text-slate-500">60 FPS 4K</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
