// src/components/FormQRCode/components/FramedQRCode.tsx
import React, { useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface FramedQRCodeProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  logoImage?: string;
  logoSize: number;
  shapeSvg?: string;
}

export const FramedQRCode = React.memo<FramedQRCodeProps>(({
  value,
  size,
  fgColor,
  bgColor,
  logoImage,
  logoSize,
  shapeSvg
}) => {
  const [processedSVG, setProcessedSVG] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!value) {
      setIsLoading(false);
      return;
    }

    const processQRCode = async () => {
      try {
        if (!shapeSvg) {
          // QR code عادي بدون شكل
          const qr = new QRCodeStyling({
            width: size,
            height: size,
            data: value,
            type: 'svg',
            image: logoImage,
            imageOptions: {
              crossOrigin: "anonymous",
              margin: 4,
              imageSize: logoImage ? logoSize / size : 0,
            },
            dotsOptions: {
              color: fgColor,
              type: "square",
            },
            backgroundOptions: {
              color: bgColor,
            },
          });

          const qrBlob = await qr.getRawData('svg');
          if (qrBlob instanceof Blob) {
            const qrText = await qrBlob.text();
            setProcessedSVG(qrText);
          }
        } else {
          // QR code مع الشكل
          await processShapeWithQR();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing QR code:', error);
        setIsLoading(false);
      }
    };

    const processShapeWithQR = async () => {
      if (!shapeSvg) return;

      console.log('Shape SVG content:', shapeSvg); // للتأكد من المحتوى

      // إنشاء QR Code
      const qr = new QRCodeStyling({
        width: 100,
        height: 100,
        data: value,
        type: 'svg',
        image: logoImage,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 1,
          imageSize: logoImage ? 0.15 : 0,
        },
        dotsOptions: {
          color: fgColor,
          type: "square",
        },
        backgroundOptions: {
          color: 'transparent',
        },
      });

      const qrBlob = await qr.getRawData('svg');
      if (!(qrBlob instanceof Blob)) return;

      const qrText = await qrBlob.text();
      
      // معالجة الـ SVG
      const parser = new DOMParser();
      const shapeDoc = parser.parseFromString(shapeSvg, 'image/svg+xml');
      const qrDoc = parser.parseFromString(qrText, 'image/svg+xml');
      
      // البحث عن الـ object اللي اسمه "qr"
      const qrObject = shapeDoc.querySelector('#qr');
      
      console.log('QR Object found:', qrObject); // للتأكد من وجود الـ element
      
      if (qrObject && qrDoc.querySelector('svg')) {
        // استخراج محتوى الـ QR code
        const qrSvgElement = qrDoc.querySelector('svg');
        const qrContent = qrSvgElement?.innerHTML || '';
        
        console.log('QR Content:', qrContent); // للتأكد من محتوى الـ QR
        
        // استبدال المحتوى
        qrObject.innerHTML = qrContent;
        
        console.log('QR Object after replacement:', qrObject); // للتأكد من الاستبدال
      } else {
        console.error('QR object not found in SVG!');
        
        // إذا مفيش id="qr"، نضيف الـ QR في وسط الشكل
        const svgRoot = shapeDoc.querySelector('svg');
        if (svgRoot) {
          const qrSvgElement = qrDoc.querySelector('svg');
          const qrContent = qrSvgElement?.innerHTML || '';
          
          // إنشاء group في وسط الشكل
          const qrGroup = shapeDoc.createElementNS('http://www.w3.org/2000/svg', 'g');
          qrGroup.setAttribute('id', 'qr');
          qrGroup.setAttribute('transform', 'translate(150, 150) scale(0.5)'); // تعديل حسب الحاجة
          qrGroup.innerHTML = qrContent;
          
          svgRoot.appendChild(qrGroup);
        }
      }

      // تحويل الـ SVG المعدل لـ string
      const serializer = new XMLSerializer();
      const finalSVG = serializer.serializeToString(shapeDoc);
      
      console.log('Final SVG:', finalSVG); // للتأكد من النتيجة النهائية
      
      setProcessedSVG(finalSVG);
    };

    processQRCode();
  }, [shapeSvg, value, fgColor, bgColor, logoImage, logoSize, size]);

  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg" 
        style={{ width: size, height: size }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div 
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: processedSVG }}
    />
  );
});

FramedQRCode.displayName = 'FramedQRCode';

export default FramedQRCode;
