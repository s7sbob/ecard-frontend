import React from 'react';
import { ToggleContainer, ToggleInput, ToggleSlider } from './styles';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <ToggleSlider checked={checked} disabled={disabled} />
    </ToggleContainer>
  );
};

export default Toggle;
