// src/components/FormQRCode/utils/iconHelper.tsx
import React from 'react';
import { User, Mail, Phone, MessageSquare, Building } from 'lucide-react';

export const getFieldIcon = (iconName: string, size: number = 16) => {
  switch (iconName) {
    case 'user':
      return <User size={size} />;
    case 'mail':
      return <Mail size={size} />;
    case 'phone':
      return <Phone size={size} />;
    case 'message':
      return <MessageSquare size={size} />;
    case 'building':
      return <Building size={size} />;
    default:
      return <User size={size} />;
  }
};
