<script lang="ts">
  import router from "src/lib/router";

  export let tabs: any = [];
  router.addRoutes(tabs);
  router.defaultRoute();
  router.start();

  $: selected = $router.selectedRoute;
</script>

<!-- Tabs -->
<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
  <ul id="tabs" class="flex w-full pt-2 pb-5 text-center">
    {#each router.routeList as tab}
      <li
        class="py-2 w-full border-b-2
        {selected === tab ? 'border-b-blue-400' : 'border-b-gray-200'}"
      >
        <button role="tab" data-href="#{tab.route}">{tab.label}</button>
      </li>
    {/each}
  </ul>
  <!-- Tab Contents -->
  <div aria-live="polite" class="overflow-x-auto h-full p-4 rounded-md">
    <svelte:component this={selected.component} {...selected.params} />
  </div>
</div>
