// src/components/FormQRCode/stages/QRCodeStage.tsx
import React, { useState, useRef } from 'react';
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
// المكونات الصحيحة من react-qrbtf
import {
  QRNormal,
  QRRandRect,
  QRDsj,
  QR25D,
  QRImage,
  QRResImage,
  QRBubble,
  QRFunc,
  QRLine,
} from 'react-qrbtf';
import { ColorPicker } from '../components/ColorPicker';
import { qrShapesData } from '../data/qrShapes';
import { stickersData } from '../data/stickers';
import { templatesData } from '../data/templates';

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
  const [activeTab, setActiveTab] = useState<'shapes' | 'predesigned' | 'stickers' | 'colors' | 'logos' | 'decorate'>('shapes');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrRef = useRef<any>(null);

  const handleShapeSelect = (shapeId: string) => {
    onUpdateQRCodeSettings({ 
      frameStyle: shapeId
    });
  };

  const handleStickerSelect = (stickerId: string) => {
    const selectedSticker = stickersData.find(sticker => sticker.id === stickerId);
    if (selectedSticker) {
      onUpdateQRCodeSettings({ 
        frameStyle: stickerId,
        frameColor: selectedSticker.color 
      });
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoImage = e.target?.result as string;
        onUpdateQRCodeSettings({ logoImage });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (qrRef.current && qrRef.current.toCanvas) {
      qrRef.current.toCanvas().then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const resetQRCode = () => {
    onUpdateQRCodeSettings({
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      eyeColor: '#000000',
      qrStyle: 'squares',
      logoImage: '',
      frameStyle: 'normal', // تعديل القيمة الافتراضية
    });
  };

  // خريطة المكونات الصحيحة
  const componentsMap = {
    QRNormal,
    QRRandRect,
    QRDsj,
    QR25D,
    QRImage,
    QRResImage,
    QRBubble,
    QRFunc,
    QRLine,
  } as const;

const getQRComponent = () => {
  const selectedShape = qrShapesData.find(
    (shape) => shape.id === qrCodeSettings.frameStyle,
  );

  const componentKey = (selectedShape?.component || 'QRNormal') as keyof typeof componentsMap;
  const Comp = componentsMap[componentKey] || QRNormal;

  // الـ props الأساسية
  let qrProps: any = {
    value: qrCodeSettings.value || 'https://linko.page/sy9x4abbtauu',
    size: 400,
    level: 'M' as const,
    bgColor: qrCodeSettings.bgColor,
    fgColor: qrCodeSettings.fgColor,
  };

  // إضافة اللوجو إذا كان موجود
  if (qrCodeSettings.logoImage) {
    qrProps.icon = qrCodeSettings.logoImage;
    qrProps.iconScale = Math.min(qrCodeSettings.logoSize / 400, 0.3);
  }

  // إضافة معاملات خاصة حسب نوع الشكل
  if (selectedShape?.params) {
    const params = selectedShape.params;
    
    // للـ QRFunc - إضافة نوع الدالة
    if (componentKey === 'QRFunc') {
      qrProps.type = params.type || 'A';
      qrProps.amplitude = 0.1;
      qrProps.frequency = 2;
    }
    
    // للـ QRLine - إضافة نمط الخط
    if (componentKey === 'QRLine') {
      qrProps.direction = params.style === 'vertical' ? 'v' : 'h';
      qrProps.width = 0.8;
    }
    
    // للـ QRBubble - إضافة نمط الفقاعات
    if (componentKey === 'QRBubble') {
      qrProps.opacity = 0.8;
      qrProps.scale = 0.9;
    }
    
    // للـ QR25D - إضافة تأثير ثلاثي الأبعاد
    if (componentKey === 'QR25D') {
      qrProps.depth = 0.3;
      qrProps.perspective = 0.2;
    }
    
    // للـ QRDsj - إضافة نمط DSJ
    if (componentKey === 'QRDsj') {
      qrProps.density = 0.8;
      qrProps.opacity = 0.9;
    }
  }

  // إضافة إطار الستيكر إذا كان مختار
  const selectedSticker = stickersData.find(s => s.id === qrCodeSettings.frameStyle);
  if (selectedSticker) {
    // إضافة لون الإطار
    qrProps.fgColor = selectedSticker.color;
    
    // إضافة تدرج إذا كان متوفر
    if (selectedSticker.gradient) {
      qrProps.fgColor = selectedSticker.gradient[0];
      qrProps.bgColor = selectedSticker.gradient[1];
    }
  }

  return (
    <div className="relative">
      <Comp {...qrProps} ref={qrRef} />
      
      {/* إضافة إطار الستيكر كـ overlay */}
      {selectedSticker && (
        <div className="absolute inset-0 pointer-events-none">
          {selectedSticker.frameType === 'neon' && (
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                boxShadow: `0 0 20px ${selectedSticker.color}, 0 0 40px ${selectedSticker.color}, 0 0 60px ${selectedSticker.color}`,
                border: `2px solid ${selectedSticker.color}`,
              }}
            />
          )}
          
          {selectedSticker.frameType === 'vintage' && (
            <div 
              className="absolute inset-0 rounded-lg border-4"
              style={{
                borderColor: selectedSticker.color,
                borderStyle: 'double',
                background: `linear-gradient(45deg, transparent 30%, ${selectedSticker.color}20 50%, transparent 70%)`,
              }}
            />
          )}
          
          {selectedSticker.frameType === 'gradient' && selectedSticker.gradient && (
            <div 
              className="absolute inset-0 rounded-lg border-4"
              style={{
                background: `linear-gradient(45deg, ${selectedSticker.gradient[0]}, ${selectedSticker.gradient[1]})`,
                padding: '4px',
              }}
            />
          )}
          
          {/* أيقونة الستيكر في الزاوية */}
          <div className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-lg">
            {selectedSticker.icon}
          </div>
        </div>
      )}
    </div>
  );
};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shapes':
        const shapeCategories = Array.from(new Set(qrShapesData.map(shape => shape.category)));
        return (
          <div className="space-y-8">
            {shapeCategories.map(category => (
              <div key={category} className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 capitalize border-b border-gray-200 pb-2">
                  {category.replace('-', ' ')} Shapes
                </h4>
                <div className="grid grid-cols-6 gap-4">
                  {qrShapesData
                    .filter(shape => shape.category === category)
                    .map((shape) => (
                      <button
                        key={shape.id}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all hover:shadow-lg ${
                          qrCodeSettings.frameStyle === shape.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                        }`}
                        onClick={() => handleShapeSelect(shape.id)}
                      >
                        <div className="text-3xl">{shape.icon}</div>
                        <span className="text-xs text-center font-medium leading-tight">{shape.name}</span>
                        <span className="text-xs text-gray-500">{shape.component}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'stickers':
        const stickerCategories = Array.from(new Set(stickersData.map(sticker => sticker.category)));
        return (
          <div className="space-y-8">
            {stickerCategories.map(category => (
              <div key={category} className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 capitalize border-b border-gray-200 pb-2">
                  {category.replace('-', ' ')} Stickers
                </h4>
                <div className="grid grid-cols-6 gap-4">
                  {stickersData
                    .filter(sticker => sticker.category === category)
                    .map((sticker) => (
                      <button
                        key={sticker.id}
                        className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-all hover:shadow-lg ${
                          qrCodeSettings.frameStyle === sticker.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                        }`}
                        onClick={() => handleStickerSelect(sticker.id)}
                      >
                        <div 
                          className="text-3xl p-2 rounded-lg"
                          style={{ backgroundColor: `${sticker.color}20` }}
                        >
                          {sticker.icon}
                        </div>
                        <span className="text-xs text-center font-medium leading-tight">{sticker.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'predesigned':
        const templateCategories = Array.from(new Set(templatesData.map(template => template.category)));
        return (
          <div className="space-y-8">
            {templateCategories.map(category => (
              <div key={category} className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 capitalize border-b border-gray-200 pb-2">
                  {category.replace('-', ' ')} Templates
                </h4>
                <div className="grid grid-cols-4 gap-6">
                  {templatesData
                    .filter(template => template.category === category)
                    .map((template) => (
                      <button
                        key={template.id}
                        className="p-6 border-2 rounded-xl flex flex-col items-center space-y-3 hover:border-blue-500 hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => {
                          onUpdateQRCodeSettings({
                            fgColor: template.colors[0],
                            bgColor: template.colors[1],
                            eyeColor: template.colors[0],
                          });
                        }}
                      >
                        <div
                          className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
                          style={{
                            background: template.gradient 
                              ? `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` 
                              : template.colors[0],
                          }}
                        >
                          QR
                        </div>
                        <span className="text-sm font-medium text-center">{template.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'colors':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ColorPicker
              color={qrCodeSettings.fgColor}
              onChange={(color) => onUpdateQRCodeSettings({ fgColor: color })}
              label="Foreground Color"
            />
            <ColorPicker
              color={qrCodeSettings.bgColor}
              onChange={(color) => onUpdateQRCodeSettings({ bgColor: color })}
              label="Background Color"
            />
            <ColorPicker
              color={qrCodeSettings.eyeColor}
              onChange={(color) => onUpdateQRCodeSettings({ eyeColor: color })}
              label="Eye Color"
            />
          </div>
        );

      case 'logos':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center space-x-3 mx-auto shadow-lg"
              >
                <Upload size={20} />
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
              <div className="space-y-6">
                <div className="text-center">
                  <img 
                    src={qrCodeSettings.logoImage} 
                    alt="Logo Preview" 
                    className="w-20 h-20 object-cover rounded-lg mx-auto border-2 border-gray-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Logo Size: {qrCodeSettings.logoSize}px
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="120" // تقليل الحد الأقصى
                      value={qrCodeSettings.logoSize}
                      onChange={(e) => onUpdateQRCodeSettings({ logoSize: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">
                      Logo Opacity: {Math.round(qrCodeSettings.logoOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={qrCodeSettings.logoOpacity}
                      onChange={(e) => onUpdateQRCodeSettings({ logoOpacity: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
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
    { id: 'shapes', label: 'QR SHAPES', icon: <Shapes size={18} /> },
    { id: 'predesigned', label: 'PRE-DESIGNED', icon: <Palette size={18} /> },
    { id: 'stickers', label: 'STICKERS', icon: <Tag size={18} /> },
    { id: 'colors', label: 'COLORS', icon: <Palette size={18} /> },
    { id: 'logos', label: 'LOGOS', icon: <Upload size={18} /> },
    { id: 'decorate', label: 'DECORATE', icon: <Palette size={18} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Customize Your QR Code</h2>
        <p className="text-lg text-gray-600">Design your QR code to match your brand perfectly</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Panel - Customization (2/3 width) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <nav className="flex space-x-1 p-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
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
          <div className="bg-white border border-gray-200 rounded-b-lg p-8 min-h-[600px] max-h-[600px] overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Panel - Preview (1/3 width) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center sticky top-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">QR Code Preview</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 flex justify-center">
              {getQRComponent()}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Add 3D Effect</span>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Set as default
                </button>
                <button 
                  onClick={resetQRCode}
                  className="text-gray-600 hover:text-gray-700 font-medium flex items-center space-x-1"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Download size={20} className="mr-2" />
              Download Large Size
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleDownload()}
                variant="outline"
                className="text-sm"
              >
                PNG
              </Button>
              <Button
                onClick={() => handleDownload()}
                variant="outline"
                className="text-sm"
              >
                SVG
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between pt-8 border-t border-gray-200">
        <Button onClick={onPrevious} variant="outline" size="lg" className="flex items-center space-x-2">
          <span>←</span>
          <span>Back to Design</span>
        </Button>
        <Button onClick={onSave} size="lg" className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
          <Download size={20} />
          <span>Save & Download</span>
        </Button>
      </div>
    </div>
  );
};
