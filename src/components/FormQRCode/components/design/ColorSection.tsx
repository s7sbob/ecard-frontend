// src/components/FormQRCode/components/design/ColorSection.tsx
import React from 'react';
import { ColorPicker } from '../ColorPicker';

interface ColorSectionProps {
  colors: {
    primary: string;
    secondary: string;
    primaryText: string;
    secondaryText: string;
    bodyText: string;
  };
  onColorChange: (colorType: string, color: string) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({
  colors,
  onColorChange,
}) => {
  const colorPalette = [
    '#3B82F6', '#1E40AF', '#DC2626', '#EA580C', '#92400E', '#059669', 
    '#0D9488', '#7C3AED', '#EC4899', '#6B7280', '#F59E0B', '#10B981', 
    '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="space-y-6">
      <h4 className="font-medium text-gray-800">Colors</h4>
      
      {/* Quick Color Palette */}
      <div className="grid grid-cols-8 gap-3">
        {colorPalette.map((color) => (
          <button
            key={color}
            className="aspect-square rounded-full border-2 border-gray-200 hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            onClick={() => onColorChange('primary', color)}
          />
        ))}
      </div>

      {/* Custom Color Inputs */}
      <div className="space-y-4">
        <ColorPicker
          color={colors.primary}
          onChange={(color) => onColorChange('primary', color)}
          label="Primary Color"
        />
        <ColorPicker
          color={colors.secondary}
          onChange={(color) => onColorChange('secondary', color)}
          label="Secondary Color"
        />
        <ColorPicker
          color={colors.primaryText}
          onChange={(color) => onColorChange('primaryText', color)}
          label="Primary Text Color"
        />
        <ColorPicker
          color={colors.secondaryText}
          onChange={(color) => onColorChange('secondaryText', color)}
          label="Secondary Text Color"
        />
        <ColorPicker
          color={colors.bodyText}
          onChange={(color) => onColorChange('bodyText', color)}
          label="Body Text Color"
        />
      </div>
    </div>
  );
};
