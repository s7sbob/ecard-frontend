import React from 'react';
import { DesignSettings } from '../../../types';
import BackgroundSettings from './BackgroundSettings';
import ColorSettings from './ColorSettings';
import FontSettings from './FontSettings';
import Toggle from '../../common/Toggle';
import { 
  Container, 
  Section, 
  SectionTitle, 
  DesignGrid,
  SettingsSection,
  SettingItem,
  SettingLabel,
  StyleManagement,
  StyleButton,
  CustomCSSSection,
  TextArea
} from './styles';

interface Step2DesignProps {
  data: DesignSettings;
  onUpdate: (data: Partial<DesignSettings>) => void;
}

const Step2Design: React.FC<Step2DesignProps> = ({ data, onUpdate }) => {
  const handleBackgroundChange = (backgroundImage: string, backgroundColor: string) => {
    onUpdate({ backgroundImage, backgroundColor });
  };

  const handleColorChange = (colors: any) => {
    onUpdate({ colors: { ...data.colors, ...colors } });
  };

  const handleFontChange = (fontStyle: string) => {
    onUpdate({ fontStyle });
  };

  const handleCardStyleChange = (cardStyle: string) => {
    onUpdate({ cardStyle });
  };

  const handlePageLoaderToggle = (pageLoader: boolean) => {
    onUpdate({ pageLoader });
  };

  const handlePasscodeToggle = (passcodeProtection: boolean) => {
    onUpdate({ passcodeProtection });
  };

  return (
    <Container>
      <DesignGrid>
        <Section>
          <SectionTitle>Design Options</SectionTitle>
          
          <BackgroundSettings
            backgroundImage={data.backgroundImage}
            backgroundColor={data.backgroundColor}
            onChange={handleBackgroundChange}
          />
          
          <ColorSettings
            colors={data.colors}
            onChange={handleColorChange}
          />
          
          <FontSettings
            fontStyle={data.fontStyle}
            onChange={handleFontChange}
          />
          
          <SettingItem>
            <SettingLabel>Card Style</SettingLabel>
            <select 
              value={data.cardStyle} 
              onChange={(e) => handleCardStyleChange(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #e9ecef',
                fontSize: '16px',
                width: '200px'
              }}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="elegant">Elegant</option>
            </select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Page Loader</SettingLabel>
            <Toggle 
              checked={data.pageLoader} 
              onChange={handlePageLoaderToggle} 
            />
          </SettingItem>
        </Section>

        <SettingsSection>
          <SectionTitle>Page Settings</SectionTitle>
          
          <SettingItem>
            <SettingLabel>Passcode Protection</SettingLabel>
            <Toggle 
              checked={data.passcodeProtection} 
              onChange={handlePasscodeToggle} 
            />
          </SettingItem>

          {data.passcodeProtection && (
            <SettingItem>
              <SettingLabel>Passcode</SettingLabel>
              <input
                type="password"
                value={data.passcode || ''}
                onChange={(e) => onUpdate({ passcode: e.target.value })}
                placeholder="Enter passcode"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '2px solid #e9ecef',
                  fontSize: '16px',
                  width: '200px'
                }}
              />
            </SettingItem>
          )}

          <StyleManagement>
            <SectionTitle>Style Management</SectionTitle>
            <StyleButton variant="primary">Save this Style</StyleButton>
            <StyleButton variant="secondary">Saved Style(s)</StyleButton>
          </StyleManagement>

          <CustomCSSSection>
            <SectionTitle>Custom CSS</SectionTitle>
            <TextArea
              placeholder="/* Add your custom CSS here */"
              rows={8}
            />
          </CustomCSSSection>
        </SettingsSection>
      </DesignGrid>
    </Container>
  );
};

export default Step2Design;
