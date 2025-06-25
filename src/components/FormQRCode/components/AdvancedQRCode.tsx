// src/components/FormQRCode/components/AdvancedQRCode.tsx
import React, { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface AdvancedQRCodeProps {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeId: string;
  eyeColor: string;
}

export const AdvancedQRCode: React.FC<AdvancedQRCodeProps> = ({
  value,
  size,
  bgColor,
  fgColor,
  logoImage,
  logoSize,
  shapeId,
  eyeColor
}) => {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // تحديث الـ QR Code عند تغيير أي prop
  useEffect(() => {
    if (ref.current) {
      // مسح المحتوى السابق
      ref.current.innerHTML = '';
      
      // إنشاء QR Code جديد
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: value,
        image: logoImage,
        dotsOptions: {
          color: fgColor,
          type: getDotsType(shapeId)
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoImage ? logoSize / size : 0,
        },
        cornersSquareOptions: {
          color: eyeColor,
          type: getCornersType(shapeId),
        },
        cornersDotOptions: {
          color: eyeColor,
          type: "dot",
        },
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "M"
        }
      });

      qr.append(ref.current);
      setQrCode(qr);

      // تطبيق الشكل المخصص بعد الرندر
      setTimeout(() => {
        applyCustomShape(ref.current, shapeId);
      }, 100);
    }
  }, [value, size, bgColor, fgColor, logoImage, logoSize, shapeId, eyeColor]);

  // دالة لتحديد نوع النقاط حسب الشكل
  const getDotsType = (shapeId: string): "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded" => {
    const shapeTypes: Record<string, any> = {
      'beer-mug': 'rounded',
      'brain': 'classy',
      'camera': 'square',
      'shopping-cart': 'dots',
      'heart-shape': 'rounded',
      'star-shape': 'classy',
      'phone-shape': 'square',
      'coffee-cup': 'rounded',
      'car-shape': 'square',
      'house-shape': 'square'
    };
    return shapeTypes[shapeId] || 'square';
  };

  // دالة لتحديد نوع الزوايا حسب الشكل
  const getCornersType = (shapeId: string): "square" | "extra-rounded" => {
    const roundedShapes = ['beer-mug', 'brain', 'heart-shape', 'star-shape', 'coffee-cup'];
    return roundedShapes.includes(shapeId) ? 'extra-rounded' : 'square';
  };

  // تطبيق الشكل المخصص
  const applyCustomShape = (container: HTMLElement | null, shapeId: string) => {
    if (!container) return;

    const svgElement = container.querySelector('svg');
    if (!svgElement) return;

    // إضافة CSS class للشكل
    svgElement.classList.add(`qr-shape-${shapeId}`);

    // تطبيق الـ clip-path حسب الشكل
    const clipPaths: Record<string, string> = {
      'beer-mug': 'polygon(20% 15%, 80% 15%, 85% 20%, 85% 70%, 80% 75%, 20% 75%, 15% 70%, 15% 20%)',
      'brain': 'ellipse(40% 35% at 50% 45%)',
      'camera': 'polygon(15% 30%, 35% 30%, 40% 25%, 60% 25%, 65% 30%, 85% 30%, 85% 75%, 15% 75%)',
      'shopping-cart': 'polygon(20% 25%, 80% 25%, 85% 30%, 85% 70%, 80% 75%, 20% 75%, 15% 70%, 15% 30%)',
      'heart-shape': 'polygon(50% 85%, 15% 45%, 15% 30%, 25% 15%, 40% 15%, 50% 25%, 60% 15%, 75% 15%, 85% 30%, 85% 45%)',
      'star-shape': 'polygon(50% 10%, 60% 35%, 85% 35%, 67% 55%, 75% 80%, 50% 65%, 25% 80%, 33% 55%, 15% 35%, 40% 35%)',
      'phone-shape': 'polygon(35% 10%, 65% 10%, 70% 15%, 70% 85%, 65% 90%, 35% 90%, 30% 85%, 30% 15%)',
      'coffee-cup': 'polygon(25% 25%, 75% 25%, 80% 30%, 80% 70%, 75% 75%, 25% 75%, 20% 70%, 20% 30%)',
      'car-shape': 'polygon(15% 45%, 25% 30%, 75% 30%, 85% 45%, 85% 70%, 15% 70%)',
      'house-shape': 'polygon(50% 15%, 85% 40%, 85% 85%, 15% 85%, 15% 40%)'
    };

    const clipPath = clipPaths[shapeId];
    if (clipPath) {
      svgElement.style.clipPath = clipPath;
    }
  };

  const downloadQR = async (format: 'png' | 'svg' | 'jpeg' = 'png') => {
    if (qrCode) {
      await qrCode.download({
        name: `qr-code-${shapeId}`,
        extension: format,
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={ref} className={`qr-container qr-shape-${shapeId}`} />
      <div className="flex space-x-2">
        <button
          onClick={() => downloadQR('png')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download PNG
        </button>
        <button
          onClick={() => downloadQR('svg')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
};
