import { AppState } from '../types';

import appIconImg from '../assets/images/jai_play_app_icon_1785060325640.jpg';
import videoScreenImg from '../assets/images/video_player_screen_1785060342210.jpg';
import equalizerScreenImg from '../assets/images/equalizer_screen_1785060355903.jpg';

export const initialData: AppState = {
  adminPin: '1234',
  appInfo: {
    name: 'Jai Play (जै प्ले)',
    subtitle: 'All-in-One HD & 4K Video Player with Subtitle & Equalizer',
    version: 'v2.4.0 Pro',
    size: '28.4 MB',
    downloads: '500,000+',
    rating: 4.9,
    totalRatings: 18450,
    developer: 'Jai Play Tech Studio',
    packageName: 'com.jai.play.videoplayer',
    minAndroid: 'Android 6.0 (Marshmallow) and higher',
    updatedDate: 'July 25, 2026',
    downloadUrl: '#',
    isApkUploaded: false,
    iconUrl: appIconImg,
    announcement: '🔥 Version 2.4.0 is out! 200% Volume Boost, HW+ Decoder, & Private Vault now live!',
    description: {
      en: `Jai Play is the ultimate All-in-One HD & 4K Video Player app designed for maximum performance and cinematic experience. Whether you are watching 4K Ultra HD movies, MKV videos, listening to music, or saving WhatsApp status videos, Jai Play delivers butter-smooth playback with advanced HW+ hardware acceleration.

Key Highlights of Jai Play:
• All-Format Playback: Supports MKV, MP4, M4V, AVI, MOV, 3GP, FLV, WMV, RMVB, TS, and more.
• Ultra HD 4K Support: Enjoy ultra clear 60fps high bit-rate movies with zero lag.
• Smart Gesture Controls: Smooth swipe gestures for volume, brightness, and quick seeking.
• Private Vault Folder: Secure your personal videos behind encrypted PIN or Fingerprint lock.
• Powerful Equalizer: 10-band equalizer with 3D Bass Boost, Vocal Enhancer, and Surround Sound.
• Floating Pop-up Player (PIP): Watch your favorite videos while chatting on WhatsApp or browsing.
• Subtitle Downloader & Sync: Auto-search online subtitles in Hindi, English, and regional languages.`,
      hi: `जै प्ले (Jai Play) एक ऑल-इन-वन एचडी और 4के वीडियो प्लेयर ऐप है जिसे आपके फ़ोन पर बेहतरीन सिनेमाई अनुभव और हाई परफॉर्मेंस देने के लिए बनाया गया है। चाहे आप 4K अल्ट्रा एचडी फिल्में देख रहे हों, एमकेवी (MKV) वीडियो चला रहे हों, संगीत सुन रहे हों या व्हाट्सएप स्टेटस डाउनलोड कर रहे हों, जै प्ले आपको एडवांस HW+ हार्डवेयर एक्सीलरेशन के साथ बिना किसी लैग के स्मूथ प्लेबैक देता है।

जै प्ले की मुख्य विशेषताएं:
• सभी वीडियो फॉरमेट सपोर्ट: MKV, MP4, AVI, MOV, FLV, WMV, 3GP और बहुत कुछ आसानी से चलाएं।
• अल्ट्रा HD 4K प्लेबैक: लैग-फ्री 60fps 4K मूवीज का मजा लें।
• स्मार्ट गेस्चर कंट्रोल: वॉल्यूम, ब्राइटनेस और वीडियो सीक के लिए आसान उंगलियों के इशारे।
• प्राइवेट फोल्डर वॉल्ट: अपने पर्सनल प्राइवेट वीडियो को पिन या फिंगरप्रिंट से सुरक्षित छुपाएं।
• पावरफुल इक्वलाइज़र: 10-बैंड इक्वलाइज़र, 3D बेस बूस्ट और 200% तक वॉल्यूम बूस्टर।
• फ्लोटिंग पॉप-अप प्लेयर (PIP Mode): व्हाट्सएप चलाते हुए या ब्राउज़ करते हुए वीडियो देखें।
• ऑनलाइन सबटाइटल डाउनलोडर: हिंदी, अंग्रेजी और अन्य भाषाओं में सबटाइटल ऑटो-सिंक करें।`
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
        '🚀 बिना किसी लैग के 4K वीडियो चलाने के लिए HW+ हार्डवेयर डिकोडर जोड़ा गया।',
        '🔊 200% वॉल्यूम एम्पलीफायर और 3D सराउंड साउंड मोड।',
        '🔒 बायोमेट्रिक और हिडन मोड के साथ प्राइवेट फोल्डर वॉल्ट अपग्रेड किया गया।',
        '💬 हिंदी और अंग्रेजी सबटाइटल तुरंत डाउनलोड करने के लिए स्मार्ट सबटाइटल फीचर।',
        '⚡ ऐप का साइज 15% छोटा किया गया और बैटरी खपत कम की गई।'
      ]
    }
  },
  screenshots: [
    {
      id: 'sc-1',
      title: {
        en: '4K Ultra HD Movie Playback',
        hi: '4K अल्ट्रा HD वीडियो प्लेबैक'
      },
      description: {
        en: 'Butter-smooth 60fps playback with HW+ Hardware Acceleration and gesture control overlays.',
        hi: 'HW+ हार्डवेयर एक्सीलरेशन और स्मार्ट गेस्चर कंट्रोल के साथ मक्खन जैसी स्मूथ 4K वीडियो।'
      },
      imageUrl: videoScreenImg,
      badge: '4K Ultra HD',
      category: 'Player UI'
    },
    {
      id: 'sc-2',
      title: {
        en: '10-Band Equalizer & Bass Boost',
        hi: '10-बैंड इक्वलाइज़र और बेस बूस्ट'
      },
      description: {
        en: 'Amplify sound up to 200% with custom presets, 3D surround sound, and bass booster.',
        hi: 'कस्टम प्रीसेट, 3D सराउंड साउंड और बेस बूस्टर के साथ आवाज़ 200% तक बढ़ाएं।'
      },
      imageUrl: equalizerScreenImg,
      badge: 'Sound Boost',
      category: 'Audio Engine'
    },
    {
      id: 'sc-3',
      title: {
        en: 'Floating Pop-up Player (PIP Mode)',
        hi: 'फ्लोटिंग पॉप-अप वीडियो प्लेयर'
      },
      description: {
        en: 'Multitask effortlessly! Resize video window while messaging or browsing apps.',
        hi: 'मल्टीटास्किंग करें! व्हाट्सएप या ब्राउज़र का इस्तेमाल करते हुए छोटे पॉप-अप विंडो में वीडियो देखें।'
      },
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
      badge: 'PIP Mode',
      category: 'Multitasking'
    },
    {
      id: 'sc-4',
      title: {
        en: 'Private Folder & Vault Lock',
        hi: 'प्राइवेट फोल्डर वॉल्ट लॉक'
      },
      description: {
        en: 'Keep your secret videos protected with PIN, Pattern, or Fingerprint authentication.',
        hi: 'अपने सीक्रेट और पर्सनल वीडियो को पिन, पैटर्न या फिंगरप्रिंट लॉक से सुरक्षित रखें।'
      },
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
      badge: 'Privacy Vault',
      category: 'Security'
    },
    {
      id: 'sc-5',
      title: {
        en: 'Online Subtitles & Multi-Audio',
        hi: 'सबटाइटल डाउनलोडर और ड्यूल ऑडियो'
      },
      description: {
        en: 'Auto-search subtitles in Hindi, English & regional languages with audio track switcher.',
        hi: 'हिंदी, इंग्लिश में तुरंत सबटाइटल डाउनलोड करें और ड्यूल ऑडियो ट्रैक चेंज करें।'
      },
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
      badge: 'Subtitles',
      category: 'Media Tools'
    },
    {
      id: 'sc-6',
      title: {
        en: 'WhatsApp Status & Video Downloader',
        hi: 'व्हाट्सएप स्टेटस और वीडियो डाउनलोडर'
      },
      description: {
        en: 'Save WhatsApp statuses and short videos directly to your phone gallery with 1-click.',
        hi: 'व्हाट्सएप स्टेटस और शॉर्ट वीडियो को 1-क्लिक में सीधे अपनी फोन गैलरी में सेव करें।'
      },
      imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
      badge: 'Status Saver',
      category: 'Utility'
    }
  ],
  features: [
    {
      id: 'f-1',
      iconName: 'Film',
      title: {
        en: 'All-Format Video Support',
        hi: 'सभी फॉरमेट सपोर्ट (All Formats)'
      },
      description: {
        en: 'Plays MKV, MP4, M4V, AVI, MOV, 3GP, FLV, WMV, RMVB, TS, and 4K Ultra HD smoothly.',
        hi: 'MKV, MP4, AVI, MOV, FLV, WMV, 3GP और 4K वीडियो बिना किसी रुकावट के चलाएं।'
      },
      tag: 'Universal'
    },
    {
      id: 'f-2',
      iconName: 'Cpu',
      title: {
        en: 'HW+ Hardware Acceleration',
        hi: 'HW+ हार्डवेयर डिकोडर'
      },
      description: {
        en: 'Next-gen HW+ decoder leverages GPU for stutter-free 60fps high bitrate movie streaming.',
        hi: 'जीपीयू का इस्तेमाल करके बिना किसी लैग के 60fps पर 4K मूवीज चलाता है।'
      },
      tag: 'Fast'
    },
    {
      id: 'f-3',
      iconName: 'Volume2',
      title: {
        en: '200% Volume Boost & Equalizer',
        hi: '200% वॉल्यूम बूस्टर और 10-बैंड EQ'
      },
      description: {
        en: 'Boost phone audio up to 200% with built-in 10-band equalizer, bass boost & 3D sound.',
        hi: 'बिल्ट-इन 10-बैंड इक्वलाइज़र, बेस बूस्ट और 3D साउंड के साथ आवाज़ दोगुनी बढ़ाएं।'
      },
      tag: 'Sound'
    },
    {
      id: 'f-4',
      iconName: 'Lock',
      title: {
        en: 'Private Video Vault',
        hi: 'प्राइवेट वीडियो फोल्डर'
      },
      description: {
        en: 'Hide and lock sensitive videos behind encrypted PIN password or Fingerprint.',
        hi: 'अपने पर्सनल वीडियो को पिन कोड या फिंगरप्रिंट से पासवर्ड प्रोटेक्ट करें।'
      },
      tag: 'Secure'
    },
    {
      id: 'f-5',
      iconName: 'PictureInPicture',
      title: {
        en: 'PIP Floating Pop-up Player',
        hi: 'फ्लोटिंग वीडियो प्लेयर (PIP)'
      },
      description: {
        en: 'Resize and drag video window anywhere while using WhatsApp, Facebook, or Games.',
        hi: 'अन्य ऐप्स का इस्तेमाल करते समय वीडियो विंडो को छोटा करके स्क्रीन पर चलाएं।'
      },
      tag: 'Multitask'
    },
    {
      id: 'f-6',
      iconName: 'Subtitles',
      title: {
        en: 'Auto Subtitle Downloader',
        hi: 'ऑनलाइन सबटाइटल डाउनलोडर'
      },
      description: {
        en: 'Download subtitles in Hindi, English, Tamil, Telugu with millisecond sync controls.',
        hi: 'हिंदी और अन्य भाषाओं में सबटाइटल डाउनलोड करें और टाइमिंग सिंक करें।'
      },
      tag: 'Smart'
    },
    {
      id: 'f-7',
      iconName: 'Sliders',
      title: {
        en: 'Intuitive Gesture Controls',
        hi: 'स्मार्ट गेस्चर कंट्रोल'
      },
      description: {
        en: 'Swipe left/right for volume/brightness, double-tap to skip, pinch to zoom video.',
        hi: 'उंगलियां स्वाइप करके वॉल्यूम और ब्राइटनेस बदलें, डबल टैप करके वीडियो आगे बढ़ाएं।'
      },
      tag: 'Easy'
    },
    {
      id: 'f-8',
      iconName: 'Download',
      title: {
        en: 'WhatsApp Status Saver',
        hi: 'व्हाट्सएप स्टेटस सेवर'
      },
      description: {
        en: 'One-click tool to save video statuses directly into your phone memory.',
        hi: '1-क्लिक में व्हाट्सएप वीडियो स्टेटस गैलरी में सेव करने की सुविधा।'
      },
      tag: 'Utility'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      userName: 'Rahul Sharma (राहुल शर्मा)',
      rating: 5,
      date: 'July 24, 2026',
      title: 'Best Video Player for Android!',
      comment: 'जै प्ले वाकई बहुत ही जबरदस्त ऐप है! इसमें 4K MKV वीडियो बिना रुके चलती है और वॉल्यूम बूस्टर से साउंड क्वालिटी दुगनी हो जाती है। Highly recommended!',
      verifiedDownload: true,
      helpfulCount: 342
    },
    {
      id: 'rev-2',
      userName: 'Aman Verma',
      rating: 5,
      date: 'July 22, 2026',
      title: 'Awesome Private Folder & Subtitle feature',
      comment: 'Super fast download! Subtitle auto-fetch in Hindi works perfectly for South dubbed movies. Private vault gives peace of mind.',
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
