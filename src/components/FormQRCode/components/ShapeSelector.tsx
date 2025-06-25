// File: src/components/FormQRCode/ShapeSelector.tsx

import React from 'react';
import { qrShapes } from '../data/qrShapes';

interface ShapeSelectorProps {
  selectedPath: string;
  onSelect: (path: string) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  selectedPath,
  onSelect,
}) => {
  return (
    <div className="space-y-8">
      {qrShapes.map((category) => (
        <div key={category.title} className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 capitalize border-b border-gray-200 pb-2">
            {category.title}
          </h4>
          <div className="grid grid-cols-6 gap-4">
            {category.items.map((item) => (
              <button
                key={item.label}
                onClick={() => onSelect(item.path)}
                className={`p-3 border rounded-xl flex flex-col items-center space-y-1 ${
                  selectedPath === item.path
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={item.path} alt={item.label} className="w-10 h-10" />
                <span className="text-xs text-center font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
