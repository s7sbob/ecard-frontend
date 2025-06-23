import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
}

export const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const StepNumber = styled.div<StepProps>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.isCompleted) {
      return `
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        box-shadow: 0 4px 15px rgba(40,167,69,0.3);
      `;
    } else if (props.isActive) {
      return `
        background: linear-gradient(45deg, #007bff, #0056b3);
        color: white;
        box-shadow: 0 4px 15px rgba(0,123,255,0.3);
        transform: scale(1.1);
      `;
    } else {
      return `
        background: rgba(255,255,255,0.3);
        color: rgba(255,255,255,0.7);
        border: 2px solid rgba(255,255,255,0.3);
      `;
    }
  }}
`;

export const StepLabel = styled.span<{ isActive: boolean }>`
  margin-top: 10px;
  font-size: 14px;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? 'white' : 'rgba(255,255,255,0.8)'};
  text-align: center;
  min-width: 100px;
`;

export const Connector = styled.div<{ isCompleted: boolean }>`
  width: 80px;
  height: 3px;
  margin: 0 10px;
  border-radius: 2px;
  transition: all 0.3s ease;
  
  ${props => props.isCompleted 
    ? 'background: linear-gradient(45deg, #28a745, #20c997);'
    : 'background: rgba(255,255,255,0.3);'
  }
`;
