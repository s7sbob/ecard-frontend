// src/components/FormQRCode/data/stickers.ts
export interface StickerFrame {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  frameType: 'circle' | 'square' | 'rounded' | 'star' | 'heart' | 'custom' | 'gradient' | 'neon' | 'vintage';
  gradient?: string[];
  animation?: boolean;
}

export const stickersData: StickerFrame[] = [
  // Christmas & Winter Wonderland
  { id: 'christmas-tree', name: 'Christmas Tree', category: 'christmas', icon: '🎄', color: '#0F7B0F', frameType: 'custom' },
  { id: 'santa', name: 'Santa Claus', category: 'christmas', icon: '🎅', color: '#DC2626', frameType: 'circle' },
  { id: 'snowman', name: 'Snowman', category: 'christmas', icon: '⛄', color: '#3B82F6', frameType: 'rounded' },
  { id: 'gift', name: 'Gift Box', category: 'christmas', icon: '🎁', color: '#DC2626', frameType: 'square' },
  { id: 'candy-cane', name: 'Candy Cane', category: 'christmas', icon: '🍭', color: '#DC2626', frameType: 'custom' },
  { id: 'bell', name: 'Christmas Bell', category: 'christmas', icon: '🔔', color: '#F59E0B', frameType: 'custom' },
  { id: 'wreath', name: 'Christmas Wreath', category: 'christmas', icon: '🎊', color: '#0F7B0F', frameType: 'circle' },
  { id: 'star-christmas', name: 'Christmas Star', category: 'christmas', icon: '⭐', color: '#F59E0B', frameType: 'star' },
  { id: 'snowflake', name: 'Snowflake', category: 'christmas', icon: '❄️', color: '#60A5FA', frameType: 'custom' },
  { id: 'reindeer', name: 'Reindeer', category: 'christmas', icon: '🦌', color: '#92400E', frameType: 'custom' },
  
  // Valentine's Day & Romance
  { id: 'valentine-heart', name: 'Valentine Heart', category: 'valentine', icon: '💝', color: '#DC2626', frameType: 'heart' },
  { id: 'cupid', name: 'Cupid Arrow', category: 'valentine', icon: '💘', color: '#EC4899', frameType: 'heart' },
  { id: 'rose', name: 'Rose', category: 'valentine', icon: '🌹', color: '#DC2626', frameType: 'custom' },
  { id: 'love-letter', name: 'Love Letter', category: 'valentine', icon: '💌', color: '#EC4899', frameType: 'square' },
  { id: 'kiss', name: 'Kiss Mark', category: 'valentine', icon: '💋', color: '#DC2626', frameType: 'circle' },
  { id: 'ring', name: 'Wedding Ring', category: 'valentine', icon: '💍', color: '#F59E0B', frameType: 'circle' },
  { id: 'love-birds', name: 'Love Birds', category: 'valentine', icon: '🕊️', color: '#EC4899', frameType: 'heart' },
  { id: 'chocolate', name: 'Chocolate Box', category: 'valentine', icon: '🍫', color: '#92400E', frameType: 'square' },
  
  // Birthday & Celebration Extravaganza
  { id: 'birthday-cake', name: 'Birthday Cake', category: 'birthday', icon: '🎂', color: '#EC4899', frameType: 'rounded' },
  { id: 'balloon', name: 'Balloon', category: 'birthday', icon: '🎈', color: '#3B82F6', frameType: 'custom' },
  { id: 'party-hat', name: 'Party Hat', category: 'birthday', icon: '🎉', color: '#F59E0B', frameType: 'custom' },
  { id: 'confetti', name: 'Confetti', category: 'birthday', icon: '🎊', color: '#8B5CF6', frameType: 'circle' },
  { id: 'fireworks', name: 'Fireworks', category: 'birthday', icon: '🎆', color: '#F59E0B', frameType: 'star' },
  { id: 'champagne', name: 'Champagne', category: 'birthday', icon: '🍾', color: '#F59E0B', frameType: 'custom' },
  { id: 'candles', name: 'Birthday Candles', category: 'birthday', icon: '🕯️', color: '#F59E0B', frameType: 'custom' },
  { id: 'present', name: 'Present Box', category: 'birthday', icon: '🎁', color: '#8B5CF6', frameType: 'square' },
  
  // Neon & Futuristic Frames
  { id: 'neon-circle', name: 'Neon Circle', category: 'neon', icon: '⭕', color: '#00FFFF', frameType: 'neon', gradient: ['#00FFFF', '#FF00FF'] },
  { id: 'neon-square', name: 'Neon Square', category: 'neon', icon: '🔲', color: '#FF00FF', frameType: 'neon', gradient: ['#FF00FF', '#00FF00'] },
  { id: 'cyber-frame', name: 'Cyber Frame', category: 'neon', icon: '🤖', color: '#00FF00', frameType: 'neon', gradient: ['#00FF00', '#0000FF'] },
  { id: 'laser-border', name: 'Laser Border', category: 'neon', icon: '⚡', color: '#FFFF00', frameType: 'neon', gradient: ['#FFFF00', '#FF0000'] },
  { id: 'hologram', name: 'Hologram', category: 'neon', icon: '🌈', color: '#FF69B4', frameType: 'neon', gradient: ['#FF69B4', '#00CED1'] },
  
  // Vintage & Retro Collection
  { id: 'vintage-circle', name: 'Vintage Circle', category: 'vintage', icon: '⭕', color: '#8B4513', frameType: 'vintage' },
  { id: 'retro-square', name: 'Retro Square', category: 'vintage', icon: '⬜', color: '#DAA520', frameType: 'vintage' },
  { id: 'classic-border', name: 'Classic Border', category: 'vintage', icon: '🖼️', color: '#2F4F4F', frameType: 'vintage' },
  { id: 'ornate-frame', name: 'Ornate Frame', category: 'vintage', icon: '🎭', color: '#B8860B', frameType: 'vintage' },
  { id: 'antique-gold', name: 'Antique Gold', category: 'vintage', icon: '✨', color: '#FFD700', frameType: 'vintage' },
  
  // Badges & Professional Labels
  { id: 'circle-badge', name: 'Circle Badge', category: 'badges', icon: '🏷️', color: '#6B7280', frameType: 'circle' },
  { id: 'square-badge', name: 'Square Badge', category: 'badges', icon: '📋', color: '#6B7280', frameType: 'square' },
  { id: 'ribbon-red', name: 'Red Ribbon', category: 'badges', icon: '🎀', color: '#DC2626', frameType: 'custom' },
  { id: 'ribbon-blue', name: 'Blue Ribbon', category: 'badges', icon: '🎀', color: '#3B82F6', frameType: 'custom' },
  { id: 'medal', name: 'Medal', category: 'badges', icon: '🏅', color: '#F59E0B', frameType: 'circle' },
  { id: 'certificate', name: 'Certificate', category: 'badges', icon: '📜', color: '#F59E0B', frameType: 'square' },
  { id: 'shield', name: 'Shield Badge', category: 'badges', icon: '🛡️', color: '#1F2937', frameType: 'custom' },
  { id: 'crown', name: 'Crown Badge', category: 'badges', icon: '👑', color: '#F59E0B', frameType: 'custom' },
  
  // Gradient Magic Frames
  { id: 'sunset-gradient', name: 'Sunset Gradient', category: 'gradient', icon: '🌅', color: '#FF6B6B', frameType: 'gradient', gradient: ['#FF6B6B', '#FFE66D'] },
  { id: 'ocean-gradient', name: 'Ocean Gradient', category: 'gradient', icon: '🌊', color: '#06D6A0', frameType: 'gradient', gradient: ['#06D6A0', '#118AB2'] },
  { id: 'purple-gradient', name: 'Purple Gradient', category: 'gradient', icon: '🔮', color: '#8E44AD', frameType: 'gradient', gradient: ['#8E44AD', '#3498DB'] },
  { id: 'fire-gradient', name: 'Fire Gradient', category: 'gradient', icon: '🔥', color: '#DC2626', frameType: 'gradient', gradient: ['#DC2626', '#F59E0B'] },
  { id: 'mint-gradient', name: 'Mint Gradient', category: 'gradient', icon: '🍃', color: '#10B981', frameType: 'gradient', gradient: ['#10B981', '#D1FAE5'] },
  
  // Nature & Elements
  { id: 'flower-frame', name: 'Flower Frame', category: 'nature', icon: '🌸', color: '#EC4899', frameType: 'custom' },
  { id: 'leaf-frame', name: 'Leaf Frame', category: 'nature', icon: '🍃', color: '#0F7B0F', frameType: 'custom' },
  { id: 'sun-frame', name: 'Sun Frame', category: 'nature', icon: '☀️', color: '#F59E0B', frameType: 'custom' },
  { id: 'cloud-frame', name: 'Cloud Frame', category: 'nature', icon: '☁️', color: '#3B82F6', frameType: 'custom' },
  { id: 'tree-frame', name: 'Tree Frame', category: 'nature', icon: '🌳', color: '#0F7B0F', frameType: 'custom' },
  { id: 'mountain-frame', name: 'Mountain Frame', category: 'nature', icon: '🏔️', color: '#6B7280', frameType: 'custom' },
  
  // Tech & Digital
  { id: 'wifi-frame', name: 'WiFi Frame', category: 'tech', icon: '📶', color: '#3B82F6', frameType: 'custom' },
  { id: 'phone-frame', name: 'Phone Frame', category: 'tech', icon: '📱', color: '#1F2937', frameType: 'rounded' },
  { id: 'laptop-frame', name: 'Laptop Frame', category: 'tech', icon: '💻', color: '#6B7280', frameType: 'square' },
  { id: 'qr-frame', name: 'QR Frame', category: 'tech', icon: '📱', color: '#1F2937', frameType: 'square' },
  { id: 'circuit-frame', name: 'Circuit Frame', category: 'tech', icon: '🔌', color: '#00FF00', frameType: 'custom' },
  { id: 'binary-frame', name: 'Binary Frame', category: 'tech', icon: '💾', color: '#1F2937', frameType: 'custom' },
];
