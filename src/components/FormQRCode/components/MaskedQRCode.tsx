import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export interface MaskedQRCodeProps {
  value: string;
  size?: number;
  maskSrc: string;
  borderSrc: string;
  fgColor?: string;
  bgColor?: string;
}

export const MaskedQRCode: React.FC<MaskedQRCodeProps> = ({
  value,
  size = 300,
  maskSrc,
  borderSrc,
  fgColor = '#000000',
  bgColor = '#ffffff',
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.innerHTML = '';

    const qr = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: value,
      dotsOptions: { color: fgColor },
      backgroundOptions: { color: bgColor },
      qrOptions: { errorCorrectionLevel: 'H' },
    });

    qr.append(qrRef.current);
  }, [value, size, fgColor, bgColor]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: size,
    height: size,
    maskImage: `url(${maskSrc})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskImage: `url(${maskSrc})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    overflow: 'hidden',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: size,
    height: size,
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      <div ref={qrRef} style={{ width: size, height: size }} />
      <img src={borderSrc} alt="QR border" style={overlayStyle} />
    </div>
  );
};
