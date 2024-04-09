import resources from './default';

export const locales = [
  'bg-BG',
  'de-DE',
  'en-US',
  'ja-JP',
  'ko-KR',
  'ru-RU',
  'zh-CN',
  'zh-TW',
] as const;

export type DefaultResources = typeof resources;
export type Locales = (typeof locales)[number];

export const normalizeLocale = (locale?: string) => {
  if (!locale) return 'en-US';

  switch (locale) {
    case 'zh-CN':
    case 'zh': {
      return 'zh-CN';
    }

    case 'de': {
      return 'de-DE';
    }

    case 'ru': {
      return 'ru-RU';
    }

    case 'en': {
      return 'en-US';
    }

    default: {
      return locale;
    }
  }
};

type LocaleOptions = {
  check: boolean;
  label: string;
  value: Locales;
}[];

export const localeOptions: LocaleOptions = [
  {
    label: 'English',
    value: 'en-US',
  },
  {
    check: true,
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    check: false,
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    check: false,
    label: '日本語',
    value: 'ja-JP',
  },
  {
    check: false,
    label: '한국어',
    value: 'ko-KR',
  },
  {
    check: false,
    label: 'Deutsch',
    value: 'de-DE',
  },
  {
    check: false,
    label: 'Русский',
    value: 'ru-RU',
  },
  {
    check: false,
    label: 'Български',
    value: 'bg-BG',
  },
] as LocaleOptions;

export const supportLocales: string[] = [...locales, 'en', 'zh'];
