<script lang="ts">
  import Counter from "/src/lib/Counter.svelte";
  import Editor from "/src/lib/Editor.svelte";
  import Table from "/src/lib/Table.svelte";

  let selected: string = "tab1";
  let component = Counter;

  const tabs = [
    {
      id: "tab1",
      label: "Tab 1",
      component: Counter,
    },
    {
      id: "tab2",
      label: "Tab 2",
      component: Editor,
    },
    {
      id: "tab3",
      label: "Tab 3",
      component: Table,
    },
  ];

  const selectTab = (tabId: string): void => {
    selected = tabId;

    component = tabs.find((tab) => tab.id === tabId)?.component;
  };
</script>

<div class="w-1/2 mt-4 rounded">
  <!-- Tabs -->
  <ul id="tabs" class="inline-flex w-full px-1 pt-2 pb-5">
    {#each tabs as tab}
      <li
        class="px-4 py-2 font-semibold rounded-t opacity-50 
        {selected == tab.id ? 'border-b-4 border-blue-400' : ''}"
      >
        <button role="tab" id={tab.id} on:click={() => selectTab(tab.id)}
          >{tab.label}</button
        >
      </li>
    {/each}
  </ul>

  <!-- Tab Contents -->
  <div class="border border-gray-500 overflow-x-auto h-full p-2">
    <svelte:component this={component} />
  </div>
</div>
