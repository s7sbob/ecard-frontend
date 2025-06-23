import React from 'react';
import { QRCodeSettings, FormQRCodeData } from '../../../types';
import QRCustomizer from './QRCustomizer';
import QRPreview from './QRPreview';
import { Container, QRGrid, PreviewSection, CustomizerSection } from './styles';

interface Step3QRCodeProps {
  data: QRCodeSettings;
  formData: FormQRCodeData;
  onUpdate: (data: Partial<QRCodeSettings>) => void;
}

const Step3QRCode: React.FC<Step3QRCodeProps> = ({ data, formData, onUpdate }) => {
  return (
    <Container>
      <QRGrid>
        <PreviewSection>
          <QRPreview qrSettings={data} formData={formData} />
        </PreviewSection>
        
        <CustomizerSection>
          <QRCustomizer data={data} onUpdate={onUpdate} />
        </CustomizerSection>
      </QRGrid>
    </Container>
  );
};

export default Step3QRCode;
