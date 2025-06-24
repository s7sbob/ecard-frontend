// src/components/FormQRCode/components/ComponentToggle.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ComponentToggleProps {
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  expanded?: boolean;
  onExpandToggle?: () => void;
}

export const ComponentToggle: React.FC<ComponentToggleProps> = ({
  label,
  enabled,
  onToggle,
  icon,
  children,
  expanded = false,
  onExpandToggle,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <div className="flex items-center space-x-3">
          {icon && <div className="text-gray-500">{icon}</div>}
          <span className="font-medium text-gray-800">{label}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Toggle Switch */}
          <button
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
              ${enabled ? 'bg-blue-600' : 'bg-gray-300'}
            `}
            onClick={() => onToggle(!enabled)}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                ${enabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
          
          {/* Expand/Collapse Button - Only show when enabled */}
          {enabled && onExpandToggle && (
            <button
              onClick={onExpandToggle}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Content - Only show when enabled AND expanded */}
      {enabled && expanded && children && (
        <div className="p-4 bg-white border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};
