// src/components/FormQRCode/types/index.ts
import React from 'react';

export interface ProfileData {
  enabled: boolean;
  brandLogo: {
    enabled: boolean;
    file?: File;
    url?: string;
  };
  name: string;
  heading: string;
  subHeading: string;
  connectIcons: boolean;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
    phone?: string;
    email?: string;
  };
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder: string;
  required: boolean;
  enabled: boolean;
  errorMessage: string;
  icon: React.ReactNode;
}

export interface FormSettings {
  name: string;
  type: 'overlay' | 'inline';
  preventMultipleSubmissions: boolean;
  headerImage: {
    enabled: boolean;
    file?: File;
    url?: string;
  };
  title: {
    enabled: boolean;
    text: string;
  };
  description: {
    enabled: boolean;
    text: string;
  };
  termsAndPrivacy: {
    enabled: boolean;
    label: string;
  };
  buttonLabel: string;
  completionMessage: {
    type: 'toast' | 'popup';
    description: string;
  };
  integrations: {
    invokeAPI: boolean;
    invokeSMS: boolean;
  };
  emailNotification: boolean;
  cardBackground: boolean;
}

export interface FormQRCodeData {
  pageUrl: string;
  selectedTemplate: number;
  profile: ProfileData;
  formEnabled: boolean;
  formSettings: FormSettings;
  formFields: FormField[];
  designSettings: DesignSettings; // إضافة هذا
  qrCodeSettings: QRCodeSettings;
}

export interface Template {
  id: number;
  name: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}


export interface ProfileData {
  enabled: boolean;
  brandLogo: {
    enabled: boolean;
    file?: File;
    url?: string;
  };
  name: string;
  heading: string;
  subHeading: string;
  connectIcons: boolean;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
    phone?: string;
    email?: string;
  };
}


export interface FormSettings {
  name: string;
  type: 'overlay' | 'inline';
  preventMultipleSubmissions: boolean;
  headerImage: {
    enabled: boolean;
    file?: File;
    url?: string;
  };
  title: {
    enabled: boolean;
    text: string;
  };
  description: {
    enabled: boolean;
    text: string;
  };
  termsAndPrivacy: {
    enabled: boolean;
    label: string;
  };
  buttonLabel: string;
  completionMessage: {
    type: 'toast' | 'popup';
    description: string;
  };
  integrations: {
    invokeAPI: boolean;
    invokeSMS: boolean;
  };
  emailNotification: boolean;
  cardBackground: boolean;
}

export interface QRCodeSettings {
  value: string;
  size: number;
  bgColor: string;
  fgColor: string;
  logoImage?: string;
  logoSize: number;
  logoOpacity: number;
  qrStyle: 'squares' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'; // تحديث هذا
  eyeRadius: number;
  eyeColor: string;
  frameStyle: string;
  qrAreaPath?: string; // مسار منطقة الـ QR code المحددة
  frameColor: string;
  frameText: string;
  shapeSvg?: string;
  qrAreaBounds?: { x: number; y: number; width: number; height: number };
  noisePattern?: 'dots' | 'lines' | 'squares' | 'circles';
  noiseIntensity?: number;
  gradientType: 'none' | 'linear' | 'radial';
  gradientColors: string[];
  framePath?: string;       // ex: '/assets/qr-frames/star.svg'
}

export interface FormQRCodeData {
  pageUrl: string;
  selectedTemplate: number;
  profile: ProfileData;
  formEnabled: boolean;
  formSettings: FormSettings;
  formFields: FormField[];
  qrCodeSettings: QRCodeSettings;
}

export interface Template {
  id: number;
  name: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export type Stage = 'content' | 'design' | 'qrcode';



export interface DesignSettings {
  background: string;
  colors: {
    primary: string;
    secondary: string;
    primaryText: string;
    secondaryText: string;
    bodyText: string;
  };
  font: string;
  cardStyle: {
    background: boolean;
    backgroundColor: string;
    cornerRadius: number;
    shadow: {
      color: string;
      x: number;
      y: number;
      blur: number;
      spread: number;
    };
  };
}
