import React, { useState } from 'react';
import { Settings, Lock, X, Upload, Save, Image as ImageIcon, FileText, CheckCircle2, Shield, Trash2, KeyRound, AlertCircle, Plus, Loader2 } from 'lucide-react';
import { AppInfo, ScreenshotCard } from '../types';
import { uploadFileToServer } from '../lib/api';

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
  const [iconUrl, setIconUrl] = useState(appInfo.iconUrl || '');

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

  // Uploading state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

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

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadStatus(lang === 'hi' ? 'सर्वर पर लोगो अपलोड हो रहा है...' : 'Uploading Logo to server...');
      const res = await uploadFileToServer(file);
      setIsUploading(false);
      setUploadStatus('');
      if (res.success && res.url) {
        setIconUrl(res.url);
        onUpdateAppInfo({ iconUrl: res.url });
        setSaveSuccessMsg(true);
        setTimeout(() => setSaveSuccessMsg(false), 3000);
      } else {
        alert(res.error || 'Logo upload failed');
      }
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
      iconUrl,
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

  const handleFileUploadSim = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadStatus(lang === 'hi' ? 'APK फाइल सर्वर पर सेव हो रही है...' : 'Saving APK file to server...');
      const res = await uploadFileToServer(file);
      setIsUploading(false);
      setUploadStatus('');

      if (res.success && res.url) {
        const finalSize = res.size || `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        setDownloadUrl(res.url);
        setSize(finalSize);
        onUpdateAppInfo({
          downloadUrl: res.url,
          isApkUploaded: true,
          uploadedFileName: file.name,
          size: finalSize,
        });
        setSaveSuccessMsg(true);
        setTimeout(() => setSaveSuccessMsg(false), 3000);
        alert(lang === 'hi' ? `APK सर्वर पर सेव हो गया: ${file.name}` : `APK saved to server successfully: ${file.name}`);
      } else {
        alert(res.error || 'APK upload failed');
      }
    }
  };

  const handleScreenshotFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadStatus(lang === 'hi' ? 'स्क्रीनशॉट अपलोड हो रहा है...' : 'Uploading screenshot image...');
      const res = await uploadFileToServer(file);
      setIsUploading(false);
      setUploadStatus('');
      if (res.success && res.url) {
        setNewImgUrl(res.url);
      } else {
        alert(res.error || 'Screenshot image upload failed');
      }
    }
  };

  const handleAddPhotoCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgUrl || !newTitleEn) return;

    onAddScreenshot({
      title: { en: newTitleEn, hi: newTitleHi || newTitleEn },
      description: { en: 'Custom app screenshot uploaded by Admin.', hi: 'Custom app screenshot uploaded by Admin.' },
      imageUrl: newImgUrl,
      badge: 'Admin Upload',
      category: 'Player UI',
    });

    setNewImgUrl('');
    setNewTitleEn('');
    setNewTitleHi('');
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
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
              <span>{lang === 'hi' ? 'ZabPlay - Admin Manager' : 'ZabPlay - Admin Manager'}</span>
              {isAdminLoggedIn && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Logged In
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'Upload new APK, manage store info, add photo cards, and update app version.'
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
              {lang === 'hi' ? 'Enter Admin Passcode' : 'Enter Admin Passcode'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'Only you (Admin) can upload or modify ZabPlay details. Default PIN is 1234.'
                : 'Only you (Admin) can upload or modify ZabPlay details. Default PIN is 1234.'}
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
                  {lang === 'hi' ? 'Incorrect PIN! Try default PIN 1234.' : 'Incorrect PIN! Try default PIN 1234.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg transition cursor-pointer"
            >
              {lang === 'hi' ? 'Unlock Admin Panel' : 'Unlock Admin Panel'}
            </button>
          </form>
        ) : (
          /* Step 2: Admin Dashboard when Logged In */
          <div className="space-y-6">
            
            {/* Uploading Progress Banner */}
            {isUploading && (
              <div className="bg-blue-600/20 border border-blue-500/40 p-3 rounded-xl flex items-center gap-3 text-blue-300 text-xs animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                <span className="font-bold">{uploadStatus}</span>
              </div>
            )}
            
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
                <span>{lang === 'hi' ? 'APK & App Settings' : 'APK & App Settings'}</span>
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
                <span>{lang === 'hi' ? 'Photo Cards' : 'Photo Cards'}</span>
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
                <span>{lang === 'hi' ? 'Description & Notes' : 'Description & Notes'}</span>
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
                <span>{lang === 'hi' ? 'Admin Security' : 'Admin Security'}</span>
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'hi' ? 'Settings saved successfully!' : 'Settings saved successfully!'}</span>
              </div>
            )}

            {/* TAB 1: App Settings & APK Upload */}
            {activeTab === 'app' && (
              <form onSubmit={handleSaveAppInfo} className="space-y-4">
                
                {/* Upload App Logo & APK File Dual Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. App Logo / Icon Upload Box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={iconUrl || appInfo.iconUrl}
                          alt="App Logo Preview"
                          className="w-12 h-12 rounded-2xl bg-black border border-slate-700 object-cover shadow-lg"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">App Logo / Icon</h4>
                          <p className="text-[11px] text-slate-400">
                            Upload your official logo image
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                            Choose Logo File from Phone/PC
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoFileUpload}
                            className="block w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
                            OR Logo Image URL
                          </label>
                          <input
                            type="text"
                            value={iconUrl}
                            onChange={(e) => setIconUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. APK File Upload Box */}
                  <div className="bg-slate-950 border border-dashed border-blue-500/40 rounded-2xl p-4 text-center flex flex-col items-center justify-center">
                    <Upload className="w-7 h-7 text-blue-400 mb-1" />
                    <h4 className="text-xs font-bold text-white mb-1">
                      {lang === 'hi' ? 'Upload New APK File' : 'Upload New APK File'}
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      Select a direct .apk file from device:
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
                      <span>Choose APK File</span>
                    </label>

                    {appInfo.isApkUploaded && (
                      <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
                        ✓ File: {appInfo.uploadedFileName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      App Name
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
                      App Version
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
                      File Size
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
                    Custom Download URL / Link
                  </label>
                  <input
                    type="text"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://.../ZabPlay.apk"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Announcement Banner Text
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
                    <span>{lang === 'hi' ? 'Save App Info' : 'Save App Info'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Photo Cards Manager */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                
                {/* Form to Add New Photo Card */}
                <form onSubmit={handleAddPhotoCard} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'hi' ? 'Upload New App Screenshot / Photo Card' : 'Upload New App Screenshot / Photo Card'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Upload Photo from File Device</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotFileUpload}
                        className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">OR Photo Image URL *</label>
                      <input
                        type="text"
                        required
                        value={newImgUrl}
                        onChange={(e) => setNewImgUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Title (English / Label) *</label>
                      <input
                        type="text"
                        required
                        value={newTitleEn}
                        onChange={(e) => setNewTitleEn(e.target.value)}
                        placeholder="e.g. 4K Ultra Player UI"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Title (Hindi / Alt)</label>
                      <input
                        type="text"
                        value={newTitleHi}
                        onChange={(e) => setNewTitleHi(e.target.value)}
                        placeholder="e.g. 4K Ultra Player Screen"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {newImgUrl && (
                    <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 flex items-center gap-3">
                      <img src={newImgUrl} alt="Preview" className="w-12 h-16 object-cover rounded-lg bg-black border border-slate-700" />
                      <div className="text-[11px] text-slate-300">
                        <p className="font-bold text-emerald-400">Image Ready to Add</p>
                        <p className="text-slate-400 truncate max-w-xs">{newImgUrl.slice(0, 40)}...</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'hi' ? 'Save Screenshot to App Store' : 'Save Screenshot to App Store'}</span>
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
                    What's New in Release (One bullet per line)
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
                    Full Description
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
                    <span>{lang === 'hi' ? 'Save Description' : 'Save Description'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: Security PIN */}
            {activeTab === 'security' && (
              <form onSubmit={handlePinChangeSubmit} className="space-y-4 max-w-md">
                <h4 className="text-xs font-bold text-white">
                  {lang === 'hi' ? 'Change Admin Security PIN' : 'Change Admin Security PIN'}
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
                    {lang === 'hi' ? 'Logout Admin' : 'Logout Admin'}
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg cursor-pointer"
                  >
                    {lang === 'hi' ? 'Update PIN' : 'Update PIN'}
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
