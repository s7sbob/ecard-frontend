// src/components/FormQRCode/components/ColorPicker.tsx
import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-16 h-16 border-2 border-gray-300 rounded-xl cursor-pointer shadow-sm"
            style={{ backgroundColor: color }}
          />
          {showPicker && (
            <div className="absolute top-20 left-0 z-50 bg-white p-4 rounded-lg shadow-xl border">
              <HexColorPicker color={color} onChange={onChange} />
              <button
                onClick={() => setShowPicker(false)}
                className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          )}
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};
