import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #007bff;
  display: inline-block;
`;

export const URLSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const URLContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

export const URLPrefix = styled.span`
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 16px;
`;

export const URLInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 20px;
  font-size: 16px;
  background: transparent;
  
  &::placeholder {
    color: #6c757d;
  }
`;

export const MinCharNote = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  font-style: italic;
`;

export const TemplateSection = styled.div`
  width: 100%;
`;

export const ComponentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AddComponentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border: 2px dashed #007bff;
  background: transparent;
  border-radius: 12px;
  color: #007bff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  span {
    font-size: 24px;
    font-weight: bold;
  }
  
  &:hover {
    background: rgba(0,123,255,0.05);
    border-color: #0056b3;
    transform: translateY(-2px);
  }
`;
