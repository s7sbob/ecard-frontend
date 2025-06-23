import React from 'react';
import styled from 'styled-components';

interface ColorSettingsProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  onChange: (colors: Partial<{ primary: string; secondary: string; text: string }>) => void;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({ colors, onChange }) => {
  const colorOptions = [
    { key: 'primary', label: 'Primary Color', value: colors.primary },
    { key: 'secondary', label: 'Secondary Color', value: colors.secondary },
    { key: 'text', label: 'Text Color', value: colors.text }
  ];

  const handleColorChange = (key: string, value: string) => {
    onChange({ [key]: value });
  };

  return (
    <Container>
      <SectionTitle>Colors</SectionTitle>
      
      <ColorGrid>
        {colorOptions.map((option) => (
          <ColorItem key={option.key}>
            <ColorLabel>{option.label}</ColorLabel>
            <ColorPicker>
              <ColorInput
                type="color"
                value={option.value}
                onChange={(e) => handleColorChange(option.key, e.target.value)}
              />
              <ColorValue>{option.value}</ColorValue>
            </ColorPicker>
          </ColorItem>
        ))}
      </ColorGrid>

      <PresetColors>
        <SectionTitle>Preset Color Schemes</SectionTitle>
        <PresetGrid>
          <PresetScheme onClick={() => onChange({ primary: '#007bff', secondary: '#6c757d', text: '#333333' })}>
            <PresetColor color="#007bff" />
            <PresetColor color="#6c757d" />
            <PresetColor color="#333333" />
          </PresetScheme>
          <PresetScheme onClick={() => onChange({ primary: '#28a745', secondary: '#ffc107', text: '#212529' })}>
            <PresetColor color="#28a745" />
            <PresetColor color="#ffc107" />
            <PresetColor color="#212529" />
          </PresetScheme>
          <PresetScheme onClick={() => onChange({ primary: '#dc3545', secondary: '#6f42c1', text: '#495057' })}>
            <PresetColor color="#dc3545" />
            <PresetColor color="#6f42c1" />
            <PresetColor color="#495057" />
          </PresetScheme>
          <PresetScheme onClick={() => onChange({ primary: '#17a2b8', secondary: '#fd7e14', text: '#343a40' })}>
            <PresetColor color="#17a2b8" />
            <PresetColor color="#fd7e14" />
            <PresetColor color="#343a40" />
          </PresetScheme>
        </PresetGrid>
      </PresetColors>
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

const ColorGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ColorItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
`;

const ColorLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorInput = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ColorValue = styled.span`
  font-family: monospace;
  font-size: 12px;
  color: #666;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
`;

const PresetColors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const PresetScheme = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,123,255,0.2);
  }
`;

const PresetColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export default ColorSettings;
