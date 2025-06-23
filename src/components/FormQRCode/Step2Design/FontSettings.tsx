import React from 'react';
import styled from 'styled-components';

interface FontSettingsProps {
  fontStyle: string;
  onChange: (fontStyle: string) => void;
}

const fontOptions = [
  { value: 'Arial', label: 'Arial', preview: 'The quick brown fox' },
  { value: 'Helvetica', label: 'Helvetica', preview: 'The quick brown fox' },
  { value: 'Times New Roman', label: 'Times New Roman', preview: 'The quick brown fox' },
  { value: 'Georgia', label: 'Georgia', preview: 'The quick brown fox' },
  { value: 'Verdana', label: 'Verdana', preview: 'The quick brown fox' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS', preview: 'The quick brown fox' },
  { value: 'Impact', label: 'Impact', preview: 'The quick brown fox' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS', preview: 'The quick brown fox' }
];

const FontSettings: React.FC<FontSettingsProps> = ({ fontStyle, onChange }) => {
  return (
    <Container>
      <SectionTitle>Font Style</SectionTitle>
      
      <FontGrid>
        {fontOptions.map((font) => (
          <FontOption
            key={font.value}
            isSelected={fontStyle === font.value}
            onClick={() => onChange(font.value)}
          >
            <FontName fontFamily={font.value}>{font.label}</FontName>
            <FontPreview fontFamily={font.value}>{font.preview}</FontPreview>
            {fontStyle === font.value && <SelectedIndicator>✓</SelectedIndicator>}
          </FontOption>
        ))}
      </FontGrid>
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

const FontGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const FontOption = styled.div<{ isSelected: boolean }>`
  padding: 15px;
  border: 2px solid ${props => props.isSelected ? '#007bff' : '#e9ecef'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  
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

const FontName = styled.div<{ fontFamily: string }>`
  font-family: ${props => props.fontFamily};
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const FontPreview = styled.div<{ fontFamily: string }>`
  font-family: ${props => props.fontFamily};
  font-size: 14px;
  color: #666;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  background: linear-gradient(45deg, #28a745, #20c997);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(40,167,69,0.3);
`;

export default FontSettings;
