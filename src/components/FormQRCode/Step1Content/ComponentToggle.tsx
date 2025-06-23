import React from 'react';
import Toggle from '../../common/Toggle';
import styled from 'styled-components';

interface ComponentToggleProps {
  type: 'profile' | 'form';
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ComponentToggle: React.FC<ComponentToggleProps> = ({
  type,
  label,
  enabled,
  onToggle
}) => {
  return (
    <Container>
      <ComponentInfo>
        <ComponentIcon type={type}>
          {type === 'profile' ? '👤' : '📝'}
        </ComponentIcon>
        <ComponentLabel>{label}</ComponentLabel>
      </ComponentInfo>
      <Toggle checked={enabled} onChange={onToggle} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007bff;
    box-shadow: 0 4px 15px rgba(0,123,255,0.1);
  }
`;

const ComponentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ComponentIcon = styled.div<{ type: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${props => props.type === 'profile' 
    ? 'linear-gradient(45deg, #007bff, #0056b3)' 
    : 'linear-gradient(45deg, #28a745, #20c997)'};
  box-shadow: 0 4px 15px ${props => props.type === 'profile' 
    ? 'rgba(0,123,255,0.3)' 
    : 'rgba(40,167,69,0.3)'};
`;

const ComponentLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export default ComponentToggle;
