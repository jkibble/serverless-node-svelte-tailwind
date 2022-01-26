<script>
  import Email from "/src/lib/input/email.svelte";
  import Checkbox from "/src/lib/input/checkbox.svelte";
  import Password from "/src/lib/input/password.svelte";
  import Search from "/src/lib/input/search.svelte";
  import Date from "/src/lib/input/date.svelte";
  import Datalist from "/src/lib/input/datalist.svelte";
  import { t } from "/src/lib/i18n";

  const options = [
    { id: "au", value: "Australia" },
    { id: "be", value: "Belgium" },
    { id: "ca", value: "Canada" },
    { id: "cn", value: "China" },
    { id: "fr", value: "France" },
    { id: "de", value: "Germany" },
    { id: "it", value: "Italy" },
    { id: "mx", value: "Mexico" },
    { id: "es", value: "Spain" },
    { id: "tr", value: "Turkey" },
    { id: "gb", value: "United Kingdom" },
    { id: "us", value: "United States" },
  ];

  let form;
</script>

<h2>Different Input Components</h2>

<div class="grid gap-3 xl:grid-cols-2 sm:grid-cols-1">
  <form
    action="/post"
    method="POST"
    novalidate="true"
    bind:this={form}
    on:submit={() => form.checkValitity()}
  >
    <Email label={t("Email")} name="email" required="true" />
    <Checkbox label={t("Checkbox")} name="checkbox" />
    <Password label={t("Password")} name="password" required="true" />
    <Search label={t("Search (not required)")} name="search" />
    <Date label={t("Date")} name="date" required="true" />
    <Datalist {options} label={t("Datalist")} required="true" />
    <input type="submit" class="btn" value="send" />
  </form>
</div>
