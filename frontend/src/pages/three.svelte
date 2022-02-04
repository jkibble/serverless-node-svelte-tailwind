<script>
  import Editor from "/src/lib/Editor.svelte";
  import Counter from "/src/lib/Counter.svelte";
</script>

<h3 class="mb-5 font-bold">Welcome to the three page</h3>

<Counter />

<Editor />

<style>
  h3 {
    @apply mt-5 font-bold;
  }
</style>
