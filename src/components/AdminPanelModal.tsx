import React, { useState } from 'react';
import { Settings, Lock, X, Upload, Save, Image as ImageIcon, FileText, CheckCircle2, Shield, Trash2, KeyRound, AlertCircle, Plus } from 'lucide-react';
import { AppInfo, ScreenshotCard } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  appInfo: AppInfo;
  screenshots: ScreenshotCard[];
  adminPin: string;
  isAdminLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onUpdateAppInfo: (updated: Partial<AppInfo>) => void;
  onUpdateAdminPin: (newPin: string) => void;
  onAddScreenshot: (newCard: Omit<ScreenshotCard, 'id'>) => void;
  onDeleteScreenshot: (id: string) => void;
  lang: 'en' | 'hi';
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  appInfo,
  screenshots,
  adminPin,
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
  onUpdateAppInfo,
  onUpdateAdminPin,
  onAddScreenshot,
  onDeleteScreenshot,
  lang,
}) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'photos' | 'description' | 'security'>('app');

  // Form states for app info
  const [name, setName] = useState(appInfo.name);
  const [subtitle, setSubtitle] = useState(appInfo.subtitle);
  const [version, setVersion] = useState(appInfo.version);
  const [size, setSize] = useState(appInfo.size);
  const [downloads, setDownloads] = useState(appInfo.downloads);
  const [developer, setDeveloper] = useState(appInfo.developer);
  const [downloadUrl, setDownloadUrl] = useState(appInfo.downloadUrl);
  const [announcement, setAnnouncement] = useState(appInfo.announcement || '');

  // Form states for description & release notes
  const [descEn, setDescEn] = useState(appInfo.description.en);
  const [descHi, setDescHi] = useState(appInfo.description.hi);
  const [whatsNewEnText, setWhatsNewEnText] = useState(appInfo.whatsNew.en.join('\n'));
  const [whatsNewHiText, setWhatsNewHiText] = useState(appInfo.whatsNew.hi.join('\n'));

  // Form states for security
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // New Screenshot State
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleHi, setNewTitleHi] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setPinError(false);
      onLoginSuccess();
    } else {
      setPinError(true);
    }
  };

  const handleSaveAppInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppInfo({
      name,
      subtitle,
      version,
      size,
      downloads,
      developer,
      downloadUrl,
      announcement,
    });
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleSaveDescription = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppInfo({
      description: {
        en: descEn,
        hi: descHi,
      },
      whatsNew: {
        en: whatsNewEnText.split('\n').filter(Boolean),
        hi: whatsNewHiText.split('\n').filter(Boolean),
      },
    });
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handlePinChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      onUpdateAdminPin(newPin);
      setNewPin('');
      setPinSuccessMsg(true);
      setTimeout(() => setPinSuccessMsg(false), 3000);
    }
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate uploading APK file or creating blob URL
      const fileBlobUrl = URL.createObjectURL(file);
      setDownloadUrl(fileBlobUrl);
      setSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      onUpdateAppInfo({
        downloadUrl: fileBlobUrl,
        isApkUploaded: true,
        uploadedFileName: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
      alert(lang === 'hi' ? `सफलतापूर्वक अपलोड किया गया: ${file.name}` : `APK File uploaded successfully: ${file.name}`);
    }
  };

  const handleAddPhotoCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgUrl || !newTitleEn) return;

    onAddScreenshot({
      title: { en: newTitleEn, hi: newTitleHi || newTitleEn },
      description: { en: 'Custom design card uploaded by Admin.', hi: 'एडमिन द्वारा अपलोड किया गया फोटो कार्ड।' },
      imageUrl: newImgUrl,
      badge: 'Admin Upload',
      category: 'Player UI',
    });

    setNewImgUrl('');
    setNewTitleEn('');
    setNewTitleHi('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950 rounded-full cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{lang === 'hi' ? 'जै प्ले - एडमिन कंट्रोल पैनल' : 'Jai Play - Admin Manager'}</span>
              {isAdminLoggedIn && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Logged In
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'यहाँ से आप APK अपलोड कर सकते हैं, ऐप की डिटेल्स और फोटो कार्ड्स बदल सकते हैं।'
                : 'Upload new APK, manage store info, add photo cards, and update app version.'}
            </p>
          </div>
        </div>

        {/* Step 1: Login Form if not logged in */}
        {!isAdminLoggedIn ? (
          <form onSubmit={handlePinSubmit} className="max-w-md mx-auto space-y-4 py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto mb-2 text-amber-400">
              <Lock className="w-7 h-7" />
            </div>

            <h4 className="text-base font-bold text-white">
              {lang === 'hi' ? 'एडमिन पासकोड दर्ज करें' : 'Enter Admin Passcode'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'सिर्फ आप (एडमिन) ही ऐप को अपडेट या अपलोड कर सकते हैं। डिफ़ॉल्ट पिन 1234 है।'
                : 'Only you (Admin) can upload or modify Jai Play details. Default PIN is 1234.'}
            </p>

            <div>
              <input
                type="password"
                maxLength={8}
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="PIN (Default: 1234)"
                className="w-full text-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-bold text-white tracking-widest focus:border-amber-500 focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-medium mt-1 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {lang === 'hi' ? 'गलत पासकोड! पुनः प्रयास करें।' : 'Incorrect PIN! Try default PIN 1234.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition cursor-pointer"
            >
              {lang === 'hi' ? 'एडमिन लॉगिन' : 'Unlock Admin Panel'}
            </button>
          </form>
        ) : (
          /* Step 2: Admin Dashboard when Logged In */
          <div className="space-y-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              <button
                onClick={() => setActiveTab('app')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'app'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'APK व ऐप सेटिंग' : 'APK & App Settings'}</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'photos'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'फोटो कार्ड्स' : 'Photo Cards'}</span>
              </button>

              <button
                onClick={() => setActiveTab('description')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'विवरण व अपडेट्स' : 'Description & Notes'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'सुरक्षा पिन' : 'Admin Security'}</span>
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'सफलतापूर्वक सेव कर दिया गया!' : 'Settings saved successfully!'}</span>
              </div>
            )}

            {/* TAB 1: App Settings & APK Upload */}
            {activeTab === 'app' && (
              <form onSubmit={handleSaveAppInfo} className="space-y-4">
                
                {/* File Upload Box */}
                <div className="bg-slate-950 border border-dashed border-blue-500/40 rounded-2xl p-4 text-center">
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">
                    {lang === 'hi' ? 'नया APK फाइल अपलोड करें' : 'Upload New APK File'}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3">
                    {lang === 'hi'
                      ? 'अपने कंप्यूटर या फोन से सीधे नया .apk फाइल चुनें:'
                      : 'Select a direct .apk file from your device:'}
                  </p>
                  
                  <input
                    type="file"
                    accept=".apk"
                    onChange={handleFileUploadSim}
                    className="hidden"
                    id="apk-upload-input"
                  />
                  <label
                    htmlFor="apk-upload-input"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-lg transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'APK फाइल चुनें' : 'Choose APK File'}</span>
                  </label>

                  {appInfo.isApkUploaded && (
                    <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
                      ✓ Current Uploaded File: {appInfo.uploadedFileName}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      App Name (ऐप का नाम)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      App Version (वर्जन)
                    </label>
                    <input
                      type="text"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="e.g. v2.4.0 Pro"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      File Size (फाइल साइज)
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Total Downloads
                    </label>
                    <input
                      type="text"
                      value={downloads}
                      onChange={(e) => setDownloads(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Developer Studio
                    </label>
                    <input
                      type="text"
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Custom Download URL / Link (या फाइल वेब लिंक)
                  </label>
                  <input
                    type="text"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://.../JaiPlay.apk"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Announcement Banner Text (न्यूज/नोटिस)
                  </label>
                  <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    placeholder="⚡ Version 2.4.0 Released with 4K fix!"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'सेव करें' : 'Save App Info'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Photo Cards Manager */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                
                {/* Form to Add New Photo Card */}
                <form onSubmit={handleAddPhotoCard} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'hi' ? 'नया डिजाइन फोटो कार्ड जोड़ें' : 'Upload New Design Photo Card'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-slate-400 mb-1">Photo Image URL *</label>
                      <input
                        type="url"
                        required
                        value={newImgUrl}
                        onChange={(e) => setNewImgUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={newTitleEn}
                        onChange={(e) => setNewTitleEn(e.target.value)}
                        placeholder="e.g. 4K Player"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow cursor-pointer"
                    >
                      {lang === 'hi' ? 'कार्ड जोड़ें' : 'Add Card'}
                    </button>
                  </div>
                </form>

                {/* List of Photo Cards */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300">
                    Existing App Screenshots ({screenshots.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                    {screenshots.map((sc) => (
                      <div key={sc.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                        <img
                          src={sc.imageUrl}
                          alt={sc.title.en}
                          className="w-16 h-10 object-cover rounded-lg bg-black"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{sc.title[lang]}</p>
                          <p className="text-[10px] text-slate-400">{sc.badge || sc.category}</p>
                        </div>
                        <button
                          onClick={() => onDeleteScreenshot(sc.id)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: Description & What's New */}
            {activeTab === 'description' && (
              <form onSubmit={handleSaveDescription} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    What's New in Release (One bullet per line) - English
                  </label>
                  <textarea
                    rows={3}
                    value={whatsNewEnText}
                    onChange={(e) => setWhatsNewEnText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    वर्जन में क्या नया है (प्रति पंक्ति एक बिंदु) - हिंदी
                  </label>
                  <textarea
                    rows={3}
                    value={whatsNewHiText}
                    onChange={(e) => setWhatsNewHiText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Description - English
                  </label>
                  <textarea
                    rows={4}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    पूरा विवरण - हिंदी
                  </label>
                  <textarea
                    rows={4}
                    value={descHi}
                    onChange={(e) => setDescHi(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'विवरण सेव करें' : 'Save Description'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: Security PIN */}
            {activeTab === 'security' && (
              <form onSubmit={handlePinChangeSubmit} className="space-y-4 max-w-md">
                <h4 className="text-xs font-bold text-white">
                  {lang === 'hi' ? 'एडमिन पासकोड (PIN) बदलें' : 'Change Admin Security PIN'}
                </h4>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    New PIN (At least 4 digits)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new admin pin"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {pinSuccessMsg && (
                  <p className="text-xs text-emerald-400 font-bold">
                    ✓ PIN updated successfully!
                  </p>
                )}

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
                  >
                    {lang === 'hi' ? 'एडमिन से लॉगआउट करें' : 'Logout Admin'}
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg cursor-pointer"
                  >
                    {lang === 'hi' ? 'पिन बदलें' : 'Update PIN'}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
