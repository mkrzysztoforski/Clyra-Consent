import { useConsent } from './useConsent';

export default function Widget() {
  const { open, setOpen } = useConsent();

  if (open) return null;

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-xl z-50"
    >
      cookie
    </button>
  );
}
