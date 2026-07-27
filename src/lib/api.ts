import { AppState } from '../types';

export async function fetchAppData(): Promise<AppState | null> {
  try {
    const res = await fetch('/api/app-data');
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
  } catch (err) {
    console.error('Failed to fetch app data from server:', err);
  }
  return null;
}

export async function saveAppData(data: AppState): Promise<boolean> {
  try {
    const res = await fetch('/api/app-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) return false;
    const json = await res.json();
    return json.success === true;
  } catch (err) {
    console.error('Failed to save app data to server:', err);
    return false;
  }
}

export interface UploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  size?: string;
  error?: string;
}

export async function uploadFileToServer(file: File): Promise<UploadResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const fileData = e.target?.result as string;
        if (!fileData) {
          return resolve({ success: false, error: 'Failed to read file' });
        }

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileData,
            mimeType: file.type,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          return resolve({ success: false, error: errText || 'Server error' });
        }

        const json = await res.json();
        if (json.success) {
          resolve({
            success: true,
            url: json.url,
            fileName: json.fileName || file.name,
            size: json.size || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          });
        } else {
          resolve({ success: false, error: json.error || 'Upload failed' });
        }
      } catch (err: any) {
        console.error('File upload network error:', err);
        resolve({ success: false, error: err.message || 'Upload error' });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, error: 'File reading failed' });
    };

    reader.readAsDataURL(file);
  });
}
