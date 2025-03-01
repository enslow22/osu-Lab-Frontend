<script>
    import Button from "$lib/components/ui/button/button.svelte";

    let { data } = $props()

    /** Sample list data - replace with your actual data
    let items = [
      { id: 1, title: "Item One", description: "First item description" },
      { id: 2, title: "Item Two", description: "Second item description" },
      { id: 3, title: "Item Three", description: "Third item description" },
      { id: 4, title: "Item Four", description: "Fourth item description" }
    ];*/

    let items = data.leaderboards

  </script>
  
  <div class="p-4">
    <a href="/create_leaderboard"><Button class="mb-2">Create a new leaderboard</Button></a>
    
    <div class="grid gap-4">
      {#each items as item, index}
        <div class="bg-muted/50 shadow-md rounded-lg p-2 hover:shadow-lg transition-shadow duration-300">
          <a href="/leaderboards/{item.leaderboard_id}"><h2 class="text-lg font-semibold text-gray-200">{item.username}</h2>
          <p class="text-gray-600 mt-2">{item.description}</p></a>
          <div class="text-sm text-gray-500 mt-2">Item #{index + 1}</div>
        </div>
      {/each}
    </div>
    
    {#if items.length === 0}
      <div class="bg-gray-100 p-4 rounded-md text-gray-500 text-center">
        No items found.
      </div>
    {/if}
  </div>