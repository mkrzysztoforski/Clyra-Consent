"use client";
import { useConsent } from "@/lib/consent/useConsent";
import { getConsentConfig } from "@/lib/consent";

export default function ConsentModal() {
  const { open, setOpen, accepted, toggle } = useConsent();
  const cfg = getConsentConfig();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Consent preferences</h2>

        {Object.entries(cfg?.categories ?? {}).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between mb-2">
            <span>{key}</span>
            {value.required ? (
              <span className="text-xs text-gray-500">(required)</span>
            ) : (
              <input
                type="checkbox"
                checked={!!accepted[key]}
                onChange={() => toggle(key)}
              />
            )}
          </div>
        ))}

        <div className="flex gap-2 justify-end mt-6">
          <button
            className="px-4 py-2 rounded border"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-black text-white"
            onClick={() => setOpen(false)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
