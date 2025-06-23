import React from 'react';
import { Container, Step, StepNumber, StepLabel, Connector } from './styles';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Content' },
    { number: 2, label: 'Design / Settings' },
    { number: 3, label: 'QR Code' }
  ];

  return (
    <Container>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <Step isActive={currentStep === step.number} isCompleted={currentStep > step.number}>
            <StepNumber isActive={currentStep === step.number} isCompleted={currentStep > step.number}>
              {currentStep > step.number ? '✓' : step.number}
            </StepNumber>
            <StepLabel isActive={currentStep === step.number}>
              {step.label}
            </StepLabel>
          </Step>
          {index < steps.length - 1 && (
            <Connector isCompleted={currentStep > step.number} />
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default StepIndicator;
