// src/components/FormQRCode/stages/QRCodeStage.tsx
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { QRCodeSettings } from '../types';
import { Button } from '../../ui/Button';
import {
  Download,
  Upload,
  Palette,
  Shapes,
  RotateCcw,
  Settings,
  Tag,
} from 'lucide-react';
import { ColorPicker } from '../components/ColorPicker';
import { FramedQRCode } from '../components/FramedQRCode';
import { loadSVGContent, svgShapeFiles } from '../utils/svgShapeLoader'; // استخدام الـ SVG files الموجودة عندك
import { loadSvgPath } from '../utils/loadSvgPath';

interface QRCodeStageProps {
  qrCodeSettings: QRCodeSettings;
  onUpdateQRCodeSettings: (updates: Partial<QRCodeSettings>) => void;
  onPrevious: () => void;
  onSave: () => void;
}

export const QRCodeStage: React.FC<QRCodeStageProps> = ({
  qrCodeSettings,
  onUpdateQRCodeSettings,
  onPrevious,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'shapes' | 'colors' | 'logos' | 'decorate'>('shapes');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // اختيار الشكل من الـ SVG files الموجودة
const handleShapeSelect = useCallback(async (shapeId: string) => {
  const shape = svgShapeFiles.find(s => s.id === shapeId);
  if (shape) {
    try {
      // استخدام loadSVGContent بدلاً من fetch مباشرة
      const svgContent = await loadSVGContent(shape.path);
      
      onUpdateQRCodeSettings({
        frameStyle: shape.id,
        shapeSvg: svgContent
      });
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  }
}, [onUpdateQRCodeSettings]);
  // رفع اللوجو
  const handleLogoUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoImage = e.target?.result as string;
        onUpdateQRCodeSettings({ logoImage });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('حجم الملف كبير جداً. يرجى اختيار ملف أقل من 2 ميجابايت.');
    }
  }, [onUpdateQRCodeSettings]);

  // إعادة تعيين الإعدادات
  const resetQRCode = useCallback(() => {
    onUpdateQRCodeSettings({
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      logoImage: '',
      frameStyle: '',
      shapeSvg: '',
      noiseIntensity: 25,
      noisePattern: 'dots',
      logoSize: 40
    });
  }, [onUpdateQRCodeSettings]);

  // تنزيل الـ QR Code
  const handleDownload = useCallback(() => {
    const svgElement = document.querySelector('#qr-preview svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'qr-code.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  }, []);

  // QR Component
  const qrComponent = useMemo(() => {
    return (
      <FramedQRCode
        value={qrCodeSettings.value || 'https://linko.page/sy9x4abbtauu'}
        size={350}
        bgColor={qrCodeSettings.bgColor}
        fgColor={qrCodeSettings.fgColor}
        logoImage={qrCodeSettings.logoImage}
        logoSize={qrCodeSettings.logoSize}
        shapeSvg={qrCodeSettings.shapeSvg}
      />
    );
  }, [
    qrCodeSettings.value,
    qrCodeSettings.bgColor,
    qrCodeSettings.fgColor,
    qrCodeSettings.logoImage,
    qrCodeSettings.logoSize,
    qrCodeSettings.shapeSvg,
    qrCodeSettings.noisePattern,
    qrCodeSettings.noiseIntensity
  ]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shapes':
        // استخدام الـ categories الموجودة في svgShapeFiles
        const shapeCategories = Array.from(new Set(svgShapeFiles.map(shape => shape.category)));
        return (
          <div className="space-y-6">
            {shapeCategories.map(category => (
              <div key={category} className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800 capitalize border-b border-gray-200 pb-2">
                  {category.replace('-', ' ')} Shapes
                </h4>
                <div className="grid grid-cols-5 gap-3">
                  {svgShapeFiles
                    .filter(shape => shape.category === category)
                    .map((shape) => (
                      <button
                        key={shape.id}
                        className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-1 transition-all hover:shadow-md ${
                          qrCodeSettings.frameStyle === shape.id
                            ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleShapeSelect(shape.id)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center text-2xl">
                          {shape.icon}
                        </div>
                        <span className="text-xs text-center font-medium">{shape.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
            
            {/* خيار بدون شكل */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Basic
              </h4>
              <div className="grid grid-cols-5 gap-3">
                <button
                  className={`p-3 border-2 rounded-lg flex flex-col items-center space-y-1 transition-all hover:shadow-md ${
                    !qrCodeSettings.frameStyle || qrCodeSettings.frameStyle === 'none'
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onUpdateQRCodeSettings({ frameStyle: 'none', shapeSvg: '' })}
                >
                  <div className="w-8 h-8 flex items-center justify-center text-2xl border-2 border-dashed border-gray-300 rounded">
                    ⬜
                  </div>
                  <span className="text-xs text-center font-medium">None</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ColorPicker
                color={qrCodeSettings.fgColor}
                onChange={(color) => onUpdateQRCodeSettings({ fgColor: color })}
                label="QR Code Color"
              />
              <ColorPicker
                color={qrCodeSettings.bgColor}
                onChange={(color) => onUpdateQRCodeSettings({ bgColor: color })}
                label="Background Color"
              />
            </div>
            
            {/* الألوان السريعة */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-gray-800">Quick Colors</h4>
              <div className="grid grid-cols-8 gap-3">
                {[
                  { fg: '#000000', bg: '#FFFFFF', name: 'Classic' },
                  { fg: '#FFFFFF', bg: '#000000', name: 'Inverted' },
                  { fg: '#1E40AF', bg: '#FFFFFF', name: 'Blue' },
                  { fg: '#DC2626', bg: '#FFFFFF', name: 'Red' },
                  { fg: '#059669', bg: '#FFFFFF', name: 'Green' },
                  { fg: '#7C3AED', bg: '#FFFFFF', name: 'Purple' },
                  { fg: '#EA580C', bg: '#FFFFFF', name: 'Orange' },
                  { fg: '#0891B2', bg: '#FFFFFF', name: 'Cyan' },
                ].map((colorSet) => (
                  <button
                    key={colorSet.name}
                    className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => onUpdateQRCodeSettings({ 
                      fgColor: colorSet.fg, 
                      bgColor: colorSet.bg 
                    })}
                  >
                    <div 
                      className="w-8 h-8 rounded border-2 border-gray-200"
                      style={{ backgroundColor: colorSet.bg }}
                    >
                      <div 
                        className="w-full h-full rounded flex items-center justify-center text-xs font-bold"
                        style={{ color: colorSet.fg }}
                      >
                        QR
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{colorSet.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'logos':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 mx-auto shadow-md transition-all"
              >
                <Upload size={18} />
                <span className="font-medium">Upload Logo</span>
              </button>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, SVG up to 2MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>

            {qrCodeSettings.logoImage && (
              <div className="space-y-4">
                <div className="text-center">
                  <img 
                    src={qrCodeSettings.logoImage} 
                    alt="Logo Preview" 
                    className="w-16 h-16 object-cover rounded-lg mx-auto border-2 border-gray-200 shadow-sm"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Logo Size: {qrCodeSettings.logoSize}px
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      value={qrCodeSettings.logoSize}
                      onChange={(e) => onUpdateQRCodeSettings({ logoSize: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => onUpdateQRCodeSettings({ logoImage: '' })}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Remove Logo
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'decorate':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">Noise Pattern</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'dots', name: 'Dots', icon: '•••' },
                    { id: 'squares', name: 'Squares', icon: '■■■' },
                    { id: 'lines', name: 'Lines', icon: '|||' },
                    { id: 'circles', name: 'Circles', icon: '○○○' }
                  ].map((pattern) => (
                    <button
                      key={pattern.id}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        qrCodeSettings.noisePattern === pattern.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => onUpdateQRCodeSettings({ noisePattern: pattern.id as any })}
                    >
                      <div className="text-lg mb-1">{pattern.icon}</div>
                      <span className="text-xs font-medium">{pattern.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Noise Intensity: {qrCodeSettings.noiseIntensity || 25}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={qrCodeSettings.noiseIntensity || 25}
                  onChange={(e) => onUpdateQRCodeSettings({ noiseIntensity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20 text-gray-500">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Coming soon...</p>
          </div>
        );
    }
  };

  const tabs = [
    { id: 'shapes', label: 'SHAPES', icon: <Shapes size={16} /> },
    { id: 'colors', label: 'COLORS', icon: <Palette size={16} /> },
    { id: 'logos', label: 'LOGOS', icon: <Upload size={16} /> },
    { id: 'decorate', label: 'DECORATE', icon: <Tag size={16} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your QR Code</h2>
        <p className="text-md text-gray-600">Design your QR code with custom shapes and effects</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Panel - Customization */}
        <div className="xl:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <nav className="flex space-x-1 p-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-2 py-2 px-4 rounded-md font-medium text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-gray-200 rounded-b-lg p-6 min-h-[500px] max-h-[500px] overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center sticky top-8">
            <h3 className="text-md font-semibold text-gray-800 mb-4">QR Code Preview</h3>
            
            <div id="qr-preview" className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
              {qrComponent}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button 
                  onClick={resetQRCode}
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-2">
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Download size={18} className="mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button 
          onClick={onPrevious} 
          variant="outline" 
          size="lg" 
          className="flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Design</span>
        </Button>
        <Button 
          onClick={onSave} 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
        >
          <Download size={18} />
          <span>Save & Download</span>
        </Button>
      </div>
    </div>
  );
};
