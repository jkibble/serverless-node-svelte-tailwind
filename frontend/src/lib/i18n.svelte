<script lang="ts">
  import trans from "src/lib/i18n";

  export let key = "";
</script>

{#await trans(key)}
  {key}
{:then value}
  {value}
{:catch error}
  here is the error
  {error}
{/await}
