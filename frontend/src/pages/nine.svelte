<script>
  import router from "src/lib/router";

  import Email from "src/lib/input/email.svelte";
  import Checkbox from "src/lib/input/checkbox.svelte";
  import Password from "src/lib/input/password.svelte";
  import Search from "src/lib/input/search.svelte";
  import Text from "/../playground/text.svelte";

  import Tabs from "src/lib/tabs.svelte";

  const routes = [
    { route: "Email", label: "Email", component: Email },
    { route: "Checkbox", label: "Checkbox", component: Checkbox },
    { route: "Password", label: "Password test", component: Password },
    { route: "Search", label: "Search box", component: Search },
    {
      route: "Text",
      label: "Playground text",
      params: { value: "foo@bar.com" },
      component: Text,
    },
  ];

  // router.addRoutes(routes);
  // router.defaultRoute();
  // router.start();

  $: selected = $router.selectedRoute;
</script>

<h2><a href="/nine">Simple router test</a></h2>
<h3>And also tabs + router</h3>
<!-- {#each $router.routeList as route}
  <div>
    <a href="#{route.route}">{route.route} test</a>
  </div>
{/each}

<div class="w-1/3 pt-5">
  {#if Object.keys(selected).length > 0}
    <h4>{selected.route}</h4>
    <svelte:component this={selected.component} {...selected.params} />
  {/if}
</div> -->

<div class="w-1/2 pt-5">
  <Tabs tabs={routes} />
</div>
