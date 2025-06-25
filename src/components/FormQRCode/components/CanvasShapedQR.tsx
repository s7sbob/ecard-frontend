// src/components/FormQRCode/components/CanvasShapedQR.tsx
import React, { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface CanvasShapedQRProps {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeId: string;
  eyeColor: string;
}

export const CanvasShapedQR: React.FC<CanvasShapedQRProps> = ({
  value,
  size,
  bgColor,
  fgColor,
  logoImage,
  logoSize,
  shapeId,
  eyeColor
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // أشكال مبسطة بـ Canvas paths
const getShapePath = (ctx: CanvasRenderingContext2D, size: number) => {
  const centerX = size / 2;
  const centerY = size / 2;
  
  ctx.beginPath();
  
  switch (shapeId) {
    case 'fish':
      // شكل سمكة أكثر دقة
      ctx.ellipse(centerX - 20, centerY, 100, 60, 0, 0, 2 * Math.PI);
      // ذيل السمكة
      ctx.moveTo(centerX + 80, centerY);
      ctx.lineTo(centerX + 130, centerY - 40);
      ctx.lineTo(centerX + 130, centerY + 40);
      ctx.closePath();
      break;
      
    case 'airplane':
      // شكل طائرة محسن
      ctx.moveTo(centerX, 50); // مقدمة الطائرة
      ctx.lineTo(centerX + 20, centerY - 40); // جناح أيمن علوي
      ctx.lineTo(centerX + 140, centerY - 20);
      ctx.lineTo(centerX + 120, centerY);
      ctx.lineTo(centerX + 140, centerY + 20);
      ctx.lineTo(centerX + 20, centerY + 40); // جناح أيمن سفلي
      ctx.lineTo(centerX + 40, size - 50); // ذيل أيمن
      ctx.lineTo(centerX + 10, size - 40);
      ctx.lineTo(centerX, size - 30); // مؤخرة الطائرة
      ctx.lineTo(centerX - 10, size - 40);
      ctx.lineTo(centerX - 40, size - 50); // ذيل أيسر
      ctx.lineTo(centerX - 20, centerY + 40); // جناح أيسر سفلي
      ctx.lineTo(centerX - 140, centerY + 20);
      ctx.lineTo(centerX - 120, centerY);
      ctx.lineTo(centerX - 140, centerY - 20);
      ctx.lineTo(centerX - 20, centerY - 40); // جناح أيسر علوي
      ctx.closePath();
      break;
      
    case 'dress':
      // شكل فستان محسن
      ctx.moveTo(centerX - 40, 60); // كتف أيسر
      ctx.lineTo(centerX + 40, 60); // كتف أيمن
      ctx.lineTo(centerX + 50, 100); // تحت الإبط أيمن
      ctx.lineTo(centerX + 70, 150); // خصر أيمن
      ctx.lineTo(centerX + 120, size - 40); // أسفل الفستان أيمن
      ctx.lineTo(centerX - 120, size - 40); // أسفل الفستان أيسر
      ctx.lineTo(centerX - 70, 150); // خصر أيسر
      ctx.lineTo(centerX - 50, 100); // تحت الإبط أيسر
      ctx.closePath();
      break;
      
    case 'egg':
      // شكل بيضة
      ctx.ellipse(centerX, centerY + 20, 80, 110, 0, 0, 2 * Math.PI);
      break;
    
    case 'cat':
  // شكل قطة
  // رأس القطة (دائرة)
  ctx.arc(centerX, centerY - 40, 60, 0, 2 * Math.PI);
  // أذن يسرى
  ctx.moveTo(centerX - 40, centerY - 80);
  ctx.lineTo(centerX - 60, centerY - 120);
  ctx.lineTo(centerX - 20, centerY - 100);
  ctx.closePath();
  // أذن يمنى
  ctx.moveTo(centerX + 40, centerY - 80);
  ctx.lineTo(centerX + 60, centerY - 120);
  ctx.lineTo(centerX + 20, centerY - 100);
  ctx.closePath();
  // جسم القطة
  ctx.ellipse(centerX, centerY + 60, 50, 80, 0, 0, 2 * Math.PI);
  break;

case 'flower':
  // شكل زهرة
  const petalCount = 6;
  const petalRadius = 40;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * 2 * Math.PI) / petalCount;
    const petalX = centerX + Math.cos(angle) * 60;
    const petalY = centerY + Math.sin(angle) * 60;
    ctx.moveTo(centerX, centerY);
    ctx.arc(petalX, petalY, petalRadius, 0, 2 * Math.PI);
  }
  // مركز الزهرة
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
  break;

case 'house':
  // شكل بيت
  // قاعدة البيت
  ctx.rect(centerX - 80, centerY, 160, 120);
  // سقف البيت
  ctx.moveTo(centerX - 100, centerY);
  ctx.lineTo(centerX, centerY - 80);
  ctx.lineTo(centerX + 100, centerY);
  ctx.closePath();
  // باب
  ctx.rect(centerX - 20, centerY + 60, 40, 60);
  // نافذة
  ctx.rect(centerX + 30, centerY + 20, 30, 30);
  break;
  
    case 'heart':
      // شكل قلب محسن
      const heartSize = 100;
      ctx.moveTo(centerX, centerY + heartSize/3);
      // نصف قلب أيسر
      ctx.bezierCurveTo(
        centerX, centerY - heartSize/4,
        centerX - heartSize/2, centerY - heartSize/2,
        centerX - heartSize/2, centerY - heartSize/6
      );
      ctx.bezierCurveTo(
        centerX - heartSize/2, centerY + heartSize/6,
        centerX, centerY + heartSize/3,
        centerX, centerY + heartSize
      );
      // نصف قلب أيمن
      ctx.bezierCurveTo(
        centerX, centerY + heartSize/3,
        centerX + heartSize/2, centerY + heartSize/6,
        centerX + heartSize/2, centerY - heartSize/6
      );
      ctx.bezierCurveTo(
        centerX + heartSize/2, centerY - heartSize/2,
        centerX, centerY - heartSize/4,
        centerX, centerY + heartSize/3
      );
      break;
      
    case 'star':
      // شكل نجمة خماسية
      const spikes = 5;
      const outerRadius = 120;
      const innerRadius = 50;
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      
      ctx.moveTo(centerX, centerY - outerRadius);
      for (let i = 0; i < spikes; i++) {
        const xOuter = centerX + Math.cos(rot) * outerRadius;
        const yOuter = centerY + Math.sin(rot) * outerRadius;
        ctx.lineTo(xOuter, yOuter);
        rot += step;
        
        const xInner = centerX + Math.cos(rot) * innerRadius;
        const yInner = centerY + Math.sin(rot) * innerRadius;
        ctx.lineTo(xInner, yInner);
        rot += step;
      }
      ctx.closePath();
      break;
      
    default:
      // مربع افتراضي
      ctx.roundRect(centerX - 100, centerY - 100, 200, 200, 20);
  }
};

  useEffect(() => {
    generateShapedQR();
  }, [value, size, bgColor, fgColor, logoImage, logoSize, shapeId, eyeColor]);

  const generateShapedQR = async () => {
    if (!canvasRef.current) return;
    
    setIsLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    try {
      // إنشاء QR Code مؤقت
      const tempDiv = document.createElement('div');
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: "canvas",
        data: value,
        image: logoImage,
        dotsOptions: {
          color: fgColor,
          type: "rounded"
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: logoImage ? logoSize / size : 0,
        },
        cornersSquareOptions: {
          color: eyeColor,
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: eyeColor,
          type: "dot",
        }
      });

      await qr.append(tempDiv);
      
      // انتظار حتى يتم الرندر
      setTimeout(() => {
        const qrCanvas = tempDiv.querySelector('canvas');
        if (qrCanvas) {
          // مسح الكانفاس
          ctx.clearRect(0, 0, size, size);
          
          // خلفية بيضاء
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, size, size);
          
          // إنشاء الشكل كـ clipping mask
          ctx.save();
          getShapePath(ctx, size);
          ctx.clip();
          
          // رسم الـ QR Code داخل الشكل
          ctx.drawImage(qrCanvas, 0, 0, size, size);
          
          ctx.restore();
          
          // رسم حدود الشكل
          ctx.strokeStyle = fgColor;
          ctx.lineWidth = 4;
          getShapePath(ctx, size);
          ctx.stroke();
        }
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error generating QR:', error);
      setIsLoading(false);
    }
  };

  const downloadQR = (format: 'png' | 'jpeg' = 'png') => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `qr-code-${shapeId}.${format}`;
      link.href = canvasRef.current.toDataURL(`image/${format}`, 1.0);
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="border border-gray-200 rounded-lg shadow-lg"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Shape Info */}
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
        <span className="text-lg">
          {shapeId === 'dress' && '👗'}
          {shapeId === 'fish' && '🐟'}
          {shapeId === 'airplane' && '✈️'}
          {shapeId === 'heart' && '❤️'}
        </span>
        <span className="text-sm font-medium text-gray-700 capitalize">{shapeId}</span>
      </div>

      {/* Download Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => downloadQR('png')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          PNG
        </button>
        <button
          onClick={() => downloadQR('jpeg')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          JPEG
        </button>
      </div>
    </div>
  );
};
