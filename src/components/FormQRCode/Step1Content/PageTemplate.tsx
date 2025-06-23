import React from 'react';
import styled from 'styled-components';

interface PageTemplateProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
}

const templates = [
  {
    id: 'teamwork',
    name: 'Teamwork co.',
    preview: '/api/placeholder/200/150',
    colors: ['#007bff', '#28a745', '#ffc107']
  },
  {
    id: 'r-homes',
    name: 'R-Homes',
    preview: '/api/placeholder/200/150',
    colors: ['#dc3545', '#6f42c1', '#fd7e14']
  },
  {
    id: 'gv-bakery',
    name: 'GV-Bakery',
    preview: '/api/placeholder/200/150',
    colors: ['#e83e8c', '#20c997', '#6c757d']
  },
  {
    id: 'soltech',
    name: 'SolTech',
    preview: '/api/placeholder/200/150',
    colors: ['#17a2b8', '#28a745', '#ffc107']
  }
];

const PageTemplate: React.FC<PageTemplateProps> = ({ selectedTemplate, onSelect }) => {
  return (
    <TemplateGrid>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          isSelected={selectedTemplate === template.id}
          onClick={() => onSelect(template.id)}
        >
          <TemplatePreview>
            <PreviewImage src={template.preview} alt={template.name} />
            <ColorPalette>
              {template.colors.map((color, index) => (
                <ColorDot key={index} color={color} />
              ))}
            </ColorPalette>
          </TemplatePreview>
          <TemplateName>{template.name}</TemplateName>
          {selectedTemplate === template.id && <SelectedIndicator>✓</SelectedIndicator>}
        </TemplateCard>
      ))}
    </TemplateGrid>
  );
};

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 10px;
`;

const TemplateCard = styled.div<{ isSelected: boolean }>`
  border: 3px solid ${props => props.isSelected ? '#007bff' : '#e9ecef'};
  border-radius: 16px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  
  &:hover {
    border-color: #007bff;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,123,255,0.2);
  }
  
  ${props => props.isSelected && `
    box-shadow: 0 10px 30px rgba(0,123,255,0.3);
    transform: translateY(-5px);
  `}
`;

const TemplatePreview = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.color};
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TemplateName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #28a745, #20c997);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(40,167,69,0.3);
`;

export default PageTemplate;
