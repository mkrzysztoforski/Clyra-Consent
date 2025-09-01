import { useSyncExternalStore } from 'react';
import { consentStore } from './store';
import { getConfig } from './config';

export function useConsent() {
  const state = useSyncExternalStore(consentStore.subscribe, consentStore.getState);
  const config = getConfig();

  function toggle(category: string) {
    const accepted = { ...state.accepted };
    accepted[category] = !accepted[category];
    consentStore.setState({ accepted });
  }

  function setOpen(open: boolean) {
    consentStore.setState({ open });
  }

  function acceptAll() {
    consentStore.acceptAll(config.categories);
  }

  function declineAll() {
    consentStore.declineAll(config.categories);
  }

  return { ...state, toggle, setOpen, acceptAll, declineAll };
}
