import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #007bff;
  display: inline-block;
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007bff;
    box-shadow: 0 4px 15px rgba(0,123,255,0.1);
  }
`;

export const SettingLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const StyleManagement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
`;

interface StyleButtonProps {
  variant: 'primary' | 'secondary';
}

export const StyleButton = styled.button<StyleButtonProps>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' 
    ? `
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,123,255,0.3);
      }
    `
    : `
      background: #6c757d;
      color: white;
      &:hover {
        background: #5a6268;
        transform: translateY(-1px);
      }
    `
  }
`;

export const CustomCSSSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
  
  &::placeholder {
    color: #6c757d;
  }
`;
