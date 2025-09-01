import { useEffect, useState } from 'react';
import { useConsent } from './useConsent';
import { getConfig } from './config';
import { loadTranslation, UITranslations } from './translations';

export default function Modal() {
  const { open, setOpen, accepted, toggle, acceptAll, declineAll } = useConsent();
  const cfg = getConfig();
  const [t, setT] = useState<UITranslations>();

  useEffect(() => {
    loadTranslation(cfg.lang || 'en').then(setT);
  }, [cfg.lang]);

  if (!open || !t) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{t.preferencesTitle}</h2>

        {Object.entries(cfg.categories).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between mb-2">
            <span>{value.label[cfg.lang || 'en'] || key}</span>
            {value.required ? (
              <span className="text-xs text-gray-500">{t.required}</span>
            ) : (
              <input
                type="checkbox"
                checked={!!accepted[key]}
                onChange={() => toggle(key)}
              />
            )}
          </div>
        ))}

        <div className="flex gap-2 justify-end mt-6 flex-wrap">
          <button
            className="px-4 py-2 rounded border"
            onClick={() => {
              declineAll();
              setOpen(false);
            }}
          >
            {t.declineAll}
          </button>
          <button
            className="px-4 py-2 rounded border"
            onClick={() => {
              acceptAll();
              setOpen(false);
            }}
          >
            {t.acceptAll}
          </button>
          <button
            className="px-4 py-2 rounded border"
            onClick={() => setOpen(false)}
          >
            {t.cancel}
          </button>
          <button
            className="px-4 py-2 rounded bg-black text-white"
            onClick={() => setOpen(false)}
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
