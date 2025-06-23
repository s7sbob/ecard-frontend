import React, { useRef } from 'react';
import { QRCodeSettings } from '../../../types';
import styled from 'styled-components';

interface QRCustomizerProps {
  data: QRCodeSettings;
  onUpdate: (data: Partial<QRCodeSettings>) => void;
}

const QRCustomizer: React.FC<QRCustomizerProps> = ({ data, onUpdate }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const decorateInputRef = useRef<HTMLInputElement>(null);

  const qrShapes = ['square', 'rounded', 'dots', 'extra-rounded'];
  const preDesigned = ['classic', 'modern', 'minimal', 'artistic'];
  const stickerOptions = ['none', 'scan-me', 'qr-code', 'custom'];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onUpdate({ logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDecorateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onUpdate({ decoratePicture: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <SectionTitle>Customize QR Code</SectionTitle>
      
      <CustomizeGrid>
        <CustomizeSection>
          <SectionLabel>QR SHAPES</SectionLabel>
          <OptionsGrid>
            {qrShapes.map((shape) => (
              <OptionButton
                key={shape}
                isSelected={data.shape === shape}
                onClick={() => onUpdate({ shape })}
              >
                <ShapePreview shape={shape} />
                <OptionLabel>{shape}</OptionLabel>
              </OptionButton>
            ))}
          </OptionsGrid>
        </CustomizeSection>

        <CustomizeSection>
          <SectionLabel>PRE-DESIGNED</SectionLabel>
          <OptionsGrid>
            {preDesigned.map((design) => (
              <OptionButton
                key={design}
                isSelected={data.preDesigned === design}
                onClick={() => onUpdate({ preDesigned: design })}
              >
                <DesignPreview design={design} />
                <OptionLabel>{design}</OptionLabel>
              </OptionButton>
            ))}
          </OptionsGrid>
        </CustomizeSection>

        <CustomizeSection>
          <SectionLabel>STICKERS</SectionLabel>
          <OptionsGrid>
            {stickerOptions.map((sticker) => (
              <OptionButton
                key={sticker}
                isSelected={data.stickers.includes(sticker)}
                onClick={() => {
                  const newStickers = data.stickers.includes(sticker)
                    ? data.stickers.filter(s => s !== sticker)
                    : [...data.stickers, sticker];
                  onUpdate({ stickers: newStickers });
                }}
              >
                <StickerPreview sticker={sticker} />
                <OptionLabel>{sticker}</OptionLabel>
              </OptionButton>
            ))}
          </OptionsGrid>
        </CustomizeSection>

        <CustomizeSection>
          <SectionLabel>COLORS</SectionLabel>
          <ColorSection>
            <ColorItem>
              <ColorLabel>Foreground</ColorLabel>
              <ColorInput
                type="color"
                value={data.colors.foreground}
                onChange={(e) => onUpdate({ 
                  colors: { ...data.colors, foreground: e.target.value }
                })}
              />
            </ColorItem>
            <ColorItem>
              <ColorLabel>Background</ColorLabel>
              <ColorInput
                type="color"
                value={data.colors.background}
                onChange={(e) => onUpdate({ 
                  colors: { ...data.colors, background: e.target.value }
                })}
              />
            </ColorItem>
          </ColorSection>
        </CustomizeSection>

        <CustomizeSection>
          <SectionLabel>LOGO</SectionLabel>
          <UploadSection>
            <UploadButton onClick={() => logoInputRef.current?.click()}>
              {data.logo ? (
                <PreviewImage src={data.logo} alt="Logo" />
              ) : (
                <UploadPlaceholder>
                  <span>📷</span>
                  Upload Logo
                </UploadPlaceholder>
              )}
            </UploadButton>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
          </UploadSection>
        </CustomizeSection>

        <CustomizeSection>
          <SectionLabel>DECORATE PICTURE</SectionLabel>
          <UploadSection>
            <UploadButton onClick={() => decorateInputRef.current?.click()}>
              {data.decoratePicture ? (
                <PreviewImage src={data.decoratePicture} alt="Decoration" />
              ) : (
                <UploadPlaceholder>
                  <span>🎨</span>
                  Upload Picture
                </UploadPlaceholder>
              )}
            </UploadButton>
            <input
              ref={decorateInputRef}
              type="file"
              accept="image/*"
              onChange={handleDecorateUpload}
              style={{ display: 'none' }}
            />
          </UploadSection>
        </CustomizeSection>
      </CustomizeGrid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 3px solid #007bff;
`;

const CustomizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
`;

const CustomizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionLabel = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #007bff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  padding: 15px;
  border: 2px solid ${props => props.isSelected ? '#007bff' : '#e9ecef'};
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  &:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,123,255,0.2);
  }
  
  ${props => props.isSelected && `
    box-shadow: 0 4px 15px rgba(0,123,255,0.3);
    transform: translateY(-2px);
  `}
`;

const ShapePreview = styled.div<{ shape: string }>`
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: ${props => {
    switch (props.shape) {
      case 'rounded': return '8px';
      case 'extra-rounded': return '15px';
      case 'dots': return '50%';
      default: return '2px';
    }
  }};
`;

const DesignPreview = styled.div<{ design: string }>`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: white;
    border-radius: ${props => props.design === 'minimal' ? '50%' : '2px'};
  }
`;

const StickerPreview = styled.div<{ sticker: string }>`
  width: 40px;
  height: 40px;
  background: #f8f9fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  
  &::after {
    content: '${props => {
      switch (props.sticker) {
        case 'scan-me': return '📱';
        case 'qr-code': return '⬜';
        case 'custom': return '🎨';
        default: return '❌';
      }
    }}';
  }
`;

const OptionLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
`;

const ColorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColorLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ColorInput = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadButton = styled.button`
  width: 100px;
  height: 80px;
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
  font-size: 12px;
  
  span {
    font-size: 24px;
    margin-bottom: 4px;
  }
`;

export default QRCustomizer;
