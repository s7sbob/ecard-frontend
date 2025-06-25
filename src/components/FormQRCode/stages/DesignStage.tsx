// src/components/FormQRCode/stages/DesignStage.tsx
import React, { useState } from 'react';
import { FormQRCodeData } from '../types';
import { Button } from '../../ui/Button';
import { BackgroundSection } from '../components/design/BackgroundSection';
import { ColorSection } from '../components/design/ColorSection';
import { FontSection } from '../components/design/FontSection';
import { CardStyleSection } from '../components/design/CardStyleSection';
import { Image, Palette, Type, Settings } from 'lucide-react';

interface DesignStageProps {
  formData: FormQRCodeData;
  onUpdateFormData: (updates: Partial<FormQRCodeData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DesignStage: React.FC<DesignStageProps> = ({
  formData,
  onUpdateFormData,
  onNext,
  onPrevious,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['background']));

  const updateDesignSettings = (updates: any) => {
    onUpdateFormData({
      designSettings: {
        ...formData.designSettings,
        ...updates,
      },
    });
  };

  const updateColors = (colorType: string, color: string) => {
    updateDesignSettings({
      colors: {
        ...formData.designSettings.colors,
        [colorType]: color,
      },
    });
  };

  const updateCardStyle = (updates: any) => {
    updateDesignSettings({
      cardStyle: {
        ...formData.designSettings.cardStyle,
        ...updates,
      },
    });
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      id: 'background',
      label: 'Background',
      icon: <Image size={20} />,
      component: (
        <BackgroundSection
          selectedBackground={formData.designSettings.background}
          onBackgroundChange={(background) => updateDesignSettings({ background })}
        />
      ),
    },
    {
      id: 'colors',
      label: 'Colors',
      icon: <Palette size={20} />,
      component: (
        <ColorSection
          colors={formData.designSettings.colors}
          onColorChange={updateColors}
        />
      ),
    },
    {
      id: 'typography',
      label: 'Typography',
      icon: <Type size={20} />,
      component: (
        <FontSection
          selectedFont={formData.designSettings.font}
          onFontChange={(font) => updateDesignSettings({ font })}
        />
      ),
    },
    {
      id: 'cardstyle',
      label: 'Card Style',
      icon: <Settings size={20} />,
      component: (
        <CardStyleSection
          cardStyle={formData.designSettings.cardStyle}
          onCardStyleChange={updateCardStyle}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Design Sections */}
      {sections.map((section) => (
        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
              expandedSections.has(section.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center space-x-3">
              {section.icon}
              <span className="font-medium text-gray-800">{section.label}</span>
            </div>
            <div className="flex items-center space-x-3">
              {/* Toggle Switch */}
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
              {/* Expand/Collapse Arrow */}
              <span className={`transition-transform ${expandedSections.has(section.id) ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </button>
          
          {expandedSections.has(section.id) && (
            <div className="p-6 border-t border-gray-200 bg-white">
              {section.component}
            </div>
          )}
        </div>
      ))}

      {/* Bottom Actions */}
      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onPrevious} variant="outline" size="lg" className="flex items-center space-x-2">
          <span>←</span>
          <span>Back</span>
        </Button>
        <Button onClick={onNext} size="lg" className="flex items-center space-x-2">
          <span>Next</span>
          <span>→</span>
        </Button>
      </div>
    </div>
  );
};
