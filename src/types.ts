export interface AppInfo {
  name: string;
  subtitle: string;
  version: string;
  size: string;
  downloads: string;
  rating: number;
  totalRatings: number;
  developer: string;
  packageName: string;
  minAndroid: string;
  updatedDate: string;
  downloadUrl: string;
  isApkUploaded: boolean;
  uploadedFileName?: string;
  iconUrl: string;
  announcement?: string;
  description: {
    en: string;
    hi: string;
  };
  whatsNew: {
    en: string[];
    hi: string[];
  };
}

export interface ScreenshotCard {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  imageUrl: string;
  badge?: string;
  category?: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  tag?: string;
}

export interface UserReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedDownload: boolean;
  helpfulCount: number;
}

export interface AppState {
  appInfo: AppInfo;
  screenshots: ScreenshotCard[];
  features: FeatureItem[];
  reviews: UserReview[];
  adminPin: string;
}
