<script>
  import Email from "src/lib/input/email.svelte";
  import Checkbox from "src/lib/input/checkbox.svelte";
  import Password from "src/lib/input/password.svelte";
  import Search from "src/lib/input/search.svelte";
  import Table from "src/lib/Table.svelte";
  import Text from "/../playground/text.svelte";

  import Tabs from "src/lib/tabs.svelte";

  const routes = [
    { route: "Email", label: "Email", component: Email },
    { route: "Checkbox", label: "Checkbox", component: Checkbox },
    { route: "Password", label: "Password test", component: Password },
    { route: "Search", label: "Search box", component: Search },
    { route: "Table", label: "Table", component: Table },
    {
      route: "Text",
      label: "Playground text",
      params: { value: "foo@bar.com" },
      component: Text,
    },
  ];
</script>

<svelte:head>
  <title>Tabs and Router Test</title>
</svelte:head>

<h2><a href="/nine">Tabs + router test</a></h2>

<div class="w-1/2 pt-5">
  <Tabs tabs={routes} />
</div>
