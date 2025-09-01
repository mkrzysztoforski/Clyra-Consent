export type UITranslations = {
  preferencesTitle: string;
  save: string;
  cancel: string;
  required: string;
  acceptAll: string;
  declineAll: string;
};

export const translations: Record<string, UITranslations> = {
  en: {
    preferencesTitle: 'Consent preferences',
    save: 'Save',
    cancel: 'Cancel',
    required: '(required)',
    acceptAll: 'Accept all',
    declineAll: 'Decline all',
  },
  pl: {
    preferencesTitle: 'Ustawienia zgód',
    save: 'Zapisz',
    cancel: 'Anuluj',
    required: '(wymagane)',
    acceptAll: 'Akceptuj wszystkie',
    declineAll: 'Odrzuć wszystkie',
  },
};

export async function loadTranslation(lang: string): Promise<UITranslations> {
  if (translations[lang]) return translations[lang];
  // Fallback to backend/AI translation
  try {
    const res = await fetch(`/api/consent/translations?lang=${lang}`, {
      method: 'POST',
    });
    const data = (await res.json()) as UITranslations;
    translations[lang] = data;
    return data;
  } catch {
    return translations['en'];
  }
}
