import styled from 'styled-components';

export const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

interface ToggleSliderProps {
  checked: boolean;
  disabled?: boolean;
}

export const ToggleSlider = styled.span<ToggleSliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#007bff' : '#ccc'};
  transition: 0.4s;
  border-radius: 34px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: ${props => props.checked ? '30px' : '4px'};
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  &:hover {
    box-shadow: 0 0 10px rgba(0,123,255,0.3);
  }
`;
