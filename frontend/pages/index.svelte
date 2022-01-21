<script>
  import { _, store } from "/lib/i18n";
</script>

<h1>Translations play ground</h1>

<h3>
  {$store.t("foo", { name: window.user.email })}
</h3>

<input type="text" name="" id="" placeholder={$store.t("placeholder")} />

<p>
  {$store.t("some ready long text like a paragraph for {name}, age: {age}", {
    name: window.user.email,
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
