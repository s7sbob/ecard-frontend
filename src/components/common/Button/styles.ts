import styled from 'styled-components';

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'success' | 'outline';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'padding: 8px 16px; font-size: 14px;';
      case 'large':
        return 'padding: 16px 32px; font-size: 18px;';
      default:
        return 'padding: 12px 24px; font-size: 16px;';
    }
  }}
  
  ${props => {
    if (props.disabled) {
      return `
        opacity: 0.5;
        cursor: not-allowed;
        background: #ccc;
        color: #666;
      `;
    }
    
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #007bff, #0056b3);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,123,255,0.3);
          }
        `;
      case 'secondary':
        return `
          background: #6c757d;
          color: white;
          &:hover {
            background: #5a6268;
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(40,167,69,0.3);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #007bff;
          border: 2px solid #007bff;
          &:hover {
            background: #007bff;
            color: white;
          }
        `;
    }
  }}
`;
