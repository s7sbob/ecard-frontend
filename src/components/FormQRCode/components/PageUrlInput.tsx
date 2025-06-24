// src/components/FormQRCode/components/PageUrlInput.tsx
import React from 'react';
import { Input } from '../../ui/Input';

interface PageUrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PageUrlInput: React.FC<PageUrlInputProps> = ({ value, onChange }) => {
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.length < 5) {
      setError('Minimum 5 characters required');
    } else {
      setError('');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Your Page URL
        <span className="text-sm font-normal text-gray-500 ml-2">
          (Once saved, cannot be changed later)
        </span>
      </h3>
      <Input
        prefix="linko.page/"
        value={value}
        onChange={handleChange}
        placeholder="sy9x4abbtauu"
        error={error}
      />
      <p className="text-xs text-gray-500 mt-1">*minimum 5 characters required</p>
    </div>
  );
};
