import type { ConsentConfig } from './types';

let config: ConsentConfig = {
  legalVersion: '',
  categories: {},
};

export function setConfig(cfg: ConsentConfig) {
  config = cfg;
}

export function getConfig(): ConsentConfig {
  return config;
}
