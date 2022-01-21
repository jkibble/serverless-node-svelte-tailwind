import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { writable } from 'svelte/store';

const intl = i18next
  .use(Backend)
  .init({
  // lng: 'fr', // if you're using a language detector, do not define the lng option
  debug: true,
  whitelist: ["en", "fr", "es"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  backend: {
    loadPath: `locales/{{lng}}/{{ns}}.json`,
  }
});

const _ = (key, values) => { return i18next.t(key); };
const store = writable(i18next);
window.foo = i18next;

export { _, intl, store };
