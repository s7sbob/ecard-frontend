import React, { useRef } from 'react';
import styled from 'styled-components';

interface BackgroundSettingsProps {
  backgroundImage: string;
  backgroundColor: string;
  onChange: (backgroundImage: string, backgroundColor: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  backgroundImage,
  backgroundColor,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result, backgroundColor);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: string) => {
    onChange(backgroundImage, color);
  };

  return (
    <Container>
      <SectionTitle>Background Image</SectionTitle>
      
      <BackgroundOptions>
        <UploadButton onClick={() => fileInputRef.current?.click()}>
          {backgroundImage ? (
            <PreviewImage src={backgroundImage} alt="Background" />
          ) : (
            <UploadPlaceholder>
              <span>📷</span>
              Upload Image
            </UploadPlaceholder>
          )}
        </UploadButton>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        
        {backgroundImage && (
          <RemoveButton onClick={() => onChange('', backgroundColor)}>
            Remove Image
          </RemoveButton>
        )}
      </BackgroundOptions>

      <ColorSection>
        <SectionTitle>Background Color</SectionTitle>
        <ColorPicker>
          <ColorInput
            type="color"
            value={backgroundColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          <ColorValue>{backgroundColor}</ColorValue>
        </ColorPicker>
      </ColorSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const BackgroundOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UploadButton = styled.button`
  width: 200px;
  height: 120px;
  border: 2px dashed #007bff;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0,123,255,0.05);
    border-color: #0056b3;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #007bff;
  font-weight: 600;
  
  span {
    font-size: 32px;
    margin-bottom: 8px;
  }
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background: #c82333;
  }
`;

const ColorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ColorInput = styled.input`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const ColorValue = styled.span`
  font-family: monospace;
  font-size: 14px;
  color: #666;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
`;

export default BackgroundSettings;
