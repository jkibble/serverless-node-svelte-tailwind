<script>
  import router from "src/lib/router";

  import Email from "src/lib/input/email.svelte";
  import Checkbox from "src/lib/input/checkbox.svelte";
  import Password from "src/lib/input/password.svelte";
  import Search from "src/lib/input/search.svelte";
  import Date from "src/lib/input/date.svelte";
  import Datalist from "src/lib/input/datalist.svelte";

  router.addRoutes([
    { route: "Email", component: Email },
    { route: "Checkbox", component: Checkbox },
    { route: "Password", component: Password },
    { route: "Search", component: Search },
    { route: "Date", component: Date },
    { route: "Datalist", component: Datalist },
  ]);

  setTimeout(() => {
    router.addRoute({
      route: "jello",
      component: Datalist,
    });
    console.log("route added");
  }, 500);

  router.start();
</script>

<h2><a href="/nine">Simple router test</a></h2>
{#each $router.routeList as route}
  <div>
    <a href="#{route.route}">{route.route} test</a>
  </div>
{/each}

<div class="w-1/3 pt-5">
  {#if Object.keys($router.selectedRoute).length > 0}
    <h4>{$router.selectedRoute.route}</h4>
    <svelte:component this={$router.selectedRoute.component} />
  {/if}
</div>
