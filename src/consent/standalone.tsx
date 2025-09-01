import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConsentProvider } from './index';
import type { ConsentConfig } from './types';
import type { ConsentState } from './store';

function mount(config: ConsentConfig) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<ConsentProvider config={config} />);
}

const api = {
  init(config: ConsentConfig) {
    mount(config);
  },
  onUpdate(cb: (state: ConsentState) => void) {
    window.addEventListener('consent:update', (e) => cb((e as CustomEvent<ConsentState>).detail));
  },
  onAcceptAll(cb: (state: ConsentState) => void) {
    window.addEventListener('consent:acceptAll', (e) => cb((e as CustomEvent<ConsentState>).detail));
  },
  onDeclineAll(cb: (state: ConsentState) => void) {
    window.addEventListener('consent:declineAll', (e) => cb((e as CustomEvent<ConsentState>).detail));
  },
};

declare global {
  interface Window {
    Consent: typeof api;
  }
}

if (typeof window !== 'undefined') {
  window.Consent = api;
}

export default api;
