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
    <a href="/create_leaderboard"><Button class="mb-2 bg-blue-400">Create a new leaderboard</Button></a>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each items as item (item.leaderboard_id)}
      <a href={`/leaderboards/${item.leaderboard_id}`} class="block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div class="bg-muted/50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <!-- Image container with fixed aspect ratio -->
          <div class="relative h-48 overflow-hidden">
            {#if item.creator_avatar_url}
              <img 
                src={item.creator_avatar_url} 
                alt={item.name} 
                class="w-full h-full object-cover"
              />
            {:else}
              <div class="w-full h-full bg-muted/50 flex items-center justify-center">
                <span class="text-gray-200">No image</span>
              </div>
            {/if}
          </div>
          
          <!-- Card content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-200 mb-2">{item.name}</h3>
            <p class="text-gray-600">{item.description}</p>
          </div>
        </div>
      </a>
      {/each}
    </div>

  </div>