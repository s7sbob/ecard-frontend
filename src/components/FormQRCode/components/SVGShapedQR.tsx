// src/components/FormQRCode/components/SVGShapedQR.tsx
import React, { useRef, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { extractPathFromSVG } from '../utils/svgPathExtractor';

interface SVGShapedQRProps {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeId: string;
  eyeColor: string;
}

export const SVGShapedQR: React.FC<SVGShapedQRProps> = ({
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
  const [shapePath, setShapePath] = useState<string>('');
  const [viewBox, setViewBox] = useState<string>('0 0 400 400');
  const qrRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSVGShape = async () => {
      try {
        const response = await fetch(`/assets/qr-shapes/${shapeId}.svg`);
        const svgText = await response.text();
        
        // استخراج الـ path والـ viewBox
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        const pathElement = doc.querySelector('path');
        
        if (svgElement) {
          const vb = svgElement.getAttribute('viewBox') || '0 0 400 400';
          setViewBox(vb);
        }
        
        if (pathElement) {
          const path = pathElement.getAttribute('d') || '';
          setShapePath(path);
        }
        
      } catch (error) {
        console.error('Error loading SVG:', error);
        // شكل افتراضي
        setShapePath('M100,50 L300,50 L350,150 L300,350 L100,350 L50,150 Z');
        setViewBox('0 0 400 400');
      }
    };

    loadSVGShape();
  }, [shapeId]);

  useEffect(() => {
    if (qrRef.current && shapePath) {
      qrRef.current.innerHTML = '';
      
      const qr = new QRCodeStyling({
        width: size * 0.9, // تكبير الـ QR Code
        height: size * 0.9,
        type: "svg",
        data: value,
        image: logoImage,
        dotsOptions: {
          color: fgColor,
          type: "rounded"
        },
        backgroundOptions: {
          color: "transparent",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 3,
          imageSize: logoImage ? 0.15 : 0,
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
          errorCorrectionLevel: "H"
        }
      });

      qr.append(qrRef.current);
      setQrCode(qr);
    }
  }, [value, size, bgColor, fgColor, logoImage, logoSize, eyeColor, shapePath]);

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
            canvas.width = size * 4;
            canvas.height = size * 4;
            
            // خلفية بيضاء
            ctx!.fillStyle = '#FFFFFF';
            ctx!.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx?.drawImage(img, 0, 0, size * 4, size * 4);
            
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

  if (!shapePath) {
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
          viewBox={viewBox}
          className="drop-shadow-lg"
        >
          <defs>
            <clipPath id={`shape-clip-${shapeId}`}>
              <path d={shapePath} />
            </clipPath>
          </defs>
          
          {/* خلفية بيضاء */}
          <rect width="100%" height="100%" fill={bgColor} />
          
          {/* QR Code داخل الشكل */}
          <foreignObject
            x="5%"
            y="5%"
            width="90%"
            height="90%"
            clipPath={`url(#shape-clip-${shapeId})`}
          >
            <div 
              ref={qrRef} 
              className="w-full h-full flex items-center justify-center"
              style={{ 
                transform: 'scale(1.1)',
                transformOrigin: 'center'
              }}
            />
          </foreignObject>
          
          {/* حدود الشكل */}
          <path
            d={shapePath}
            fill="none"
            stroke={fgColor}
            strokeWidth="4"
            className="shape-border"
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
