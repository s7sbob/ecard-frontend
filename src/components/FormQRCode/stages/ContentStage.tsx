// src/components/FormQRCode/stages/ContentStage.tsx
import React from 'react';
import { FormQRCodeData } from '../types';
import { PageUrlInput } from '../components/PageUrlInput';
import { TemplateSelector } from '../components/TemplateSelector';
import { ProfileSection } from '../components/ProfileSection';
import { FormSection } from '../components/FormSection';
import { Button } from '../../ui/Button';

interface ContentStageProps {
  formData: FormQRCodeData;
  onUpdateFormData: (updates: Partial<FormQRCodeData>) => void;
  onUpdateProfile: (updates: Partial<FormQRCodeData['profile']>) => void;
  onUpdateFormSettings: (updates: Partial<FormQRCodeData['formSettings']>) => void;
  onUpdateFormFields: (fields: FormQRCodeData['formFields']) => void;
  onNext: () => void;
}

export const ContentStage: React.FC<ContentStageProps> = ({
  formData,
  onUpdateFormData,
  onUpdateProfile,
  onUpdateFormSettings,
  onUpdateFormFields,
  onNext,
}) => {
  return (
    <div className="space-y-8">
      <PageUrlInput
        value={formData.pageUrl}
        onChange={(value) => onUpdateFormData({ pageUrl: value })}
      />

      <TemplateSelector
        selectedTemplate={formData.selectedTemplate}
        onTemplateSelect={(templateId) => onUpdateFormData({ selectedTemplate: templateId })}
      />

      <div className="space-y-4">
        <ProfileSection
          profileData={formData.profile}
          onUpdateProfile={onUpdateProfile}
        />

        <FormSection
          formEnabled={formData.formEnabled}
          onToggleForm={(enabled) => onUpdateFormData({ formEnabled: enabled })}
          formSettings={formData.formSettings}
          onUpdateFormSettings={onUpdateFormSettings}
          formFields={formData.formFields}
          onUpdateFormFields={onUpdateFormFields}
        />
      </div>

      <div className="flex justify-end pt-6 border-t">
        <Button onClick={onNext} size="lg">
          Next →
        </Button>
      </div>
    </div>
  );
};
