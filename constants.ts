
import { LightingStyle, CameraPerspective, StylePreset } from './types';

export const STYLE_PRESETS: { value: StylePreset; label: string }[] = [
  { value: 'Standard', label: 'تصوير احترافي قياسي' },
  { value: 'Cinematic 3D Ad', label: 'إعلان سينمائي (أكشن 3D)' },
  { value: 'Valentine 3D Ad', label: 'إعلان عيد الحب' },
  { value: 'Relaxation 3D Ad', label: 'راحة واسترخاء' },
  { value: 'Winter 3D Ad', label: 'أجواء شتوية دافئة' },
  { value: 'Summer 3D Ad', label: 'أجواء صيفية حيوية' },
  { value: 'Summer Relaxed Ad', label: 'أجواء صيفية هادئة (داخلي)' },
  { value: 'Summer Relaxed Outdoor Ad', label: 'أجواء صيفية هادئة (خارجي)' },
  { value: 'Outdoor Portrait', label: 'بورتريه خارجي واقعي' },
  { value: 'Editorial Portrait', label: 'بورتريه خارجي عصري (Editorial)' },
  { value: 'Instagram Reels Style', label: 'أجواء انستقرام عصرية' },
  { value: 'Instagram Reels Lifestyle', label: 'أجواء انستقرام لايف ستايل' },
  { value: 'Instagram Reels Confidence', label: 'ثقة ورفاهية (Reels Vibe)' },
  { value: 'Outdoor Photoshoot Style', label: 'جلسة تصوير خارجية احترافية' },
  { value: 'Natural Outdoor Lifestyle', label: 'بورتريه خارجي طبيعي (Lifestyle)' },
  { value: 'Natural Close-up Portrait', label: 'بورتريه قريب وطبيعي (Close-up)' },
  { value: 'Instagram Reels Luxury', label: 'رفاهية انستقرام (Luxury Reels)' },
  { value: 'Instagram Reels Soft Luxury', label: 'رفاهية أنثوية ناعمة (Soft Luxury Reels)' },
  { value: 'Instagram Reels Soft Feminine', label: 'أجواء ريلز أنثوية هادئة (Soft Feminine)' },
  { value: 'Instagram Reels Birthday', label: 'احتفال عيد ميلاد (Birthday Reels)' },
  { value: 'Instagram Reels Birthday Celebration', label: 'احتفال عيد ميلاد مبهج (Joyful Celebration)' },
  { value: 'Instagram Reels Birthday Walk', label: 'احتفال عيد ميلاد - حركة (Birthday Walk)' },
  { value: 'Instagram Reels Café Birthday', label: 'احتفال عيد ميلاد في كافيه (Café Birthday Reels)' },
  { value: 'Instagram Reels Birthday Close-up', label: 'بورتريه كيك عيد الميلاد (Birthday Cake Close-up)' },
];

export const LIGHTING_STYLES: { value: LightingStyle; label: string }[] = [
  { value: 'Natural Light', label: 'Natural Light' },
  { value: 'Studio Light', label: 'Studio Light' },
  { value: 'Golden Hour', label: 'Golden Hour' },
  { value: 'Blue Hour', label: 'Blue Hour' },
  { value: 'Cinematic', label: 'Cinematic' },
  { value: 'Dramatic', label: 'Dramatic' },
];

export const CAMERA_PERSPECTIVES: { value: CameraPerspective; label: string }[] = [
  { value: 'Front View', label: 'Front View' },
  { value: 'Top View', label: 'Top View' },
  { value: 'Side View', label: 'Side View' },
  { value: '45° Angle', label: '45° Angle' },
  { value: 'Close-up', label: 'Close-up' },
  { value: 'Macro Shot', label: 'Macro Shot' },
];
