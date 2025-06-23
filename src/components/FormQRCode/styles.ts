import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;

export const Content = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  min-height: 600px;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

interface NavButtonProps {
  variant: 'primary' | 'secondary' | 'success';
}

export const NavButton = styled.button<NavButtonProps>`
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #007bff, #0056b3);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,123,255,0.3);
          }
        `;
      case 'secondary':
        return `
          background: #6c757d;
          color: white;
          &:hover {
            background: #5a6268;
            transform: translateY(-2px);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(45deg, #28a745, #20c997);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(40,167,69,0.3);
          }
        `;
    }
  }}
`;
