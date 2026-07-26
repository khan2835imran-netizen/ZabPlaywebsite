import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon, Plus, Trash2, X, Eye } from 'lucide-react';
import { ScreenshotCard } from '../types';

interface AppScreenshotsProps {
  screenshots: ScreenshotCard[];
  lang: 'en' | 'hi';
  isAdminLoggedIn: boolean;
  onAddScreenshot?: (newCard: Omit<ScreenshotCard, 'id'>) => void;
  onDeleteScreenshot?: (id: string) => void;
}

export const AppScreenshots: React.FC<AppScreenshotsProps> = ({
  screenshots,
  lang,
  isAdminLoggedIn,
  onAddScreenshot,
  onDeleteScreenshot,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Form state for adding new screenshot
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleHi, setNewTitleHi] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescHi, setNewDescHi] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newBadge, setNewBadge] = useState('4K HD');

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleScreenshotFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl || !newTitleEn) return;

    if (onAddScreenshot) {
      onAddScreenshot({
        title: {
          en: newTitleEn,
          hi: newTitleHi || newTitleEn,
        },
        description: {
          en: newDescEn || 'High definition app screenshot',
          hi: newDescHi || newDescEn || 'हाई-डेफिनिशन ऐप स्क्रीनशॉट',
        },
        imageUrl: newImageUrl,
        badge: newBadge,
        category: 'Player UI',
      });
    }

    setNewTitleEn('');
    setNewTitleHi('');
    setNewDescEn('');
    setNewDescHi('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  const selectedImage = selectedIndex !== null ? screenshots[selectedIndex] : null;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : screenshots.length - 1));
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! < screenshots.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'Google Play Store View' : 'Google Play Store View'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'ZabPlay - Official App Screenshots' : 'ZabPlay - Official App Screenshots'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {lang === 'hi'
                ? 'Swipe left or right to explore HD player screens, 200% sound equalizer, private vault & PIP mode.'
                : 'Swipe left or right to explore HD player screens, 200% sound equalizer, private vault & PIP mode.'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Scroll Left & Right Controls */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-2xl">
              <button
                onClick={scrollLeft}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-500 px-1">
                {screenshots.length} Photos
              </span>
              <button
                onClick={scrollRight}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Admin Upload Button */}
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl shadow-lg transition cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'hi' ? 'Upload Photo' : 'Upload Photo'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Play Store Style Horizontal Scroll Row */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1 scroll-smooth"
          >
            {screenshots.map((card, index) => (
              <div
                key={card.id}
                onClick={() => setSelectedIndex(index)}
                className="flex-shrink-0 snap-start w-[200px] sm:w-[230px] md:w-[250px] h-[390px] sm:h-[440px] md:h-[480px] rounded-[1.8rem] sm:rounded-[2.2rem] p-1.5 sm:p-2 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl shadow-slate-950/80 hover:border-blue-500/80 hover:shadow-blue-500/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative group overflow-hidden"
              >
                {/* Smartphone Camera Notch Bar */}
                <div className="w-14 sm:w-16 h-2.5 sm:h-3 bg-black rounded-full mx-auto mb-1 opacity-90 border border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                </div>

                {/* Inner Screen Canvas */}
                <div className="relative w-full h-[calc(100%-1.25rem)] rounded-[1.3rem] sm:rounded-[1.7rem] overflow-hidden bg-black border border-slate-800/90">
                  <img
                    src={card.imageUrl}
                    alt={card.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20 opacity-80 group-hover:opacity-40 transition-opacity"></div>

                  {/* Top Badge Tag */}
                  {card.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow border border-blue-400/30">
                      {card.badge}
                    </span>
                  )}

                  {/* Fullscreen Eye Preview Button on Hover */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-slate-700 hover:bg-blue-600">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Title Label overlay (Play Store style) */}
                  <div className="absolute bottom-3 left-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/80 text-center">
                    <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {card.title[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Floating Scroll Arrows for Desktop */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-slate-950/90 hover:bg-blue-600 text-white rounded-full flex items-center justify-center border border-slate-700 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
            title="Previous Screenshot"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-slate-950/90 hover:bg-blue-600 text-white rounded-full flex items-center justify-center border border-slate-700 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity cursor-pointer hidden sm:flex"
            title="Next Screenshot"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    {selectedImage.badge || 'HD Preview'}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedIndex! + 1} of {screenshots.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isAdminLoggedIn && onDeleteScreenshot && (
                    <button
                      onClick={() => {
                        onDeleteScreenshot(selectedImage.id);
                        setSelectedIndex(null);
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition cursor-pointer"
                      title="Delete screenshot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="p-2 bg-slate-800 hover:bg-rose-600 text-white rounded-full transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Viewer Container with Prev/Next Navigation */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] sm:min-h-[500px] overflow-hidden p-4">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title[lang]}
                  className="max-h-[65vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
                  referrerPolicy="no-referrer"
                />

                {/* Left Arrow */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-950/80 hover:bg-blue-600 text-white rounded-full border border-slate-700 transition cursor-pointer shadow-lg"
                  title="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-950/80 hover:bg-blue-600 text-white rounded-full border border-slate-700 transition cursor-pointer shadow-lg"
                  title="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {selectedImage.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {selectedImage.description[lang]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Add Screenshot Quick Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  {lang === 'hi' ? 'Upload App Screenshot to Store' : 'Upload App Screenshot to Store'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Upload Screenshot File from Phone/PC
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotFileUpload}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    OR Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitleEn}
                      onChange={(e) => setNewTitleEn(e.target.value)}
                      placeholder="e.g. 4K Ultra Player"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      placeholder="e.g. 4K HD / Equalizer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {newImageUrl && (
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-3">
                    <img src={newImageUrl} alt="Preview" className="w-12 h-16 object-cover rounded-lg bg-black" />
                    <span className="text-xs text-emerald-400 font-bold">Image loaded!</span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-800 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg cursor-pointer"
                  >
                    {lang === 'hi' ? 'Save Screenshot' : 'Save Screenshot'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
