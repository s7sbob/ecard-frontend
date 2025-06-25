// src/components/FormQRCode/components/design/BackgroundSection.tsx
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface BackgroundSectionProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  selectedBackground,
  onBackgroundChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backgroundOptions = [
    { id: 'none', type: 'none', preview: '', name: 'None' },
    { id: 'gradient-1', type: 'gradient', preview: 'linear-gradient(45deg, #ff6b6b, #feca57)', name: 'Warm Gradient' },
    { id: 'gradient-2', type: 'gradient', preview: 'linear-gradient(45deg, #667eea, #764ba2)', name: 'Purple Gradient' },
    { id: 'gradient-3', type: 'gradient', preview: 'linear-gradient(45deg, #f093fb, #f5576c)', name: 'Pink Gradient' },
    { id: 'gradient-4', type: 'gradient', preview: 'linear-gradient(45deg, #4facfe, #00f2fe)', name: 'Blue Gradient' },
    { id: 'solid-red', type: 'solid', preview: '#dc2626', name: 'Red' },
    { id: 'solid-black', type: 'solid', preview: '#1f2937', name: 'Dark' },
    { id: 'solid-orange', type: 'solid', preview: '#ea580c', name: 'Orange' },
    { id: 'solid-yellow', type: 'solid', preview: '#f59e0b', name: 'Yellow' },
    { id: 'solid-green', type: 'solid', preview: '#16a34a', name: 'Green' },
    { id: 'solid-blue', type: 'solid', preview: '#2563eb', name: 'Blue' },
    { id: 'solid-purple', type: 'solid', preview: '#7c3aed', name: 'Purple' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onBackgroundChange(`url(${imageUrl})`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">Background</h4>
      <div className="grid grid-cols-6 gap-3">
        {/* Upload Option */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors"
        >
          <Upload size={20} className="text-gray-400" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {/* Background Options */}
        {backgroundOptions.map((bg) => (
          <button
            key={bg.id}
            className={`aspect-square border-2 rounded-lg overflow-hidden transition-colors ${
              selectedBackground === bg.preview
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onBackgroundChange(bg.preview)}
            style={{
              background: bg.type === 'none' 
                ? 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                : bg.preview,
              backgroundSize: bg.type === 'image' ? 'cover' : undefined,
              backgroundPosition: bg.type === 'image' ? 'center' : undefined
            }}
          >
            {bg.type === 'none' && (
              <span className="text-xs text-gray-500 font-medium">None</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
