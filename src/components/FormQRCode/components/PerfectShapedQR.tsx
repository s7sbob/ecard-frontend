// src/components/FormQRCode/components/PerfectShapedQR.tsx
import React, { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface PerfectShapedQRProps {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeId: string;
  eyeColor: string;
  svgPath?: string;
}

export const PerfectShapedQR: React.FC<PerfectShapedQRProps> = ({
  value,
  size,
  bgColor,
  fgColor,
  logoImage,
  logoSize,
  shapeId,
  eyeColor,
  svgPath
}) => {
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // تحميل SVG من الملفات المحلية
  const [shapeSVG, setShapeSVG] = useState<string>('');

  useEffect(() => {
    const loadSVGShape = async () => {
      try {
        // تحميل الـ SVG من المجلد
        const response = await fetch(`/assets/qr-shapes/${shapeId}.svg`);
        const svgText = await response.text();
        setShapeSVG(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
        // استخدام شكل افتراضي
        setShapeSVG(`
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,20 L180,180 L20,180 Z" fill="none" stroke="black" stroke-width="4"/>
          </svg>
        `);
      }
    };

    loadSVGShape();
  }, [shapeId]);

  useEffect(() => {
    if (qrRef.current && shapeSVG) {
      qrRef.current.innerHTML = '';
      
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: value,
        image: logoImage,
        dotsOptions: {
          color: fgColor,
          type: "rounded"
        },
        backgroundOptions: {
          color: "transparent", // خلفية شفافة تماماً
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: logoImage ? logoSize / size * 0.2 : 0,
        },
        cornersSquareOptions: {
          color: eyeColor,
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: eyeColor,
          type: "dot",
        },
        qrOptions: {
          errorCorrectionLevel: "H" // أعلى مستوى تصحيح
        }
      });

      qr.append(qrRef.current);
      setQrCode(qr);
    }
  }, [value, size, bgColor, fgColor, logoImage, logoSize, eyeColor, shapeSVG]);

  const downloadQR = async (format: 'png' | 'svg' | 'jpeg' = 'png') => {
    if (containerRef.current) {
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        if (format === 'svg') {
          const blob = new Blob([svgData], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `qr-code-${shapeId}.svg`;
          link.click();
          URL.revokeObjectURL(url);
        } else {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          
          img.onload = () => {
            canvas.width = size * 3; // دقة عالية
            canvas.height = size * 3;
            
            // خلفية بيضاء
            ctx!.fillStyle = bgColor;
            ctx!.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx?.drawImage(img, 0, 0, size * 3, size * 3);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `qr-code-${shapeId}.${format}`;
                link.click();
                URL.revokeObjectURL(downloadUrl);
              }
            }, `image/${format}`, 1.0);
            
            URL.revokeObjectURL(url);
          };
          
          img.src = url;
        }
      }
    }
  };

  if (!shapeSVG) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={containerRef} className="relative">
        <svg
          width={size}
          height={size}
          viewBox="0 0 400 400"
          className="drop-shadow-lg"
        >
          <defs>
            {/* استخراج الـ path من الـ SVG المحمل */}
            <clipPath id={`shape-clip-${shapeId}`}>
              {/* هنا هنحط الـ path من الـ SVG file */}
              <path d="M200,50 L350,350 L50,350 Z" />
            </clipPath>
          </defs>
          
          {/* خلفية بيضاء للشكل */}
          <rect width="400" height="400" fill={bgColor} />
          
          {/* QR Code مع الـ clip-path */}
          <foreignObject
            x="0"
            y="0"
            width="400"
            height="400"
            clipPath={`url(#shape-clip-${shapeId})`}
          >
            <div 
              ref={qrRef} 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                transform: 'scale(1.2)',
                transformOrigin: 'center'
              }}
            />
          </foreignObject>
          
          {/* حدود الشكل */}
          <path
            d="M200,50 L350,350 L50,350 Z"
            fill="none"
            stroke={fgColor}
            strokeWidth="6"
          />
        </svg>
      </div>

      {/* Download Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => downloadQR('png')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          PNG
        </button>
        <button
          onClick={() => downloadQR('svg')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          SVG
        </button>
        <button
          onClick={() => downloadQR('jpeg')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          JPEG
        </button>
      </div>
    </div>
  );
};
