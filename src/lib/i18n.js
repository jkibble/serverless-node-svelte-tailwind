import { createIntl, createIntlCache } from "@formatjs/intl";

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: "fr",
    defaultLocale: "en",
    messages: {
      foo: "here we are {name}",
      placeholder: "input placeholder",
    },
  },
  cache
);

const _ = (string) => intl.formatMessage({ id: string });

export default _;
