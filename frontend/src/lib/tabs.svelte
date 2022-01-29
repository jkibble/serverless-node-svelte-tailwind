<script lang="ts">
  import router from "src/lib/router";
  import { fly } from "svelte/transition";

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
        class="py-2 w-full border border-b-2 border-gray-200 dark:border-gray-700
        {selected === tab ? 'border-b-blue-400' : ''}"
      >
        <button role="tab" class="w-full" data-href="#{tab.route}"
          >{tab.label}</button
        >
      </li>
    {/each}
  </ul>
  <!-- Tab Contents -->
  <div aria-live="polite" class="overflow-x-none h-full p-4 rounded-md">
    {#key selected}
      <div in:fly={{ x: 50 }}>
        <svelte:component this={selected.component} {...selected.params} />
      </div>
    {/key}
  </div>
</div>
