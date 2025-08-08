type ConsentState = {
  open: boolean;
  accepted: Record<string, boolean>;
};

type Listener = (state: ConsentState) => void;

const listeners = new Set<Listener>();

let state: ConsentState = {
  open: false,
  accepted: {},
};

export const consentStore = {
  getState() {
    return state;
  },
  setState(newState: Partial<ConsentState>) {
    state = { ...state, ...newState };
    listeners.forEach((l) => l(state));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
