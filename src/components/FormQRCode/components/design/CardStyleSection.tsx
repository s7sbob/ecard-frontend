// src/components/FormQRCode/components/design/CardStyleSection.tsx
import React from 'react';
import { ColorPicker } from '../ColorPicker';

interface CardStyleSectionProps {
  cardStyle: {
    background: boolean;
    backgroundColor: string;
    cornerRadius: number;
    shadow: {
      color: string;
      x: number;
      y: number;
      blur: number;
      spread: number;
    };
  };
  onCardStyleChange: (updates: any) => void;
}

export const CardStyleSection: React.FC<CardStyleSectionProps> = ({
  cardStyle,
  onCardStyleChange,
}) => {
  return (
    <div className="space-y-6">
      <h4 className="font-medium text-gray-800">Card Style</h4>
      
      {/* Card Background Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Card Background</span>
        <button
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            cardStyle.background ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          onClick={() => onCardStyleChange({ background: !cardStyle.background })}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              cardStyle.background ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {cardStyle.background && (
        <>
          {/* Background Color */}
          <ColorPicker
            color={cardStyle.backgroundColor}
            onChange={(color) => onCardStyleChange({ backgroundColor: color })}
            label="Background Color"
          />

          {/* Corner Radius */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Corner Radius: {cardStyle.cornerRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={cardStyle.cornerRadius}
              onChange={(e) => onCardStyleChange({ cornerRadius: parseInt(e.target.value) })}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Drop Shadow */}
          <div className="space-y-4">
            <ColorPicker
              color={cardStyle.shadow.color}
              onChange={(color) => onCardStyleChange({ 
                shadow: { ...cardStyle.shadow, color } 
              })}
              label="Drop Shadow Color"
            />
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">X Offset</label>
                <input
                  type="number"
                  value={cardStyle.shadow.x}
                  onChange={(e) => onCardStyleChange({
                    shadow: { ...cardStyle.shadow, x: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y Offset</label>
                <input
                  type="number"
                  value={cardStyle.shadow.y}
                  onChange={(e) => onCardStyleChange({
                    shadow: { ...cardStyle.shadow, y: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Blur</label>
                <input
                  type="number"
                  value={cardStyle.shadow.blur}
                  onChange={(e) => onCardStyleChange({
                    shadow: { ...cardStyle.shadow, blur: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Spread</label>
                <input
                  type="number"
                  value={cardStyle.shadow.spread}
                  onChange={(e) => onCardStyleChange({
                    shadow: { ...cardStyle.shadow, spread: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
