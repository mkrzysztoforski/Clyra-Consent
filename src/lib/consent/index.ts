export type ConsentConfig = {
  languages: string[];
  legalVersion: string;
  categories: Record<string, { required?: boolean; default?: boolean }>;
  onUpdate?: (state: any) => void;
};

let config: ConsentConfig;

export function initConsent(cfg: ConsentConfig) {
  config = cfg;
}

export function getConsentConfig() {
  return config;
}
