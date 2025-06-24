// src/components/FormQRCode/components/MobilePreview.tsx
import React from 'react';
import { FormQRCodeData } from '../types';
import { Facebook, Instagram, Linkedin, Globe, Phone, Mail, MessageSquare, User, Building } from 'lucide-react';

interface MobilePreviewProps {
  formData: FormQRCodeData;
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({ formData }) => {
  const templates = [
    { colors: { primary: '#1f2937', secondary: '#f59e0b', background: '#1f2937' } },
    { colors: { primary: '#7c2d12', secondary: '#ea580c', background: '#7c2d12' } },
    { colors: { primary: '#dc2626', secondary: '#f59e0b', background: '#dc2626' } },
    { colors: { primary: '#0ea5e9', secondary: '#06b6d4', background: '#0ea5e9' } },
  ];

  const selectedTemplateColors = templates[formData.selectedTemplate]?.colors || templates[0].colors;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook size={16} className="text-white" />;
      case 'instagram': return <Instagram size={16} className="text-white" />;
      case 'linkedin': return <Linkedin size={16} className="text-white" />;
      case 'website': return <Globe size={16} className="text-white" />;
      case 'phone': return <Phone size={16} className="text-white" />;
      case 'email': return <Mail size={16} className="text-white" />;
      default: return null;
    }
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text': return <User size={14} className="text-gray-400" />;
      case 'email': return <Mail size={14} className="text-gray-400" />;
      case 'phone': return <Phone size={14} className="text-gray-400" />;
      case 'textarea': return <MessageSquare size={14} className="text-gray-400" />;
      case 'select': return <Building size={14} className="text-gray-400" />;
      default: return <User size={14} className="text-gray-400" />;
    }
  };

  const activeSocialLinks = Object.entries(formData.profile.socialLinks)
    .filter(([_, url]) => url && url.trim() !== '');

  const enabledFormFields = formData.formFields.filter(field => field.enabled);

  return (
    <div className="w-80 mx-auto">
      <div className="bg-black rounded-3xl p-4 shadow-2xl">
        <div className="bg-white rounded-2xl overflow-hidden h-[600px] overflow-y-auto">
          
          {/* Header/Profile Section - يظهر فقط إذا كان Profile مفعل */}
          {formData.profile.enabled && (
            <div
              className="relative flex flex-col items-center justify-center text-white p-6"
              style={{ backgroundColor: selectedTemplateColors.background }}
            >
              {/* Brand Logo */}
              {formData.profile.brandLogo.enabled && formData.profile.brandLogo.url ? (
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white">
                  <img
                    src={formData.profile.brandLogo.url}
                    alt="Brand Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3"
                  style={{ backgroundColor: selectedTemplateColors.secondary }}
                >
                  {formData.profile.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <h1 className="text-xl font-bold text-center">{formData.profile.name}</h1>
              <p className="text-sm opacity-90 text-center">{formData.profile.heading}</p>
              {formData.profile.subHeading && (
                <p className="text-xs opacity-75 text-center mt-1">{formData.profile.subHeading}</p>
              )}

              {/* Social Icons - يظهر فقط إذا كان Connect Icons مفعل */}
              {formData.profile.connectIcons && activeSocialLinks.length > 0 && (
                <div className="flex space-x-3 mt-4">
                  {activeSocialLinks.map(([platform, _]) => (
                    <div
                      key={platform}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer"
                    >
                      {getSocialIcon(platform)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Form Section - يظهر فقط إذا كان Form مفعل */}
            {formData.formEnabled && (
              <div className={`${formData.formSettings.cardBackground ? 'bg-white border' : 'bg-transparent'} rounded-lg p-4`}>
                {/* Header Image */}
                {formData.formSettings.headerImage.enabled && formData.formSettings.headerImage.url && (
                  <div className="mb-4">
                    <img
                      src={formData.formSettings.headerImage.url}
                      alt="Form Header"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Form Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                {formData.formSettings.title.enabled && (
                  <h2 className="text-lg font-bold text-center mb-2">
                    {formData.formSettings.title.text}
                  </h2>
                )}
                
                {formData.formSettings.description.enabled && (
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {formData.formSettings.description.text}
                  </p>
                )}
                
                {/* Contact Icons */}
                <div className="flex justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Form Fields Preview */}
                <div className="space-y-3">
                  {enabledFormFields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getFieldIcon(field.type)}
                        <div className="text-xs text-gray-500">
                          {field.label} {field.required && '*'}
                        </div>
                      </div>
                      {field.type === 'textarea' ? (
                        <div className="h-16 bg-gray-100 rounded border"></div>
                      ) : field.type === 'select' ? (
                        <div className="h-8 bg-gray-100 rounded border flex items-center justify-between px-3">
                          <span className="text-xs text-gray-400">Select option</span>
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="h-8 bg-gray-100 rounded border"></div>
                      )}
                    </div>
                  ))}
                  
                  {/* Terms and Privacy */}
                  {formData.formSettings.termsAndPrivacy.enabled && (
                    <div className="flex items-center space-x-2 text-xs pt-2">
                      <input type="checkbox" className="w-3 h-3" defaultChecked />
                      <span className="text-gray-600">{formData.formSettings.termsAndPrivacy.label}</span>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <button
                    className="w-full py-2 rounded text-white font-medium mt-4 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: selectedTemplateColors.secondary }}
                  >
                    {formData.formSettings.buttonLabel}
                  </button>
                </div>
              </div>
            )}

            {/* Empty State - إذا لم يكن هناك أي مكون مفعل */}
            {!formData.profile.enabled && !formData.formEnabled && (
              <div className="text-center py-12 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-sm">No components enabled</p>
                <p className="text-xs mt-1">Enable Profile or Form to see content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
