import React, { useEffect, useRef, useState } from 'react';
import { QRCodeSettings, FormQRCodeData } from '../../../types';
import { generateQRCode } from '../../../utils/qrGenerator';
import Button from '../../common/Button';
import styled from 'styled-components';

interface QRPreviewProps {
  qrSettings: QRCodeSettings;
  formData: FormQRCodeData;
}

const QRPreview: React.FC<QRPreviewProps> = ({ qrSettings, formData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateQR();
  }, [qrSettings, formData]);

  const generateQR = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const url = `https://linko.page/${formData.content.pageUrl}`;
      const dataURL = await generateQRCode(url, qrSettings, canvasRef.current);
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (qrDataURL) {
      const link = document.createElement('a');
      link.download = `qr-code-${formData.content.pageUrl || 'form'}.png`;
      link.href = qrDataURL;
      link.click();
    }
  };

  const handleSave = () => {
    // Save functionality - could integrate with backend
    console.log('Saving QR Code configuration:', { qrSettings, formData });
  };

  return (
    <Container>
      <PreviewTitle>QR Code Preview</PreviewTitle>
      
      <PreviewContainer>
        {isGenerating ? (
          <LoadingSpinner>
            <Spinner />
            <LoadingText>Generating QR Code...</LoadingText>
          </LoadingSpinner>
        ) : (
          <QRContainer>
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
            {qrDataURL && (
              <QRImage src={qrDataURL} alt="Generated QR Code" />
            )}
          </QRContainer>
        )}
      </PreviewContainer>

      <InfoSection>
        <InfoItem>
          <InfoLabel>URL:</InfoLabel>
          <InfoValue>linko.page/{formData.content.pageUrl}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Template:</InfoLabel>
          <InfoValue>{formData.content.selectedTemplate || 'None'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Components:</InfoLabel>
          <InfoValue>
            {formData.content.profileEnabled && 'Profile '}
            {formData.content.formEnabled && 'Form'}
          </InfoValue>
        </InfoItem>
      </InfoSection>

      <ActionButtons>
        <Button variant="secondary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="success" onClick={handleDownload}>
          Save & Download
        </Button>
      </ActionButtons>

      <TestSection>
        <TestTitle>Test Your QR Code</TestTitle>
        <TestInstructions>
          Scan the QR code with your phone camera to test the functionality
        </TestInstructions>
      </TestSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 2px solid #e9ecef;
`;

const PreviewTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;
`;

const PreviewContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border: 3px solid #e9ecef;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-weight: 600;
`;

const QRContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const QRImage = styled.img`
  max-width: 250px;
  max-height: 250px;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 15px;
  background: white;
  border-radius: 12px;
  border: 2px solid #e9ecef;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #6c757d;
  text-align: right;
  max-width: 200px;
  word-break: break-all;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const TestSection = styled.div`
  text-align: center;
  padding: 15px;
  background: linear-gradient(45deg, #e3f2fd, #f3e5f5);
  border-radius: 12px;
  border: 2px solid #e1bee7;
`;

const TestTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`;

const TestInstructions = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
`;

export default QRPreview;
