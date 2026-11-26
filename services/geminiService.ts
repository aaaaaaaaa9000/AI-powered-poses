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

  if (!response.ok) {
    throw new Error(data.error || `Image generation failed (${response.status})`);
  }

  if (!data.base64) {
    throw new Error('No image was returned from the server.');
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
    throw new Error(data.error || `Style analysis failed (${response.status})`);
  }

  if (typeof data.description !== 'string') {
    throw new Error('No style description returned from the server.');
  }

  return data.description;
}

export async function upscaleImage(image: ImageFile): Promise<ImageFile> {
  return new Promise((resolve, reject) => {
    // Canvas-based client upscale
    setTimeout(() => {
      const img = new Image();
      img.src = `data:${image.mimeType};base64,${image.base64}`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context for upscaling.'));
        }

        // Upscale by 2x
        const upscaleFactor = 2;
        canvas.width = img.width * upscaleFactor;
        canvas.height = img.height * upscaleFactor;

        // Draw the image scaled up
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get the new base64 string (JPEG format)
        const base64 = canvas.toDataURL('image/jpeg', 0.92).split(',')[1];

        resolve({
          base64,
          mimeType: 'image/jpeg',
          name: `upscaled-${image.name.replace(/\.[^/.]+$/, '')}.jpg`,
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image for upscaling.'));
      };
    }, 1500);
  });
}
