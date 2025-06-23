import React, { useState } from 'react';
import { FormQRCodeData, StepType } from '../../types';
import StepIndicator from '../common/StepIndicator';
import Step1Content from './Step1Content';
import Step2Design from './Step2Design';
import Step3QRCode from './Step3QRCode';
import { Container, Header, Content, Navigation, NavButton } from './styles';

const FormQRCode: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [formData, setFormData] = useState<FormQRCodeData>({
    content: {
      pageUrl: '',
      selectedTemplate: '',
      profileEnabled: true,
      formEnabled: true,
      components: []
    },
    design: {
      backgroundImage: '',
      backgroundColor: '#ffffff',
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        text: '#333333'
      },
      fontStyle: 'Arial',
      cardStyle: 'modern',
      pageLoader: false,
      passcodeProtection: false
    },
    qrCode: {
      shape: 'square',
      preDesigned: '',
      stickers: [],
      colors: {
        foreground: '#000000',
        background: '#ffffff'
      }
    }
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as StepType);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepType);
    }
  };

  const updateFormData = (section: keyof FormQRCodeData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Content
            data={formData.content}
            onUpdate={(data) => updateFormData('content', data)}
          />
        );
      case 2:
        return (
          <Step2Design
            data={formData.design}
            onUpdate={(data) => updateFormData('design', data)}
          />
        );
      case 3:
        return (
          <Step3QRCode
            data={formData.qrCode}
            formData={formData}
            onUpdate={(data) => updateFormData('qrCode', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <h1>Create Form QR Code</h1>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </Header>
      
      <Content>
        {renderCurrentStep()}
      </Content>

      <Navigation>
        {currentStep > 1 && (
          <NavButton variant="secondary" onClick={handleBack}>
            Back
          </NavButton>
        )}
        {currentStep < 3 ? (
          <NavButton variant="primary" onClick={handleNext}>
            Next
          </NavButton>
        ) : (
          <NavButton variant="success">
            Save & Download
          </NavButton>
        )}
      </Navigation>
    </Container>
  );
};

export default FormQRCode;
