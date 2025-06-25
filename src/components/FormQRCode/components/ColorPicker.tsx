// src/components/FormQRCode/components/ColorPicker.tsx
import React, { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export const ColorPicker = React.memo<ColorPickerProps>(({ color, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = useCallback((newColor: string) => {
    onChange(newColor);
  }, [onChange]);

  const togglePicker = useCallback(() => {
    setShowPicker(prev => !prev);
  }, []);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <button
            onClick={togglePicker}
            className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: color }}
          />
          {showPicker && (
            <div className="absolute top-14 left-0 z-50 bg-white p-3 rounded-lg shadow-xl border">
              <HexColorPicker color={color} onChange={handleColorChange} />
              <button
                onClick={togglePicker}
                className="mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md font-mono text-sm flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';
