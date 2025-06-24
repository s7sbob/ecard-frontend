// src/components/FormQRCode/components/StageNavigation.tsx
import React from 'react';
import { Stage } from '../types';

interface StageNavigationProps {
  currentStage: Stage;
  onStageChange: (stage: Stage) => void;
}

export const StageNavigation: React.FC<StageNavigationProps> = ({
  currentStage,
  onStageChange,
}) => {
  const stages = [
    { key: 'content' as Stage, label: 'Content', number: 1 },
    { key: 'design' as Stage, label: 'Design / Settings', number: 2 },
    { key: 'qrcode' as Stage, label: 'QR Code', number: 3 },
  ];

  return (
    <div className="flex items-center space-x-4 mb-8">
      {stages.map((stage, index) => (
        <React.Fragment key={stage.key}>
          <div
            className={`
              flex items-center cursor-pointer transition-all duration-200
              ${currentStage === stage.key ? 'text-blue-600' : 'text-gray-400'}
            `}
            onClick={() => onStageChange(stage.key)}
          >
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2
                ${currentStage === stage.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {stage.number}
            </div>
            <span className="font-medium">{stage.label}</span>
          </div>
          {index < stages.length - 1 && (
            <div className="w-8 h-0.5 bg-gray-200"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
