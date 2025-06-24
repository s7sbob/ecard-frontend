// src/components/FormQRCode/data/qrShapes.ts
export interface QRShape {
  id: string;
  name: string;
  category: string;
  icon: string;
  component: string;
  params?: any; // للمعاملات الإضافية
}

export const qrShapesData: QRShape[] = [
  // Basic & Classic Shapes
  { id: 'normal', name: 'Classic', category: 'basic', icon: '⬛', component: 'QRNormal' },
  { id: 'randrect', name: 'Random Rect', category: 'basic', icon: '🎲', component: 'QRRandRect' },
  { id: 'dsj', name: 'DSJ Style', category: 'basic', icon: '🔲', component: 'QRDsj' },
  { id: 'bubble', name: 'Bubble', category: 'basic', icon: '🫧', component: 'QRBubble' },
  { id: 'line', name: 'Line Art', category: 'basic', icon: '📏', component: 'QRLine' },
  
  // 3D & Advanced Effects
  { id: '25d', name: '2.5D Effect', category: '3d', icon: '🎲', component: 'QR25D' },
  { id: 'func-sin', name: 'Sine Wave', category: '3d', icon: '〰️', component: 'QRFunc', params: { type: 'sin' } },
  { id: 'func-cos', name: 'Cosine Wave', category: '3d', icon: '〰️', component: 'QRFunc', params: { type: 'cos' } },
  { id: 'func-spiral', name: 'Spiral', category: '3d', icon: '🌀', component: 'QRFunc', params: { type: 'spiral' } },
  
  // Image & Artistic Styles
  { id: 'image-normal', name: 'Image Style', category: 'artistic', icon: '🖼️', component: 'QRImage' },
  { id: 'resimage', name: 'Res Image', category: 'artistic', icon: '🎨', component: 'QRResImage' },
  { id: 'line-curve', name: 'Curved Lines', category: 'artistic', icon: '〰️', component: 'QRLine', params: { curve: true } },
  { id: 'bubble-gradient', name: 'Gradient Bubble', category: 'artistic', icon: '🌈', component: 'QRBubble', params: { gradient: true } },
  
  // Hearts & Love Collection
  { id: 'heart-bubble', name: 'Heart Bubbles', category: 'love', icon: '💕', component: 'QRBubble', params: { shape: 'heart' } },
  { id: 'heart-25d', name: 'Heart 3D', category: 'love', icon: '💖', component: 'QR25D', params: { shape: 'heart' } },
  { id: 'heart-func', name: 'Heart Wave', category: 'love', icon: '💗', component: 'QRFunc', params: { type: 'heart' } },
  { id: 'love-line', name: 'Love Lines', category: 'love', icon: '💘', component: 'QRLine', params: { style: 'love' } },
  { id: 'valentine-dsj', name: 'Valentine DSJ', category: 'love', icon: '💝', component: 'QRDsj', params: { theme: 'valentine' } },
  
  // Stars & Celestial Magic
  { id: 'star-bubble', name: 'Star Bubbles', category: 'stars', icon: '⭐', component: 'QRBubble', params: { shape: 'star' } },
  { id: 'star-25d', name: 'Star 3D', category: 'stars', icon: '🌟', component: 'QR25D', params: { shape: 'star' } },
  { id: 'galaxy-func', name: 'Galaxy Spiral', category: 'stars', icon: '🌌', component: 'QRFunc', params: { type: 'galaxy' } },
  { id: 'constellation', name: 'Constellation', category: 'stars', icon: '✨', component: 'QRLine', params: { style: 'constellation' } },
  { id: 'moon-dsj', name: 'Moon Phases', category: 'stars', icon: '🌙', component: 'QRDsj', params: { theme: 'moon' } },
  { id: 'comet-line', name: 'Comet Trail', category: 'stars', icon: '☄️', component: 'QRLine', params: { style: 'comet' } },
  
  // Animals & Nature
  { id: 'cat-bubble', name: 'Cat Bubbles', category: 'animals', icon: '🐱', component: 'QRBubble', params: { shape: 'cat' } },
  { id: 'dog-25d', name: 'Dog 3D', category: 'animals', icon: '🐶', component: 'QR25D', params: { shape: 'dog' } },
  { id: 'butterfly-func', name: 'Butterfly Wing', category: 'animals', icon: '🦋', component: 'QRFunc', params: { type: 'butterfly' } },
  { id: 'fish-line', name: 'Fish Scales', category: 'animals', icon: '🐟', component: 'QRLine', params: { style: 'scales' } },
  { id: 'bird-dsj', name: 'Bird Flight', category: 'animals', icon: '🐦', component: 'QRDsj', params: { theme: 'bird' } },
  { id: 'paw-bubble', name: 'Paw Prints', category: 'animals', icon: '🐾', component: 'QRBubble', params: { shape: 'paw' } },
  
  // Food & Delicious
  { id: 'coffee-bubble', name: 'Coffee Beans', category: 'food', icon: '☕', component: 'QRBubble', params: { shape: 'bean' } },
  { id: 'pizza-25d', name: 'Pizza Slice 3D', category: 'food', icon: '🍕', component: 'QR25D', params: { shape: 'pizza' } },
  { id: 'cake-func', name: 'Cake Layers', category: 'food', icon: '🎂', component: 'QRFunc', params: { type: 'layers' } },
  { id: 'donut-line', name: 'Donut Glaze', category: 'food', icon: '🍩', component: 'QRLine', params: { style: 'glaze' } },
  { id: 'burger-dsj', name: 'Burger Stack', category: 'food', icon: '🍔', component: 'QRDsj', params: { theme: 'burger' } },
  { id: 'wine-bubble', name: 'Wine Bubbles', category: 'food', icon: '🍷', component: 'QRBubble', params: { shape: 'wine' } },
  
  // Business & Professional
  { id: 'business-normal', name: 'Professional', category: 'business', icon: '💼', component: 'QRNormal' },
  { id: 'tech-func', name: 'Tech Wave', category: 'business', icon: '💻', component: 'QRFunc', params: { type: 'digital' } },
  { id: 'phone-dsj', name: 'Mobile Grid', category: 'business', icon: '📱', component: 'QRDsj', params: { theme: 'mobile' } },
  { id: 'chart-line', name: 'Chart Lines', category: 'business', icon: '📊', component: 'QRLine', params: { style: 'chart' } },
  { id: 'gear-25d', name: 'Gear 3D', category: 'business', icon: '⚙️', component: 'QR25D', params: { shape: 'gear' } },
  { id: 'network-bubble', name: 'Network Nodes', category: 'business', icon: '🌐', component: 'QRBubble', params: { shape: 'network' } },
  
  // Gaming & Fun
  { id: 'pixel-dsj', name: 'Pixel Art', category: 'gaming', icon: '🎮', component: 'QRDsj', params: { theme: 'pixel' } },
  { id: 'dice-25d', name: 'Dice 3D', category: 'gaming', icon: '🎲', component: 'QR25D', params: { shape: 'dice' } },
  { id: 'joystick-func', name: 'Joystick Wave', category: 'gaming', icon: '🕹️', component: 'QRFunc', params: { type: 'joystick' } },
  { id: 'game-bubble', name: 'Game Bubbles', category: 'gaming', icon: '🎯', component: 'QRBubble', params: { shape: 'game' } },
  
  // Music & Sound
  { id: 'music-func', name: 'Sound Wave', category: 'music', icon: '🎵', component: 'QRFunc', params: { type: 'sound' } },
  { id: 'guitar-line', name: 'Guitar Strings', category: 'music', icon: '🎸', component: 'QRLine', params: { style: 'strings' } },
  { id: 'note-bubble', name: 'Music Notes', category: 'music', icon: '🎶', component: 'QRBubble', params: { shape: 'note' } },
  { id: 'vinyl-25d', name: 'Vinyl Record', category: 'music', icon: '💿', component: 'QR25D', params: { shape: 'vinyl' } },
  
  // Sports & Fitness
  { id: 'football-bubble', name: 'Football Pattern', category: 'sports', icon: '⚽', component: 'QRBubble', params: { shape: 'football' } },
  { id: 'basketball-25d', name: 'Basketball 3D', category: 'sports', icon: '🏀', component: 'QR25D', params: { shape: 'basketball' } },
  { id: 'trophy-func', name: 'Victory Wave', category: 'sports', icon: '🏆', component: 'QRFunc', params: { type: 'victory' } },
  { id: 'running-line', name: 'Running Track', category: 'sports', icon: '🏃', component: 'QRLine', params: { style: 'track' } },
];
