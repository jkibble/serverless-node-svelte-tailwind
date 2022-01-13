<script lang="ts">
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
</script>

<h1>Translations play ground</h1>
<h3>
  {intl.formatRelativeTime(-10, "day", { style: "narrow" })}
</h3>
<h3>{intl.formatTime("2020/01/01 02:01:01:00")}</h3>

<h3>
  {intl.formatNumber(1000, {
    style: "unit",
    unit: "megabyte",
    unitDisplay: "narrow",
  })}
</h3>

<h4>
  {intl.formatMessage({ id: "foo" }, { name: "John" })}
</h4>

<input
  type="text"
  name=""
  id=""
  placeholder={intl.formatMessage({ id: "placeholder" })}
/>

<style>
  h3,
  h1 {
    @apply mt-5 font-bold;
  }

  h1 {
    @apply text-3xl text-red-400;
  }
</style>
