// src/components/FormQRCode/components/TemplateSelector.tsx
import React from 'react';
import { Template } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onTemplateSelect: (templateId: number) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  const templates: Template[] = [
    {
      id: 0,
      name: 'Teamwork Co.',
      preview: '/templates/teamwork.png',
      colors: { primary: '#1f2937', secondary: '#f59e0b', background: '#1f2937' },
    },
    {
      id: 1,
      name: 'R-Homes',
      preview: '/templates/rhomes.png',
      colors: { primary: '#7c2d12', secondary: '#ea580c', background: '#7c2d12' },
    },
    {
      id: 2,
      name: 'Sky Bakery',
      preview: '/templates/skybakery.png',
      colors: { primary: '#dc2626', secondary: '#f59e0b', background: '#dc2626' },
    },
    {
      id: 3,
      name: 'SciTech',
      preview: '/templates/scitech.png',
      colors: { primary: '#0ea5e9', secondary: '#06b6d4', background: '#0ea5e9' },
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Page Template
        <span className="text-sm font-normal text-gray-500 ml-2">
          (Click on the template you like)
        </span>
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
              ${selectedTemplate === template.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onTemplateSelect(template.id)}
          >
            <div
              className="h-32 flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: template.colors.background }}
            >
              <div className="text-center">
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: template.colors.secondary }}
                >
                  T
                </div>
                <div>{template.name}</div>
                <div className="text-xs opacity-75">Design Agency</div>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
