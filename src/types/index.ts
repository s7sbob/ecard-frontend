export interface FormData {
  pageUrl: string;
  selectedTemplate: string;
  profileEnabled: boolean;
  formEnabled: boolean;
  components: ComponentType[];
}

export interface ComponentType {
  id: string;
  type: 'profile' | 'form' | 'custom';
  enabled: boolean;
  config: any;
}

export interface DesignSettings {
  backgroundImage: string;
  backgroundColor: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  fontStyle: string;
  cardStyle: string;
  pageLoader: boolean;
  passcodeProtection: boolean;
  passcode?: string;
}

export interface QRCodeSettings {
  shape: string;
  preDesigned: string;
  stickers: string[];
  colors: {
    foreground: string;
    background: string;
  };
  logo?: string;
  decoratePicture?: string;
}

export interface FormQRCodeData {
  content: FormData;
  design: DesignSettings;
  qrCode: QRCodeSettings;
}

export type StepType = 1 | 2 | 3;
