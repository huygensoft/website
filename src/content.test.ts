import { afterEach, describe, expect, it } from 'vitest';
import { detectBrowserLocale, isLocale, localeOptions, translations } from './content';

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

afterEach(() => {
  if (originalNavigator) {
    Object.defineProperty(globalThis, 'navigator', originalNavigator);
  } else {
    Reflect.deleteProperty(globalThis, 'navigator');
  }
});

describe('localized language packs', () => {
  it.each([
    { code: 'yo', label: 'Yorùbá', tag: 'yo' },
    { code: 'ig', label: 'Igbo', tag: 'ig' },
    { code: 'it', label: 'Italiano', tag: 'it-IT' },
    { code: 'nl', label: 'Nederlands', tag: 'nl-NL' },
  ] as const)('registers $label as a complete locale', ({ code, label, tag }) => {
    expect(localeOptions).toContainEqual(expect.objectContaining({ code, label, tag, direction: 'ltr' }));
    expect(isLocale(code)).toBe(true);
    expect(translations[code].home.title).not.toBe(translations.en.home.title);
    expect(translations[code].contact.submit).not.toBe(translations.en.contact.submit);
    expect(translations[code].nav.skipToContent).not.toBe(translations.en.nav.skipToContent);
  });

  it.each([
    ['yo-NG', 'yo'],
    ['ig-NG', 'ig'],
    ['it-IT', 'it'],
    ['nl-NL', 'nl'],
  ] as const)('detects %s as %s', (browserLocale, expectedLocale) => {
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { languages: [browserLocale] } });

    expect(detectBrowserLocale()).toBe(expectedLocale);
  });
});
