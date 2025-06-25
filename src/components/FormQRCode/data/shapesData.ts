// src/components/FormQRCode/data/shapesData.ts
export interface ShapeData {
  id: string;
  name: string;
  category: string;
  svgContent: string; // SVG مع object اسمه "qr"
  icon: string;
}

export const shapesData: ShapeData[] = [
  {
    id: 'truck-shape',
    name: 'Truck',
    category: 'vehicles',
    svgContent: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <!-- الشاحنة -->
      <rect x="50" y="150" width="200" height="120" fill="white" stroke="black" stroke-width="4"/>
      <rect x="250" y="180" width="80" height="90" fill="white" stroke="black" stroke-width="4"/>
      
      <!-- العجلات -->
      <circle cx="100" cy="290" r="25" fill="white" stroke="black" stroke-width="4"/>
      <circle cx="200" cy="290" r="25" fill="white" stroke="black" stroke-width="4"/>
      <circle cx="290" cy="290" r="25" fill="white" stroke="black" stroke-width="4"/>
      
      <!-- منطقة الـ QR (object اسمه qr) -->
      <rect id="qr" x="80" y="170" width="140" height="80" fill="red" opacity="0.3"/>
    </svg>`,
    icon: '🚛'
  },
  // باقي الأشكال...
];
