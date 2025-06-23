import React from 'react';
import { FormData } from '../../../types';
import PageTemplate from './PageTemplate';
import ComponentToggle from './ComponentToggle';
import { 
  Container, 
  Section, 
  SectionTitle, 
  URLSection, 
  URLInput, 
  URLPrefix,
  URLContainer,
  MinCharNote,
  TemplateSection,
  ComponentsSection,
  AddComponentButton
} from './styles';

interface Step1ContentProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
}

const Step1Content: React.FC<Step1ContentProps> = ({ data, onUpdate }) => {
  const handleURLChange = (value: string) => {
    onUpdate({ pageUrl: value });
  };

  const handleTemplateSelect = (template: string) => {
    onUpdate({ selectedTemplate: template });
  };

  const handleToggleComponent = (type: 'profile' | 'form', enabled: boolean) => {
    if (type === 'profile') {
      onUpdate({ profileEnabled: enabled });
    } else {
      onUpdate({ formEnabled: enabled });
    }
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Your Page URL</SectionTitle>
        <URLSection>
          <URLContainer>
            <URLPrefix>linko.page/</URLPrefix>
            <URLInput
              type="text"
              value={data.pageUrl}
              onChange={(e) => handleURLChange(e.target.value)}
              placeholder="your-custom-url"
              minLength={5}
            />
          </URLContainer>
          <MinCharNote>*minimum 5 characters required</MinCharNote>
        </URLSection>
      </Section>

      <Section>
        <SectionTitle>Page Template</SectionTitle>
        <TemplateSection>
          <PageTemplate
            selectedTemplate={data.selectedTemplate}
            onSelect={handleTemplateSelect}
          />
        </TemplateSection>
      </Section>

      <Section>
        <SectionTitle>Components</SectionTitle>
        <ComponentsSection>
          <ComponentToggle
            type="profile"
            label="Profile"
            enabled={data.profileEnabled}
            onToggle={(enabled) => handleToggleComponent('profile', enabled)}
          />
          <ComponentToggle
            type="form"
            label="Form"
            enabled={data.formEnabled}
            onToggle={(enabled) => handleToggleComponent('form', enabled)}
          />
        </ComponentsSection>
        
        <AddComponentButton>
          <span>+</span>
          Add Component
        </AddComponentButton>
      </Section>
    </Container>
  );
};

export default Step1Content;
