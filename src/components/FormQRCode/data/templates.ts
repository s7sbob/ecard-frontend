// src/components/FormQRCode/data/templates.ts
export interface QRTemplate {
  id: string;
  name: string;
  colors: string[];
  gradient: boolean;
  category: string;
}

export const templatesData: QRTemplate[] = [
  // Business Templates
  { id: 'business-pro', name: 'Business Pro', colors: ['#2E86AB', '#A23B72'], gradient: true, category: 'business' },
  { id: 'corporate', name: 'Corporate', colors: ['#1F2937', '#4B5563'], gradient: true, category: 'business' },
  { id: 'professional', name: 'Professional', colors: ['#0F4C75', '#3282B8'], gradient: true, category: 'business' },
  { id: 'elegant', name: 'Elegant Dark', colors: ['#2C3E50', '#E74C3C'], gradient: true, category: 'business' },
  
  // Social Media Templates
  { id: 'social-blue', name: 'Social Media', colors: ['#1DA1F2', '#FFFFFF'], gradient: true, category: 'social' },
  { id: 'instagram', name: 'Instagram Style', colors: ['#E4405F', '#FCAF45'], gradient: true, category: 'social' },
  { id: 'facebook', name: 'Facebook Blue', colors: ['#1877F2', '#42A5F5'], gradient: true, category: 'social' },
  { id: 'linkedin', name: 'LinkedIn Pro', colors: ['#0A66C2', '#378FE9'], gradient: true, category: 'social' },
  
  // Nature Templates
  { id: 'nature-fresh', name: 'Nature Fresh', colors: ['#F18F01', '#C73E1D'], gradient: true, category: 'nature' },
  { id: 'forest-green', name: 'Forest Green', colors: ['#2D5016', '#A4AC86'], gradient: true, category: 'nature' },
  { id: 'ocean-breeze', name: 'Ocean Breeze', colors: ['#06D6A0', '#118AB2'], gradient: true, category: 'nature' },
  { id: 'sunset-glow', name: 'Sunset Glow', colors: ['#FF6B6B', '#FFE66D'], gradient: true, category: 'nature' },
  
  // Vibrant Templates
  { id: 'vibrant-purple', name: 'Vibrant Purple', colors: ['#8E44AD', '#3498DB'], gradient: true, category: 'vibrant' },
  { id: 'fire-red', name: 'Fire Red', colors: ['#DC2626', '#F59E0B'], gradient: true, category: 'vibrant' },
  { id: 'royal-purple', name: 'Royal Purple', colors: ['#4C1D95', '#7C3AED'], gradient: true, category: 'vibrant' },
  { id: 'electric-blue', name: 'Electric Blue', colors: ['#0EA5E9', '#E0F2FE'], gradient: true, category: 'vibrant' },
  
  // Elegant Templates
  { id: 'golden-hour', name: 'Golden Hour', colors: ['#F59E0B', '#FEF3C7'], gradient: true, category: 'elegant' },
  { id: 'rose-pink', name: 'Rose Pink', colors: ['#EC4899', '#FCE7F3'], gradient: true, category: 'elegant' },
  { id: 'fresh-mint', name: 'Fresh Mint', colors: ['#10B981', '#D1FAE5'], gradient: true, category: 'elegant' },
  { id: 'ice-blue', name: 'Ice Blue', colors: ['#0EA5E9', '#E0F2FE'], gradient: true, category: 'elegant' },
];
