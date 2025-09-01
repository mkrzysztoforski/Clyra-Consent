export type ConsentState = {
  open: boolean;
  accepted: Record<string, boolean>;
};

type Listener = (state: ConsentState) => void;

const listeners = new Set<Listener>();
const storageKey = 'consent:accepted';

let state: ConsentState = {
  open: false,
  accepted: {},
};

function notify() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('consent:update', { detail: state }));
  }
  listeners.forEach((l) => l(state));
  try {
    localStorage.setItem(storageKey, JSON.stringify(state.accepted));
  } catch {
    // ignore
  }
}

export const consentStore = {
  getState() {
    return state;
  },
  setState(newState: Partial<ConsentState>) {
    state = { ...state, ...newState };
    notify();
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  init(categories: Record<string, { required?: boolean; default?: boolean }>) {
    let stored: Record<string, boolean> = {};
    try {
      stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      // ignore
    }
    const accepted: Record<string, boolean> = {};
    Object.entries(categories).forEach(([key, cfg]) => {
      if (stored[key] !== undefined) {
        accepted[key] = stored[key];
      } else if (cfg.required) {
        accepted[key] = true;
      } else {
        accepted[key] = !!cfg.default;
      }
    });
    const open = Object.keys(stored).length === 0;
    state = { open, accepted };
    notify();
  },
  acceptAll(categories: Record<string, { required?: boolean }>) {
    const accepted: Record<string, boolean> = {};
    Object.keys(categories).forEach((key) => (accepted[key] = true));
    state = { open: false, accepted };
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('consent:acceptAll', { detail: state }));
    }
    notify();
  },
  declineAll(categories: Record<string, { required?: boolean }>) {
    const accepted: Record<string, boolean> = {};
    Object.entries(categories).forEach(([key, cfg]) => {
      accepted[key] = !!cfg.required;
    });
    state = { open: false, accepted };
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('consent:declineAll', { detail: state }));
    }
    notify();
  },
};
