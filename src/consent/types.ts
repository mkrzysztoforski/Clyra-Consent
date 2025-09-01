export type ConsentCategory = {
  required?: boolean;
  default?: boolean;
  label: Record<string, string>;
};

import type { ConsentState } from './store';

export type ConsentConfig = {
  lang?: string;
  legalVersion: string;
  categories: Record<string, ConsentCategory>;
  appearance?: {
    theme?: 'light' | 'dark';
    className?: string;
    colors?: Record<string, string>;
  };
  onUpdate?: (state: ConsentState) => void;
  onAcceptAll?: (state: ConsentState) => void;
  onDeclineAll?: (state: ConsentState) => void;
};
