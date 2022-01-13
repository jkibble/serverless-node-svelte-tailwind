<script>
  import Editor from "/src/lib/Editor.svelte";
  import Counter from "/src/lib/Counter.svelte";
</script>

<h3 class="font-bold mb-5">Welcome to the three page</h3>

<Counter />

<Editor />

<style>
  h3 {
    @apply mt-5 font-bold;
  }
</style>
