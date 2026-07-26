import { AppState } from '../types';

import appIconImg from '../assets/images/jai_play_app_icon_1785060325640.jpg';
import videoScreenImg from '../assets/images/video_player_screen_1785060342210.jpg';
import equalizerScreenImg from '../assets/images/equalizer_screen_1785060355903.jpg';

export const initialData: AppState = {
  adminPin: '1234',
  appInfo: {
    name: 'ZabPlay',
    subtitle: 'All-in-One HD & 4K Video Player with Subtitle & Equalizer',
    version: 'v2.4.0 Pro',
    size: '28.4 MB',
    downloads: '500,000+',
    rating: 4.9,
    totalRatings: 18450,
    developer: 'ZabPlay Tech Studio',
    packageName: 'com.zab.play.videoplayer',
    minAndroid: 'Android 6.0 (Marshmallow) and higher',
    updatedDate: 'July 25, 2026',
    downloadUrl: '#',
    isApkUploaded: false,
    iconUrl: appIconImg,
    announcement: '🔥 Version 2.4.0 is out! 200% Volume Boost, HW+ Decoder, & Private Vault now live!',
    description: {
      en: `ZabPlay is the ultimate All-in-One HD & 4K Video Player app designed for maximum performance and cinematic experience. Whether you are watching 4K Ultra HD movies, MKV videos, listening to music, or saving WhatsApp status videos, ZabPlay delivers butter-smooth playback with advanced HW+ hardware acceleration.

Key Highlights of ZabPlay:
• All-Format Playback: Supports MKV, MP4, M4V, AVI, MOV, 3GP, FLV, WMV, RMVB, TS, and more.
• Ultra HD 4K Support: Enjoy ultra clear 60fps high bit-rate movies with zero lag.
• Smart Gesture Controls: Smooth swipe gestures for volume, brightness, and quick seeking.
• Private Vault Folder: Secure your personal videos behind encrypted PIN or Fingerprint lock.
• Powerful Equalizer: 10-band equalizer with 3D Bass Boost, Vocal Enhancer, and Surround Sound.
• Floating Pop-up Player (PIP): Watch your favorite videos while chatting on WhatsApp or browsing.
• Subtitle Downloader & Sync: Auto-search online subtitles in Hindi, English, and regional languages.`,
      hi: `ZabPlay is an All-in-One HD & 4K Video Player app designed to give you the best cinematic experience and high performance on your phone. Whether you are watching 4K Ultra HD movies, playing MKV videos, listening to music, or saving WhatsApp status videos, ZabPlay delivers butter-smooth playback with advanced HW+ hardware acceleration without any lag.

Key Highlights of ZabPlay:
• All Video Format Support: Play MKV, MP4, AVI, MOV, FLV, WMV, 3GP and more easily.
• Ultra HD 4K Playback: Enjoy lag-free 60fps 4K movies.
• Smart Gesture Controls: Easy finger gestures for volume, brightness, and video seek.
• Private Folder Vault: Hide and secure your private videos with PIN or Fingerprint lock.
• Powerful Equalizer: 10-band equalizer, 3D Bass Boost, and Volume Booster up to 200%.
• Floating Pop-up Player (PIP Mode): Watch videos while using WhatsApp or browsing.
• Online Subtitle Downloader: Auto-sync subtitles in Hindi, English, and other languages.`
    },
    whatsNew: {
      en: [
        '🚀 Added HW+ Advanced Hardware Decoder for zero-lag 4K playback.',
        '🔊 200% Volume Amplifier with 3D Surround Sound Mode.',
        '🔒 Upgraded Private Folder Vault with biometrics & hidden stealth mode.',
        '💬 Smart Subtitle Downloader with instant Hindi & English subtitle sync.',
        '⚡ Reduced app size by 15% and optimized battery consumption.'
      ],
      hi: [
        '🚀 Added HW+ Hardware Decoder for smooth 4K video playback without lag.',
        '🔊 200% Volume Amplifier and 3D Surround Sound Mode.',
        '🔒 Upgraded Private Folder Vault with biometrics and stealth mode.',
        '💬 Smart Subtitle feature for instant subtitle downloads in Hindi and English.',
        '⚡ App size reduced by 15% with optimized battery consumption.'
      ]
    }
  },
  screenshots: [
    {
      id: 'sc-1',
      title: {
        en: '4K Ultra HD Movie Playback',
        hi: '4K Ultra HD Video Playback'
      },
      description: {
        en: 'Butter-smooth 60fps playback with HW+ Hardware Acceleration and gesture control overlays.',
        hi: 'Butter-smooth 4K video playback with HW+ Hardware Acceleration and gesture controls.'
      },
      imageUrl: videoScreenImg,
      badge: '4K Ultra HD',
      category: 'Player UI'
    },
    {
      id: 'sc-2',
      title: {
        en: '10-Band Equalizer & Bass Boost',
        hi: '10-Band Equalizer & Bass Boost'
      },
      description: {
        en: 'Amplify sound up to 200% with custom presets, 3D surround sound, and bass booster.',
        hi: 'Increase volume up to 200% with custom presets, 3D surround sound, and bass booster.'
      },
      imageUrl: equalizerScreenImg,
      badge: 'Sound Boost',
      category: 'Audio Engine'
    },
    {
      id: 'sc-3',
      title: {
        en: 'Floating Pop-up Player (PIP Mode)',
        hi: 'Floating Pop-up Video Player'
      },
      description: {
        en: 'Multitask effortlessly! Resize video window while messaging or browsing apps.',
        hi: 'Multitask easily! Watch videos in a small pop-up window while using WhatsApp or browser.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      badge: 'PIP Mode',
      category: 'Multitasking'
    },
    {
      id: 'sc-4',
      title: {
        en: 'Private Folder & Vault Lock',
        hi: 'Private Folder Vault Lock'
      },
      description: {
        en: 'Keep your secret videos protected with PIN, Pattern, or Fingerprint authentication.',
        hi: 'Protect your secret and personal videos safely with PIN, Pattern, or Fingerprint lock.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
      badge: 'Privacy Vault',
      category: 'Security'
    },
    {
      id: 'sc-5',
      title: {
        en: 'Online Subtitles & Multi-Audio',
        hi: 'Subtitle Downloader & Dual Audio'
      },
      description: {
        en: 'Auto-search subtitles in Hindi, English & regional languages with audio track switcher.',
        hi: 'Download subtitles instantly in Hindi or English and switch dual audio tracks easily.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
      badge: 'Subtitles',
      category: 'Media Tools'
    },
    {
      id: 'sc-6',
      title: {
        en: 'WhatsApp Status & Video Downloader',
        hi: 'WhatsApp Status & Video Downloader'
      },
      description: {
        en: 'Save WhatsApp statuses and short videos directly to your phone gallery with 1-click.',
        hi: 'Save WhatsApp status and short videos directly to your phone gallery in 1 click.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
      badge: 'Status Saver',
      category: 'Utility'
    },
    {
      id: 'sc-7',
      title: {
        en: 'Smart Gesture & Brightness Control',
        hi: 'Smart Gesture & Brightness Control'
      },
      description: {
        en: 'Swipe left/right to seek and swipe up/down for instant volume and brightness adjustments.',
        hi: 'Swipe gestures for fast video seek, volume boost and screen brightness.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
      badge: 'Smart Gestures',
      category: 'Player UI'
    }
  ],
  features: [
    {
      id: 'f-1',
      iconName: 'Film',
      title: {
        en: 'All-Format Video Support',
        hi: 'All Formats Supported'
      },
      description: {
        en: 'Plays MKV, MP4, M4V, AVI, MOV, 3GP, FLV, WMV, RMVB, TS, and 4K Ultra HD smoothly.',
        hi: 'Play MKV, MP4, AVI, MOV, FLV, WMV, 3GP and 4K videos without any interruptions.'
      },
      tag: 'Universal'
    },
    {
      id: 'f-2',
      iconName: 'Cpu',
      title: {
        en: 'HW+ Hardware Acceleration',
        hi: 'HW+ Hardware Decoder'
      },
      description: {
        en: 'Next-gen HW+ decoder leverages GPU for stutter-free 60fps high bitrate movie streaming.',
        hi: 'Uses GPU acceleration for smooth 60fps 4K video playback without lag.'
      },
      tag: 'Fast'
    },
    {
      id: 'f-3',
      iconName: 'Volume2',
      title: {
        en: '200% Volume Boost & Equalizer',
        hi: '200% Volume Booster & 10-Band EQ'
      },
      description: {
        en: 'Boost phone audio up to 200% with built-in 10-band equalizer, bass boost & 3D sound.',
        hi: 'Double your audio volume with built-in 10-band equalizer, bass boost and 3D sound.'
      },
      tag: 'Sound'
    },
    {
      id: 'f-4',
      iconName: 'Lock',
      title: {
        en: 'Private Video Vault',
        hi: 'Private Video Folder'
      },
      description: {
        en: 'Hide and lock sensitive videos behind encrypted PIN password or Fingerprint.',
        hi: 'Password protect your personal videos with PIN code or Fingerprint lock.'
      },
      tag: 'Secure'
    },
    {
      id: 'f-5',
      iconName: 'PictureInPicture',
      title: {
        en: 'PIP Floating Pop-up Player',
        hi: 'Floating Video Player (PIP)'
      },
      description: {
        en: 'Resize and drag video window anywhere while using WhatsApp, Facebook, or Games.',
        hi: 'Play video in a small pop-up window while using other apps on your screen.'
      },
      tag: 'Multitask'
    },
    {
      id: 'f-6',
      iconName: 'Subtitles',
      title: {
        en: 'Auto Subtitle Downloader',
        hi: 'Online Subtitle Downloader'
      },
      description: {
        en: 'Download subtitles in Hindi, English, Tamil, Telugu with millisecond sync controls.',
        hi: 'Download subtitles in Hindi and English with precise timing synchronization.'
      },
      tag: 'Smart'
    },
    {
      id: 'f-7',
      iconName: 'Sliders',
      title: {
        en: 'Intuitive Gesture Controls',
        hi: 'Smart Gesture Controls'
      },
      description: {
        en: 'Swipe left/right for volume/brightness, double-tap to skip, pinch to zoom video.',
        hi: 'Swipe fingers for volume and brightness, double tap to skip forward or backward.'
      },
      tag: 'Easy'
    },
    {
      id: 'f-8',
      iconName: 'Download',
      title: {
        en: 'WhatsApp Status Saver',
        hi: 'WhatsApp Status Saver'
      },
      description: {
        en: 'One-click tool to save video statuses directly into your phone memory.',
        hi: 'Save WhatsApp video statuses into gallery with 1-click convenience.'
      },
      tag: 'Utility'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      userName: 'Rahul Sharma',
      rating: 5,
      date: 'July 24, 2026',
      title: 'Best Video Player for Android!',
      comment: 'ZabPlay is an amazing app! 4K MKV videos play smoothly without stuttering and volume booster doubles sound quality. Highly recommended!',
      verifiedDownload: true,
      helpfulCount: 342
    },
    {
      id: 'rev-2',
      userName: 'Aman Verma',
      rating: 5,
      date: 'July 22, 2026',
      title: 'Awesome Private Folder & Subtitle feature',
      comment: 'Super fast download! Subtitle auto-fetch in Hindi works perfectly for South dubbed movies. Private vault gives complete peace of mind.',
      verifiedDownload: true,
      helpfulCount: 198
    },
    {
      id: 'rev-3',
      userName: 'Priya Singh',
      rating: 5,
      date: 'July 20, 2026',
      title: 'Floating Player & Smooth UI',
      comment: 'Floating Pop-up Mode while chatting on WhatsApp is super convenient. Clean UI and no annoying popups!',
      verifiedDownload: true,
      helpfulCount: 124
    },
    {
      id: 'rev-4',
      userName: 'Vikram Patel',
      rating: 4,
      date: 'July 18, 2026',
      title: 'Very Smooth 4K Playback',
      comment: 'Tested on my mid-range phone, 4K videos play without lag. Equalizer bass boost is insane!',
      verifiedDownload: true,
      helpfulCount: 89
    }
  ]
};
