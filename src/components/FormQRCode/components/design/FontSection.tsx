// src/components/FormQRCode/components/design/FontSection.tsx
import React from 'react';

interface FontSectionProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

export const FontSection: React.FC<FontSectionProps> = ({
  selectedFont,
  onFontChange,
}) => {
  const fontOptions = [
    { id: 'default', name: 'Default', preview: 'Aa', family: 'system-ui, sans-serif' },
    { id: 'work-sans', name: 'Work Sans', preview: 'Aa', family: 'Work Sans, sans-serif' },
    { id: 'open-sans', name: 'Open Sans', preview: 'Aa', family: 'Open Sans, sans-serif' },
    { id: 'roboto', name: 'Roboto', preview: 'Aa', family: 'Roboto, sans-serif' },
    { id: 'playfair', name: 'Playfair Display', preview: 'Aa', family: 'Playfair Display, serif' },
    { id: 'poppins', name: 'Poppins', preview: 'Aa', family: 'Poppins, sans-serif' },
    { id: 'montserrat', name: 'Montserrat', preview: 'Aa', family: 'Montserrat, sans-serif' },
    { id: 'lato', name: 'Lato', preview: 'Aa', family: 'Lato, sans-serif' },
    { id: 'inter', name: 'Inter', preview: 'Aa', family: 'Inter, sans-serif' },
    { id: 'nunito', name: 'Nunito', preview: 'Aa', family: 'Nunito, sans-serif' },
    { id: 'source-sans', name: 'Source Sans Pro', preview: 'Aa', family: 'Source Sans Pro, sans-serif' },
    { id: 'ubuntu', name: 'Ubuntu', preview: 'Aa', family: 'Ubuntu, sans-serif' },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">Font Family</h4>
      <div className="grid grid-cols-4 gap-4">
        {fontOptions.map((font) => (
          <button
            key={font.id}
            className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
              selectedFont === font.family
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onFontChange(font.family)}
          >
            <span className="text-2xl" style={{ fontFamily: font.family }}>
              {font.preview}
            </span>
            <span className="text-xs text-gray-500 text-center">{font.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
