import React, { useState } from 'react';
import { Maximize2, Sparkles, Image as ImageIcon, Plus, Trash2, Edit3, X, Eye } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<ScreenshotCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding new screenshot
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleHi, setNewTitleHi] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescHi, setNewDescHi] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newBadge, setNewBadge] = useState('New Feature');
  const [newCategory, setNewCategory] = useState('Player UI');

  const categories = ['All', 'Player UI', 'Audio Engine', 'Multitasking', 'Security', 'Utility'];

  const filteredScreenshots = activeCategory === 'All'
    ? screenshots
    : screenshots.filter(s => s.category === activeCategory);

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
          en: newDescEn,
          hi: newDescHi || newDescEn,
        },
        imageUrl: newImageUrl,
        badge: newBadge,
        category: newCategory,
      });
    }

    // Reset form
    setNewTitleEn('');
    setNewTitleHi('');
    setNewDescEn('');
    setNewDescHi('');
    setNewImageUrl('');
    setIsAddModalOpen(false);
  };

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'ऐप के अंदर की झलकियां' : 'App Gallery & Inside Look'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'जै प्ले - ऐप स्क्रीनशॉट्स और फोटो कार्ड्स' : 'Jai Play - Screenshots & Photo Cards'}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {lang === 'hi'
                ? 'देखिए जै प्ले वीडियो प्लेयर ऐप के अंदर क्या-क्या खास डिजाइन और फीचर्स हैं।'
                : 'Explore high-definition previews of player controls, audio booster, private vault, and pop-up mode.'}
            </p>
          </div>

          {/* Admin Add New Photo Button */}
          {isAdminLoggedIn && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition cursor-pointer self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'hi' ? 'नया फोटो कार्ड अपलोड करें' : 'Upload New Photo Card'}</span>
            </button>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Screenshots Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreenshots.map((card) => (
            <div
              key={card.id}
              className="group relative bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setSelectedImage(card)}>
                <img
                  src={card.imageUrl}
                  alt={card.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {/* Badge top right */}
                {card.badge && (
                  <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow border border-blue-400/30">
                    {card.badge}
                  </span>
                )}

                {/* View Zoom Button */}
                <div className="absolute top-3 right-3 bg-slate-950/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-blue-600">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                    {card.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.description[lang]}
                  </p>
                </div>

                {/* Bottom Actions for Users/Admin */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedImage(card)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'बड़ा देखें' : 'View High Res'}</span>
                  </button>

                  {/* Admin Delete Action */}
                  {isAdminLoggedIn && onDeleteScreenshot && (
                    <button
                      onClick={() => onDeleteScreenshot(card.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 hover:bg-rose-600 text-white rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title[lang]}
                  className="max-h-[75vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-slate-900">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {selectedImage.badge || selectedImage.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.title[lang]}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedImage.description[lang]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Add Screenshot Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                  {lang === 'hi' ? 'नया ऐप फोटो/स्क्रीनशॉट जोड़ें' : 'Add New App Photo / Screenshot'}
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
                    Image URL / फोटो लिंक (High Res Image) *
                  </label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Enter any public image URL or custom design poster URL.
                  </p>
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
                      Title (Hindi / हिंदी)
                    </label>
                    <input
                      type="text"
                      value={newTitleHi}
                      onChange={(e) => setNewTitleHi(e.target.value)}
                      placeholder="उदा: 4K अल्ट्रा प्लेयर"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      placeholder="e.g. 4K HD / Ultra Sound"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Player UI">Player UI</option>
                      <option value="Audio Engine">Audio Engine</option>
                      <option value="Multitasking">Multitasking</option>
                      <option value="Security">Security</option>
                      <option value="Utility">Utility</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={newDescEn}
                    onChange={(e) => setNewDescEn(e.target.value)}
                    placeholder="Short feature description..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description (Hindi / हिंदी)
                  </label>
                  <textarea
                    rows={2}
                    value={newDescHi}
                    onChange={(e) => setNewDescHi(e.target.value)}
                    placeholder="छोटा विवरण हिंदी में..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-800 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                  >
                    {lang === 'hi' ? 'फोटो अपलोड करें' : 'Add Photo Card'}
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
