import QRCode from 'qrcode';
import { QRCodeSettings } from '../types';

export const generateQRCode = async (
  text: string,
  settings: QRCodeSettings,
  canvas: HTMLCanvasElement
): Promise<string> => {
  try {
    // QR Code options based on settings
    const options = {
      width: 300,
      margin: 2,
      color: {
        dark: settings.colors.foreground,
        light: settings.colors.background,
      },
      errorCorrectionLevel: 'M' as const,
    };

    // Generate base QR code
    await QRCode.toCanvas(canvas, text, options);
    
    // Get canvas context for customization
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Apply shape modifications
    if (settings.shape !== 'square') {
      applyShapeModifications(ctx, canvas, settings.shape);
    }

    // Add logo if provided
    if (settings.logo) {
      await addLogoToQR(ctx, canvas, settings.logo);
    }

    // Add decorative elements
    if (settings.decoratePicture) {
      await addDecorativeElements(ctx, canvas, settings.decoratePicture);
    }

    // Add stickers
    if (settings.stickers.length > 0) {
      addStickers(ctx, canvas, settings.stickers);
    }

    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

const applyShapeModifications = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  shape: string
) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Apply shape-specific modifications
  switch (shape) {
    case 'rounded':
      applyRoundedCorners(ctx, canvas, 8);
      break;
    case 'extra-rounded':
      applyRoundedCorners(ctx, canvas, 15);
      break;
    case 'dots':
      convertToDots(ctx, canvas);
      break;
  }
};

const applyRoundedCorners = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  radius: number
) => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return;

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Copy original image
  tempCtx.drawImage(canvas, 0, 0);

  // Clear original canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create rounded rectangle path
  ctx.beginPath();
  ctx.roundRect(0, 0, canvas.width, canvas.height, radius);
  ctx.clip();

  // Draw the image with rounded corners
  ctx.drawImage(tempCanvas, 0, 0);
};

const convertToDots = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const dotSize = 3;
  const spacing = 4;
  
  for (let y = 0; y < canvas.height; y += spacing) {
    for (let x = 0; x < canvas.width; x += spacing) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];
      
      if (alpha > 128) {
        ctx.fillStyle = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`;
        ctx.beginPath();
        ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
};

const addLogoToQR = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  logoSrc: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const logoSize = Math.min(canvas.width, canvas.height) * 0.2;
      const x = (canvas.width - logoSize) / 2;
      const y = (canvas.height - logoSize) / 2;
      
      // Add white background for logo
      ctx.fillStyle = 'white';
      ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
      
      // Draw logo
      ctx.drawImage(img, x, y, logoSize, logoSize);
      resolve();
    };
    img.onerror = reject;
    img.src = logoSrc;
  });
};

const addDecorativeElements = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  decorateSrc: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Add decorative border or frame
      const frameSize = 20;
      ctx.drawImage(img, -frameSize, -frameSize, canvas.width + frameSize * 2, canvas.height + frameSize * 2);
      resolve();
    };
    img.onerror = reject;
    img.src = decorateSrc;
  });
};

const addStickers = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  stickers: string[]
) => {
  stickers.forEach((sticker, index) => {
    if (sticker === 'scan-me') {
      // Add "Scan Me" text
      ctx.fillStyle = '#007bff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Scan Me', canvas.width / 2, canvas.height - 10);
    }
  });
};
