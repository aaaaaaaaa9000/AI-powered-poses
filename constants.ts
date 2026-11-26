
import { LightingStyle, CameraPerspective, StylePreset } from './types';

export const STYLE_PRESETS: { value: StylePreset; label: string }[] = [
  { value: 'Standard', label: 'تصوير احترافي قياسي' },
  { value: 'Cinematic 3D Ad', label: 'إعلان سينمائي ثلاثي الأبعاد' },
  { value: 'Valentine 3D Ad', label: 'إعلان عيد الحب' },
  { value: 'Relaxation 3D Ad', label: 'راحة واسترخاء' },
  { value: 'Winter 3D Ad', label: 'أجواء شتوية دافئة' },
  { value: 'Summer 3D Ad', label: 'أجواء صيفية حيوية' },
  { value: 'Summer Relaxed Ad', label: 'أجواء صيفية هادئة (داخلي)' },
  { value: 'Summer Relaxed Outdoor Ad', label: 'أجواء صيفية هادئة (خارجي)' },
  { value: 'Outdoor Portrait', label: 'بورتريه خارجي واقعي' },
  { value: 'Editorial Portrait', label: 'بورتريه خارجي عصري' },
  { value: 'Instagram Reels Style', label: 'أجواء انستقرام عصرية' },
  { value: 'Instagram Reels Lifestyle', label: 'أجواء انستقرام لايف ستايل' },
  { value: 'Instagram Reels Confidence', label: 'ثقة ورفاهية' },
  { value: 'Outdoor Photoshoot Style', label: 'جلسة تصوير خارجية احترافية' },
  { value: 'Natural Outdoor Lifestyle', label: 'بورتريه خارجي طبيعي' },
  { value: 'Natural Close-up Portrait', label: 'بورتريه قريب وطبيعي' },
  { value: 'Instagram Reels Luxury', label: 'رفاهية انستقرام' },
  { value: 'Instagram Reels Soft Luxury', label: 'رفاهية أنثوية ناعمة' },
  { value: 'Instagram Reels Soft Feminine', label: 'أجواء ريلز أنثوية هادئة' },
  { value: 'Instagram Reels Birthday', label: 'احتفال عيد ميلاد' },
  { value: 'Instagram Reels Birthday Celebration', label: 'احتفال عيد ميلاد مبهج' },
  { value: 'Instagram Reels Birthday Walk', label: 'عيد ميلاد مع حركة ومشي' },
  { value: 'Instagram Reels Café Birthday', label: 'عيد ميلاد في كافيه' },
  { value: 'Instagram Reels Birthday Close-up', label: 'بورتريه قريب مع تورتة عيد الميلاد' },
];

export const LIGHTING_STYLES: { value: LightingStyle; label: string }[] = [
  { value: 'Natural Light', label: 'إضاءة طبيعية' },
  { value: 'Studio Light', label: 'إضاءة استوديو' },
  { value: 'Golden Hour', label: 'الساعة الذهبية (قبل الغروب)' },
  { value: 'Blue Hour', label: 'الساعة الزرقاء (بعد الغروب)' },
  { value: 'Cinematic', label: 'سينمائية' },
  { value: 'Dramatic', label: 'درامية' },
];

export const CAMERA_PERSPECTIVES: { value: CameraPerspective; label: string }[] = [
  { value: 'Front View', label: 'من الأمام' },
  { value: 'Top View', label: 'من فوق' },
  { value: 'Side View', label: 'من الجنب' },
  { value: '45° Angle', label: 'زاوية مايلة' },
  { value: 'Close-up', label: 'لقطة قريبة' },
  { value: 'Macro Shot', label: 'لقطة قريبة جدًا' },
];
