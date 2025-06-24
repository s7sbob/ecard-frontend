// src/components/FormQRCode/components/ProfileSection.tsx
import React, { useRef, useState } from 'react';
import { ProfileData } from '../types';
import { Input } from '../../ui/Input';
import { Upload, X, User } from 'lucide-react';
import { ComponentToggle } from './ComponentToggle';

interface ProfileSectionProps {
  profileData: ProfileData;
  onUpdateProfile: (updates: Partial<ProfileData>) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileData,
  onUpdateProfile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(true);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateProfile({
        brandLogo: {
          ...profileData.brandLogo,
          file,
          url,
        },
      });
    }
  };

  const removeLogo = () => {
    onUpdateProfile({
      brandLogo: {
        ...profileData.brandLogo,
        file: undefined,
        url: undefined,
      },
    });
  };

  const toggleBrandLogo = () => {
    onUpdateProfile({
      brandLogo: {
        ...profileData.brandLogo,
        enabled: !profileData.brandLogo.enabled,
      },
    });
  };

  const toggleConnectIcons = () => {
    onUpdateProfile({
      connectIcons: !profileData.connectIcons,
    });
  };

  const handleToggleProfile = (enabled: boolean) => {
    onUpdateProfile({ enabled });
    // إذا تم إيقاف تشغيل Profile، أغلق التوسيع
    if (!enabled) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  return (
    <ComponentToggle
      label="Profile"
      enabled={profileData.enabled}
      onToggle={handleToggleProfile}
      icon={<User size={20} />}
      expanded={expanded}
      onExpandToggle={() => setExpanded(!expanded)}
    >
      <div className="space-y-6">
        {/* Brand Logo Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">Brand Logo</label>
            <div className="flex items-center space-x-2">
              <button
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                  ${profileData.brandLogo.enabled ? 'bg-blue-600' : 'bg-gray-300'}
                `}
                onClick={toggleBrandLogo}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                    ${profileData.brandLogo.enabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>

          {profileData.brandLogo.enabled && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profileData.brandLogo.url ? (
                  <div className="relative w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={profileData.brandLogo.url}
                      alt="Brand Logo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload size={20} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Upload</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              <div className="text-xs text-gray-500">
                (200x200px, 1:1 Ratio)
              </div>
            </div>
          )}
        </div>

        {/* Name Field */}
        <div>
          <Input
            label="Name"
            value={profileData.name}
            onChange={(e) => onUpdateProfile({ name: e.target.value })}
            placeholder="Teamwork co."
          />
        </div>

        {/* Heading and Sub Heading */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Heading"
            value={profileData.heading}
            onChange={(e) => onUpdateProfile({ heading: e.target.value })}
            placeholder="Design Agency"
          />
          <Input
            label="Sub Heading"
            value={profileData.subHeading}
            onChange={(e) => onUpdateProfile({ subHeading: e.target.value })}
            placeholder="Optional"
          />
        </div>

        {/* Profile Connect Icons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">Profile Connect Icons</label>
            <button
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                ${profileData.connectIcons ? 'bg-blue-600' : 'bg-gray-300'}
              `}
              onClick={toggleConnectIcons}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${profileData.connectIcons ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {profileData.connectIcons && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Facebook URL"
                value={profileData.socialLinks.facebook || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, facebook: e.target.value }
                })}
              />
              <Input
                placeholder="Instagram URL"
                value={profileData.socialLinks.instagram || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, instagram: e.target.value }
                })}
              />
              <Input
                placeholder="LinkedIn URL"
                value={profileData.socialLinks.linkedin || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, linkedin: e.target.value }
                })}
              />
              <Input
                placeholder="Website URL"
                value={profileData.socialLinks.website || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, website: e.target.value }
                })}
              />
              <Input
                placeholder="Phone Number"
                value={profileData.socialLinks.phone || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, phone: e.target.value }
                })}
              />
              <Input
                placeholder="Email Address"
                value={profileData.socialLinks.email || ''}
                onChange={(e) => onUpdateProfile({
                  socialLinks: { ...profileData.socialLinks, email: e.target.value }
                })}
              />
            </div>
          )}
        </div>
      </div>
    </ComponentToggle>
  );
};
