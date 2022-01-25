<script>
  // @ts-ignore
  import { t } from "/src/lib/i18n";
</script>

<h1>Translations play ground</h1>

<h3>
  {t("foo")}
</h3>

<input type="text" name="" id="" placeholder={t("placeholder")} />

<p>
  {t("some ready long text like a paragraph for {name}, age: {age}", {
    name: "John",
    age: "25",
  })}
</p>

<style>
  h3,
  h1 {
    @apply mt-5 font-bold;
  }

  h1 {
    @apply text-3xl text-red-400;
  }
</style>
