import React from 'react';
import { QrCode, X, Smartphone, ShieldCheck } from 'lucide-react';
import { AppInfo } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appInfo: AppInfo;
  lang: 'en' | 'hi';
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  appInfo,
  lang,
}) => {
  if (!isOpen) return null;

  // We can construct a clean QR code image URL using quickchart QR API or SVG
  const appUrl = window.location.href;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}&color=000000&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-extrabold text-white mb-1">
          {lang === 'hi' ? 'फोन से स्कैन करके डाउनलोड करें' : 'Scan QR Code to Download'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          {lang === 'hi'
            ? 'अपने मोबाइल कैमरे से यह QR कोड स्कैन करें और सीधे ऐप डाउनलोड करें।'
            : 'Point your phone camera at the QR code below to download Jai Play directly on mobile.'}
        </p>

        {/* QR Image Box */}
        <div className="bg-white p-4 rounded-2xl inline-block shadow-xl border-4 border-slate-800 mb-6">
          <img
            src={qrImageUrl}
            alt="Jai Play Download QR Code"
            className="w-48 h-48 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>{appInfo.name} ({appInfo.version})</span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer"
        >
          {lang === 'hi' ? 'बंद करें' : 'Close'}
        </button>

      </div>
    </div>
  );
};
