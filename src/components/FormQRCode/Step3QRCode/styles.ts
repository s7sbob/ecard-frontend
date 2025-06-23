import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const QRGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const CustomizerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
