// src/components/FormQRCode/utils/svgPathExtractor.ts
export const extractPathFromSVG = (svgString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  
  // البحث عن أول path في الـ SVG
  const pathElement = doc.querySelector('path');
  if (pathElement) {
    return pathElement.getAttribute('d') || '';
  }
  
  // إذا لم نجد path، نبحث عن أشكال أخرى
  const circleElement = doc.querySelector('circle');
  if (circleElement) {
    const cx = parseFloat(circleElement.getAttribute('cx') || '0');
    const cy = parseFloat(circleElement.getAttribute('cy') || '0');
    const r = parseFloat(circleElement.getAttribute('r') || '50');
    return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
  }
  
  // شكل افتراضي
  return 'M50,50 L350,50 L350,350 L50,350 Z';
};
