<script lang="ts">
  import router from "src/lib/router";

  export let tabs: any = [];
  router.addRoutes(tabs);
  router.defaultRoute();
  router.start();

  $: selected = $router.selectedRoute;
</script>

<!-- Tabs -->
<ul id="tabs" class="inline-flex w-full px-1 pt-2 pb-5">
  {#each router.routeList as tab}
    <li
      class="px-4 py-2 font-semibold rounded-t opacity-50 
        {selected === tab ? 'border-b-4 border-blue-400' : ''}"
    >
      <a role="tab" href="#{tab.route}">{tab.label}</a>
    </li>
  {/each}
</ul>

<!-- Tab Contents -->
<div class="border border-gray-500 overflow-x-auto h-full p-5 rounded-md">
  <svelte:component this={selected.component} {...selected.params} />
</div>
