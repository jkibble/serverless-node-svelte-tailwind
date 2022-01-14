<script>
  import _ from "lib/i18n.js";
</script>

<h1>Translations play ground</h1>

<h3>
  {_("foo")}
</h3>

<input type="text" name="" id="" placeholder={_("placeholder")} />

<style>
  h3,
  h1 {
    @apply mt-5 font-bold;
  }

  h1 {
    @apply text-3xl text-red-400;
  }
</style>
