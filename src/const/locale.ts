import { normalizeLocale, supportLocales } from '@/locales/resources';

export const DEFAULT_LANG = 'en-US';
export const LOCALE_COOKIE = 'CHAT_LOCALE';

/**
 * Check if the language is supported
 * @param locale
 */
export const isLocaleNotSupport = (locale: string) => {
  return normalizeLocale(locale) === DEFAULT_LANG || !supportLocales.includes(locale);
};
