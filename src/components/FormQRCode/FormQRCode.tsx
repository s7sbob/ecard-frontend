// src/components/FormQRCode/FormQRCode.tsx
import React from 'react';
import { useFormQRCode } from '../../hooks/useFormQRCode';
import { StageNavigation } from './components/StageNavigation';
import { MobilePreview } from './components/MobilePreview';
import { ContentStage } from './stages/ContentStage';
import { Button } from '../ui/Button';
import { QRCodeStage } from './stages/QRCodeStage';

export const FormQRCode: React.FC = () => {
  const {
    currentStage,
    formData,
    updateFormData,
    updateProfile,
    updateFormSettings,
    updateFormFields,
    updateQRCodeSettings,
    nextStage,
    previousStage,
    goToStage,
  } = useFormQRCode();

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'content':
        return (
          <ContentStage
            formData={formData}
            onUpdateFormData={updateFormData}
            onUpdateProfile={updateProfile}
            onUpdateFormSettings={updateFormSettings}
            onUpdateFormFields={updateFormFields}
            onNext={nextStage}
          />
        );
      case 'design':
        return <div className="text-center py-20 text-gray-500">Design stage coming soon...</div>;
      case 'qrcode':
        return (
          <QRCodeStage
            qrCodeSettings={formData.qrCodeSettings}
            onUpdateQRCodeSettings={updateQRCodeSettings}
            onPrevious={previousStage}
            onSave={() => console.log('Save QR Code')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Form QR Code</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                https://linko.page/{formData.pageUrl || 'sy9x4abbtauu'}
              </div>
              <Button variant="primary">Save</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <StageNavigation currentStage={currentStage} onStageChange={goToStage} />
        
        {/* Content Layout - مختلف حسب المرحلة */}
        {currentStage === 'qrcode' ? (
          // QR Code Stage - Full Width
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderCurrentStage()}
          </div>
        ) : (
          // Other Stages - Two Column Layout
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderCurrentStage()}
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Mobile Preview</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <MobilePreview formData={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
