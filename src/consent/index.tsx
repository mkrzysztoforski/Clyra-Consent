import { useEffect } from 'react';
import Widget from './Widget';
import Modal from './Modal';
import { consentStore } from './store';
import { setConfig } from './config';
import type { ConsentConfig } from './types';
import { loadTranslation } from './translations';

export function ConsentProvider({ config }: { config: ConsentConfig }) {
  useEffect(() => {
    setConfig(config);
    consentStore.init(config.categories);
    loadTranslation(config.lang || 'en');
  }, [config]);

  useEffect(() => {
    if (!config.onUpdate) return;
    const handler = (e: Event) => config.onUpdate!((e as CustomEvent).detail);
    window.addEventListener('consent:update', handler);
    return () => window.removeEventListener('consent:update', handler);
  }, [config]);

  useEffect(() => {
    if (!config.onAcceptAll) return;
    const handler = (e: Event) => config.onAcceptAll!((e as CustomEvent).detail);
    window.addEventListener('consent:acceptAll', handler);
    return () => window.removeEventListener('consent:acceptAll', handler);
  }, [config]);

  useEffect(() => {
    if (!config.onDeclineAll) return;
    const handler = (e: Event) => config.onDeclineAll!((e as CustomEvent).detail);
    window.addEventListener('consent:declineAll', handler);
    return () => window.removeEventListener('consent:declineAll', handler);
  }, [config]);

  return (
    <>
      <Widget />
      <Modal />
    </>
  );
}
