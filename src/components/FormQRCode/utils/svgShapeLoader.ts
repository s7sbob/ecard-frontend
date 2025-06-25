// src/components/FormQRCode/utils/svgShapeLoader.ts

export interface SVGShapeFile {
  id: string;
  name: string;
  category: string;
  icon: string;
  path: string; // ✅ renamed from filePath to path for consistency
}

export const svgShapeFiles: SVGShapeFile[] = [
  {
    id: 'fish',
    name: 'Fish',
    category: 'animals',
    icon: '🐟',
    path: '/assets/qr-shapes/fish.svg'
  },
  {
    id: 'airplane',
    name: 'Airplane',
    category: 'transport',
    icon: '✈️',
    path: '/assets/qr-shapes/airplane.svg'
  },
  {
    id: 'dress',
    name: 'Dress',
    category: 'fashion',
    icon: '👗',
    path: '/assets/qr-shapes/dress.svg'
  },
  {
    id: 'egg',
    name: 'Egg',
    category: 'food',
    icon: '🥚',
    path: '/assets/qr-shapes/egg.svg'
  },
  {
    id: 'heart',
    name: 'Heart',
    category: 'love',
    icon: '❤️',
    path: '/assets/qr-shapes/heart.svg'
  },
  {
    id: 'star',
    name: 'Star',
    category: 'shapes',
    icon: '⭐',
    path: '/assets/qr-shapes/star.svg'
  }
];

// دالة لتحميل محتوى الـ SVG
export const loadSVGContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.status}`);
    }
    const svgContent = await response.text();
    
    // التأكد من أن الـ SVG يحتوي على object اسمه "qr"
    if (!svgContent.includes('id="qr"')) {
      console.warn(`SVG at ${path} doesn't contain an element with id="qr"`);
    }
    
    return svgContent;
  } catch (error) {
    console.error('Error loading SVG:', error);
    // إرجاع SVG بسيط مع qr object كـ fallback
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="300" height="300" fill="white" stroke="black" stroke-width="4"/>
      <rect id="qr" x="150" y="150" width="100" height="100" fill="red" opacity="0.3"/>
    </svg>`;
  }
};

// دالة لاستخراج الـ path من الـ SVG
export const extractSVGPath = (svgContent: string): { path: string; viewBox: string; background?: string } => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = doc.querySelector('svg');
  const pathElement = doc.querySelector('path');

  const viewBox = svgElement?.getAttribute('viewBox') || '0 0 512 512';
  const path = pathElement?.getAttribute('d') || '';

  // استخرج الخلفية أو بقية عناصر الـ SVG لو احتجت
  const background = svgElement?.innerHTML || '';

  return { path, viewBox, background };
};
