// src/components/FormQRCode/data/shapesWithQRArea.ts
export interface ShapeWithQRArea {
  id: string;
  name: string;
  category: string;
  svgContent: string;
  qrAreaBounds: { x: number; y: number; width: number; height: number };
  icon: string;
}

export const shapesWithQRArea: ShapeWithQRArea[] = [
  {
    id: 'egg-shape',
    name: 'Egg',
    category: 'organic',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 50 C250 50 300 100 300 200 C300 300 250 350 200 350 C150 350 100 300 100 200 C100 100 150 50 200 50 Z" 
            fill="white" stroke="black" stroke-width="4"/>
      <rect x="160" y="180" width="80" height="80" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
    </svg>`,
    qrAreaBounds: { x: 160, y: 180, width: 80, height: 80 },
    icon: '🥚'
  },
  {
    id: 'star-shape',
    name: 'Star',
    category: 'geometric',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 50 L230 150 L330 150 L250 210 L280 310 L200 250 L120 310 L150 210 L70 150 L170 150 Z" 
            fill="white" stroke="black" stroke-width="4"/>
      <rect x="170" y="180" width="60" height="60" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
    </svg>`,
    qrAreaBounds: { x: 170, y: 180, width: 60, height: 60 },
    icon: '⭐'
  },
  {
    id: 'fish-shape',
    name: 'Fish',
    category: 'animals',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 200 C80 150 120 100 180 100 L280 100 C330 100 370 140 370 200 C370 260 330 300 280 300 L180 300 C120 300 80 250 80 200 Z" 
            fill="white" stroke="black" stroke-width="4"/>
      <path d="M80 200 L30 160 L30 240 Z" fill="white" stroke="black" stroke-width="4"/>
      <rect x="200" y="170" width="70" height="60" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
    </svg>`,
    qrAreaBounds: { x: 200, y: 170, width: 70, height: 60 },
    icon: '🐟'
  },
  {
    id: 'heart-shape',
    name: 'Heart',
    category: 'organic',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 320 C200 320 350 220 350 150 C350 100 310 60 260 60 C230 60 200 80 200 80 C200 80 170 60 140 60 C90 60 50 100 50 150 C50 220 200 320 200 320 Z" 
            fill="white" stroke="black" stroke-width="4"/>
      <rect x="170" y="160" width="60" height="60" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
    </svg>`,
    qrAreaBounds: { x: 170, y: 160, width: 60, height: 60 },
    icon: '❤️'
  },
  {
    id: 'diamond-shape',
    name: 'Diamond',
    category: 'geometric',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 50 L350 200 L200 350 L50 200 Z" 
            fill="white" stroke="black" stroke-width="4"/>
      <rect x="170" y="170" width="60" height="60" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
    </svg>`,
    qrAreaBounds: { x: 170, y: 170, width: 60, height: 60 },
    icon: '💎'
  }
];
