// src/hooks/useFormQRCode.ts
import { useState } from 'react';
import { FormQRCodeData, Stage, ProfileData, FormSettings, FormField, QRCodeSettings, DesignSettings } from '../components/FormQRCode/types';

export const useFormQRCode = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('content');
  
  const getDefaultFormFields = (): FormField[] => [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Your Name',
      required: true,
      enabled: true,
      errorMessage: 'Name is required',
      icon: 'user',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Your Email',
      required: true,
      enabled: true,
      errorMessage: 'Valid email is required',
      icon: 'mail',
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone',
      placeholder: 'Your Phone',
      required: false,
      enabled: true,
      errorMessage: 'Valid phone number is required',
      icon: 'phone',
    },
    {
      id: 'company',
      type: 'text',
      label: 'Company',
      placeholder: 'Your Company',
      required: false,
      enabled: false,
      errorMessage: 'Company name is required',
      icon: 'building',
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Your Message',
      required: false,
      enabled: false,
      errorMessage: 'Message is required',
      icon: 'message',
    },
  ];

  const getDefaultDesignSettings = (): DesignSettings => ({
    background: '',
    colors: {
      primary: '#1f2937',
      secondary: '#f59e0b',
      primaryText: '#FFFFFF',
      secondaryText: '#FFFFFF',
      bodyText: '#000000',
    },
    font: 'system-ui, sans-serif',
    cardStyle: {
      background: true,
      backgroundColor: '#FFFFFF',
      cornerRadius: 12,
      shadow: {
        color: '#00000020',
        x: 0,
        y: 4,
        blur: 12,
        spread: 0,
      },
    },
  });

  const [formData, setFormData] = useState<FormQRCodeData>({
    pageUrl: '',
    selectedTemplate: 0,
    profile: {
      enabled: true,
      brandLogo: {
        enabled: false,
        file: undefined,
        url: undefined,
      },
      name: 'Teamwork co.',
      heading: 'Design Agency',
      subHeading: '',
      connectIcons: false,
      socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        website: '',
        phone: '',
        email: '',
      },
    },
    formEnabled: true,
    formSettings: {
      name: 'Contact Us',
      type: 'overlay',
      preventMultipleSubmissions: false,
      headerImage: {
        enabled: false,
        file: undefined,
        url: undefined,
      },
      title: {
        enabled: true,
        text: 'Contact Us',
      },
      description: {
        enabled: true,
        text: 'Any question or remark? Just write a message!',
      },
      termsAndPrivacy: {
        enabled: true,
        label: 'I agree to Terms and Privacy Policy',
      },
      buttonLabel: 'Submit',
      completionMessage: {
        type: 'toast',
        description: 'Thank you for your response.',
      },
      integrations: {
        invokeAPI: false,
        invokeSMS: false,
      },
      emailNotification: false,
      cardBackground: true,
    },
    formFields: getDefaultFormFields(),
    qrCodeSettings: {
      value: 'https://linko.page/sy9x4abbtauu',
      size: 300,
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      logoImage: '',
      logoSize: 50,
      logoOpacity: 1,
      qrStyle: 'squares',
      eyeRadius: 0,
      eyeColor: '#000000',
      frameStyle: 'beer-mug',
      frameColor: '#000000',
      frameText: '',
      gradientType: 'none',
      gradientColors: ['#000000', '#FFFFFF'],
    },
    designSettings: getDefaultDesignSettings(),
  });

  const updateFormData = (updates: Partial<FormQRCodeData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateProfile = (updates: Partial<ProfileData>) => {
    setFormData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
  };

  const updateFormSettings = (updates: Partial<FormSettings>) => {
    setFormData(prev => ({
      ...prev,
      formSettings: { ...prev.formSettings, ...updates }
    }));
  };

  const updateFormFields = (fields: FormField[]) => {
    setFormData(prev => ({
      ...prev,
      formFields: fields
    }));
  };

  const updateQRCodeSettings = (updates: Partial<QRCodeSettings>) => {
    setFormData(prev => ({
      ...prev,
      qrCodeSettings: { ...prev.qrCodeSettings, ...updates }
    }));
  };

  const updateDesignSettings = (updates: Partial<DesignSettings>) => {
    setFormData(prev => ({
      ...prev,
      designSettings: { ...prev.designSettings, ...updates }
    }));
  };

  const nextStage = () => {
    const stages: Stage[] = ['content', 'design', 'qrcode'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  const previousStage = () => {
    const stages: Stage[] = ['content', 'design', 'qrcode'];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1]);
    }
  };

  const goToStage = (stage: Stage) => {
    setCurrentStage(stage);
  };

  const canProceedToNext = () => {
    switch (currentStage) {
      case 'content':
        return formData.pageUrl.length >= 5;
      case 'design':
        return true;
      case 'qrcode':
        return true;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setFormData({
      pageUrl: '',
      selectedTemplate: 0,
      profile: {
        enabled: true,
        brandLogo: {
          enabled: false,
          file: undefined,
          url: undefined,
        },
        name: 'Teamwork co.',
        heading: 'Design Agency',
        subHeading: '',
        connectIcons: false,
        socialLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          website: '',
          phone: '',
          email: '',
        },
      },
      formEnabled: true,
      formSettings: {
        name: 'Contact Us',
        type: 'overlay',
        preventMultipleSubmissions: false,
        headerImage: {
          enabled: false,
          file: undefined,
          url: undefined,
        },
        title: {
          enabled: true,
          text: 'Contact Us',
        },
        description: {
          enabled: true,
          text: 'Any question or remark? Just write a message!',
        },
        termsAndPrivacy: {
          enabled: true,
          label: 'I agree to Terms and Privacy Policy',
        },
        buttonLabel: 'Submit',
        completionMessage: {
          type: 'toast',
          description: 'Thank you for your response.',
        },
        integrations: {
          invokeAPI: false,
          invokeSMS: false,
        },
        emailNotification: false,
        cardBackground: true,
      },
      formFields: getDefaultFormFields(),
qrCodeSettings: {
  value: 'https://linko.page/sy9x4abbtauu',
  size: 300,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  logoImage: '',
  logoSize: 50,
  logoOpacity: 1,
  qrStyle: 'squares',
  eyeRadius: 0,
  eyeColor: '#000000',
  frameStyle: 'fish', // قيمة افتراضية
  frameColor: '#000000',
  frameText: '',
  gradientType: 'none',
  gradientColors: ['#000000', '#FFFFFF'],
},
      designSettings: getDefaultDesignSettings(),
    });
    setCurrentStage('content');
  };

  return {
    currentStage,
    formData,
    updateFormData,
    updateProfile,
    updateFormSettings,
    updateFormFields,
    updateQRCodeSettings,
    updateDesignSettings, // إضافة هذا
    nextStage,
    previousStage,
    goToStage,
    canProceedToNext,
    resetForm,
  };
};
