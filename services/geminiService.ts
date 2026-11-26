import { ImageFile } from '../types';

export async function generateImage(
  productImage: ImageFile,
  prompt: string,
  styleImage: ImageFile | null
): Promise<ImageFile> {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productImage,
      prompt,
      styleImage,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) throw new Error('انتهت الجلسة. حدّث الصفحة وادخل الباسورد تاني.');
  if (!response.ok) {
    throw new Error(data.error || `فشل التوليد (${response.status})`);
  }

  if (!data.base64) {
    throw new Error('السيرفر مارجّعش صورة.');
  }

  return {
    base64: data.base64,
    mimeType: data.mimeType || 'image/jpeg',
    name: data.name || 'generated-image.jpg',
  };
}

export async function analyzeStyleImage(styleImage: ImageFile): Promise<string> {
  const response = await fetch('/api/analyze-style', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      styleImage,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `فشل تحليل الستايل (${response.status})`);
  }

  if (typeof data.description !== 'string') {
    throw new Error('السيرفر مارجّعش وصف للستايل.');
  }

  return data.description;
}
