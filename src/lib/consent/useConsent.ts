import { useSyncExternalStore } from "react";
import { consentStore } from "./store";

export function useConsent() {
  const state = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getState,
  );

  function toggle(category: string) {
    const accepted = { ...state.accepted };
    accepted[category] = !accepted[category];
    consentStore.setState({ accepted });
  }

  function setOpen(open: boolean) {
    consentStore.setState({ open });
  }

  return { ...state, toggle, setOpen };
}
