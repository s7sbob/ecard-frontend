// src/components/FormQRCode/components/FormSection.tsx
import React, { useState, useRef } from 'react';
import { Mail, MessageSquare, User, Upload, X, Trash2, GripVertical } from 'lucide-react';
import { ComponentToggle } from './ComponentToggle';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { FormSettings, FormField } from '../types';

interface FormSectionProps {
  formEnabled: boolean;
  onToggleForm: (enabled: boolean) => void;
  formSettings: FormSettings;
  onUpdateFormSettings: (updates: Partial<FormSettings>) => void;
  formFields: FormField[];
  onUpdateFormFields: (fields: FormField[]) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  formEnabled,
  onToggleForm,
  formSettings,
  onUpdateFormSettings,
  formFields,
  onUpdateFormFields,
}) => {
  const [expanded, setExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleForm = (enabled: boolean) => {
    onToggleForm(enabled);
    if (!enabled) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateFormSettings({
        headerImage: {
          ...formSettings.headerImage,
          file,
          url,
        },
      });
    }
  };

  const removeImage = () => {
    onUpdateFormSettings({
      headerImage: {
        ...formSettings.headerImage,
        file: undefined,
        url: undefined,
      },
    });
  };

  const toggleField = (fieldId: string) => {
    const updatedFields = formFields.map(field =>
      field.id === fieldId ? { ...field, enabled: !field.enabled } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const toggleRequired = (fieldId: string) => {
    const updatedFields = formFields.map(field =>
      field.id === fieldId ? { ...field, required: !field.required } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const updateFieldLabel = (fieldId: string, label: string) => {
    const updatedFields = formFields.map(field =>
      field.id === fieldId ? { ...field, label } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const updateFieldErrorMessage = (fieldId: string, errorMessage: string) => {
    const updatedFields = formFields.map(field =>
      field.id === fieldId ? { ...field, errorMessage } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const updateFieldType = (fieldId: string, type: FormField['type']) => {
    const updatedFields = formFields.map(field =>
      field.id === fieldId ? { ...field, type } : field
    );
    onUpdateFormFields(updatedFields);
  };

  const deleteField = (fieldId: string) => {
    const updatedFields = formFields.filter(field => field.id !== fieldId);
    onUpdateFormFields(updatedFields);
  };

  const addNewField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter value',
      required: false,
      enabled: true,
      errorMessage: 'This field is required',
      icon: <User size={16} />,
    };
    onUpdateFormFields([...formFields, newField]);
  };

  return (
    <ComponentToggle
      label="Contact Form"
      enabled={formEnabled}
      onToggle={handleToggleForm}
      icon={<Mail size={20} />}
      expanded={expanded}
      onExpandToggle={() => setExpanded(!expanded)}
    >
      <div className="space-y-6">
        {/* Form Name */}
        <div>
          <Input
            label="Form Name"
            value={formSettings.name}
            onChange={(e) => onUpdateFormSettings({ name: e.target.value })}
            placeholder="Contact Us"
          />
        </div>

        {/* Create New vs Use Template */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="formCreation"
                defaultChecked
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">Create New</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="formCreation"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">Use Form Template</span>
            </label>
          </div>
        </div>

        {/* Form Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Form Settings</h4>
          
          {/* Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  formSettings.type === 'overlay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => onUpdateFormSettings({ type: 'overlay' })}
              >
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <span className="text-xs">Overlay</span>
              </button>
              <button
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  formSettings.type === 'inline' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => onUpdateFormSettings({ type: 'inline' })}
              >
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="text-xs">Inline</span>
              </button>
            </div>
          </div>

          {/* Prevent Multiple Submissions */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-700">Don't show this form multiple times to the same user</span>
            <button
              className={`
                relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                ${formSettings.preventMultipleSubmissions ? 'bg-blue-600' : 'bg-gray-300'}
              `}
              onClick={() => onUpdateFormSettings({ 
                preventMultipleSubmissions: !formSettings.preventMultipleSubmissions 
              })}
            >
              <span
                className={`
                  inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                  ${formSettings.preventMultipleSubmissions ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800">Form Content</h4>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Use Template Content
            </button>
          </div>

          {/* Header Image */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Header Image</label>
              <button
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                  ${formSettings.headerImage.enabled ? 'bg-blue-600' : 'bg-gray-300'}
                `}
                onClick={() => onUpdateFormSettings({
                  headerImage: {
                    ...formSettings.headerImage,
                    enabled: !formSettings.headerImage.enabled,
                  },
                })}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                    ${formSettings.headerImage.enabled ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {formSettings.headerImage.enabled && (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {formSettings.headerImage.url ? (
                    <div className="relative w-16 h-16 border-2 border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={formSettings.headerImage.url}
                        alt="Header"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Upload size={16} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Upload</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  (420x120px, 3:1 Ratio)
                </div>
              </div>
            )}
          </div>

          {/* Title & Description */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Title, Description</label>
              <button
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                  ${formSettings.title.enabled ? 'bg-blue-600' : 'bg-gray-300'}
                `}
                onClick={() => onUpdateFormSettings({
                  title: {
                    ...formSettings.title,
                    enabled: !formSettings.title.enabled,
                  },
                })}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                    ${formSettings.title.enabled ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {formSettings.title.enabled && (
              <div className="space-y-3">
                <Input
                  label="Title"
                  value={formSettings.title.text}
                  onChange={(e) => onUpdateFormSettings({
                    title: { ...formSettings.title, text: e.target.value }
                  })}
                  placeholder="Contact Us"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formSettings.description.text}
                    onChange={(e) => onUpdateFormSettings({
                      description: { ...formSettings.description, text: e.target.value }
                    })}
                    placeholder="Any question or remark? Just write a message!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Form Fields</h4>
          <div className="space-y-4">
            {formFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical size={16} className="text-gray-400 cursor-move" />
                    <span className="font-medium text-gray-800">{field.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => deleteField(field.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className={`
                        relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                        ${field.enabled ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                      onClick={() => toggleField(field.id)}
                    >
                      <span
                        className={`
                          inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                          ${field.enabled ? 'translate-x-5' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {field.enabled && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Label/Question"
                        value={field.label}
                        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                        placeholder="Your Name"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={field.type}
                          onChange={(e) => updateFieldType(field.id, e.target.value as FormField['type'])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="text">One-Line</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="textarea">Multi-Line</option>
                          <option value="select">Select</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={() => toggleRequired(field.id)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">Required</span>
                      </label>
                    </div>

                    <Input
                      label="Error Message"
                      value={field.errorMessage}
                      onChange={(e) => updateFieldErrorMessage(field.id, e.target.value)}
                      placeholder="This field is required"
                    />
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addNewField}
              className="w-full"
            >
              + Add Field
            </Button>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Terms and Privacy Policy</h4>
          <Input
            label="Label for Terms and Privacy Policy consent"
            value={formSettings.termsAndPrivacy.label}
            onChange={(e) => onUpdateFormSettings({
              termsAndPrivacy: { ...formSettings.termsAndPrivacy, label: e.target.value }
            })}
            placeholder="I agree to Terms and Privacy Policy"
          />
          <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">
            Update Terms and Privacy Policy
          </button>
        </div>

        {/* Button Label */}
        <div>
          <Input
            label="Button Label"
            value={formSettings.buttonLabel}
            onChange={(e) => onUpdateFormSettings({ buttonLabel: e.target.value })}
            placeholder="Submit"
          />
        </div>

        {/* Completion Message */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Completion Message</h4>
          <div className="flex items-center space-x-4 mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="completionType"
                checked={formSettings.completionMessage.type === 'toast'}
                onChange={() => onUpdateFormSettings({
                  completionMessage: { ...formSettings.completionMessage, type: 'toast' }
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Toast</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="completionType"
                checked={formSettings.completionMessage.type === 'popup'}
                onChange={() => onUpdateFormSettings({
                  completionMessage: { ...formSettings.completionMessage, type: 'popup' }
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Popup</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formSettings.completionMessage.description}
              onChange={(e) => onUpdateFormSettings({
                completionMessage: { ...formSettings.completionMessage, description: e.target.value }
              })}
              placeholder="Thank you for your response."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>

        {/* Form Integration Settings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Form Integration Settings</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Invoke API</span>
                <p className="text-xs text-gray-500">Invoke API to integrate form responses with third-party platform</p>
              </div>
              <button
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                  ${formSettings.integrations.invokeAPI ? 'bg-blue-600' : 'bg-gray-300'}
                `}
                onClick={() => onUpdateFormSettings({
                  integrations: { ...formSettings.integrations, invokeAPI: !formSettings.integrations.invokeAPI }
                })}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                    ${formSettings.integrations.invokeAPI ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Invoke SMS</span>
                <p className="text-xs text-gray-500">Invoke SMS to receive form submission alerts</p>
              </div>
              <button
                className={`
                  relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                  ${formSettings.integrations.invokeSMS ? 'bg-blue-600' : 'bg-gray-300'}
                `}
                onClick={() => onUpdateFormSettings({
                  integrations: { ...formSettings.integrations, invokeSMS: !formSettings.integrations.invokeSMS }
                })}
              >
                <span
                  className={`
                    inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                    ${formSettings.integrations.invokeSMS ? 'translate-x-5' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Save As Template
          </Button>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Email me on Form Submission</span>
            <button
              className={`
                relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                ${formSettings.emailNotification ? 'bg-blue-600' : 'bg-gray-300'}
              `}
              onClick={() => onUpdateFormSettings({ emailNotification: !formSettings.emailNotification })}
            >
              <span
                className={`
                  inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                  ${formSettings.emailNotification ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Card Background</span>
            <button
              className={`
                relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200
                ${formSettings.cardBackground ? 'bg-blue-600' : 'bg-gray-300'}
              `}
              onClick={() => onUpdateFormSettings({ cardBackground: !formSettings.cardBackground })}
            >
              <span
                className={`
                  inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200
                  ${formSettings.cardBackground ? 'translate-x-5' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>
      </div>
    </ComponentToggle>
  );
};
