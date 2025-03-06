<script lang="ts">
    import { PUBLIC_API_DOMAIN } from '$env/static/public';
    import { onMount } from 'svelte';
  
    // Type definitions
    type Mode = 'osu' | 'taiko' | 'fruits' | 'mania';
    type Metric = 'pp' | 'stable_score' | 'lazer_score' | 'classic_score' | 'accuracy' | 'date';
    type ReturnFormat = 'verbose' | 'readable' | 'minimal';
  
    interface RequestData {
      users: number[];
      mode: Mode;
      metric: Metric;
      desc: boolean;
      limit: number;
      mod_filters: string | null;
      score_filters: string | null;
      beatmap_filters: string | null;
      beatmapset_filters: string | null;
      return_format: ReturnFormat;
    }
  
    // Form state
    let users: number[] = [];
    let mode: Mode = "osu";
    let metric: Metric = "pp";
    let desc: boolean = true;
    let limit: number = 50;
    let mod_filters: string | null = null;
    let score_filters: string | null = null;
    let beatmap_filters: string | null = null;
    let beatmapset_filters: string | null = null;
    let return_format: ReturnFormat = "verbose";
  
    // Response state
    let response: any = null;
    let loading: boolean = false;
    let error: string | null = null;
  
    // For users input field
    let usersInput: string = "";
  
    // Parse comma-separated integers for users
    function parseUsers(input: string): number[] {
      if (!input) return [];
      return input.split(',')
        .map(id => id.trim())
        .filter(id => !isNaN(parseInt(id)))
        .map(id => parseInt(id));
    }
  
    function updateUsers(): void {
      users = parseUsers(usersInput);
    }

    function buildQueryString(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays 
          value.forEach((item) => {
            queryParams.append(`${key}`, item.toString());
          });
        } else {
          // Handle all other types
          queryParams.append(key, value.toString());
        }
      }
    });
    
    return queryParams.toString();
  }
  
    // Handle form submission
    async function handleSubmit(): Promise<void> {
      loading = true;
      error = null;
      
      try {
        const requestData: RequestData = {
          users,
          mode,
          metric,
          desc,
          limit,
          mod_filters,
          score_filters,
          beatmap_filters,
          beatmapset_filters,
          return_format
        };

        const queryString = buildQueryString(requestData);

        const url = `${PUBLIC_API_DOMAIN}/stats/get_scores?${queryString}`;
        
        // Replace with your actual API endpoint
        const apiResponse = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          }
        });
        
        if (!apiResponse.ok) {
          throw new Error(`API error: ${apiResponse.status}`);
        }
        
        const data = await apiResponse.json();
        response = data;
      } catch (err) {
        if (err instanceof Error) {
          error = err.message;
        } else {
          error = 'An unknown error occurred';
        }
      } finally {
        loading = false;
      }
    }
  
    onMount(() => {
      // Any initialization code here
    });
  </script>
  
  <div class="flex flex-col md:flex-row w-full max-h-[calc(100vh-70px)]">
    <!-- Request Builder Column -->
    <div class="w-full md:w-full p-6 ">
      <div class="bg-muted/50 relative rounded-lg shadow-md min-h-[calc(100vh-175px)] overflow-y-scroll pb-10 mb-10">
        <div class="absolute w-full pb-6 p-4">
        <span class="absolute right-9 text-xs text-gray-600">Visit the <a class=" italic text-blue-500 hover:underline" href="https://api.enslow.me/docs">docs</a> for syntax and info</span>
        <h1 class="text-2xl font-bold mb-6 text-gray-300">Get Scores</h1>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Users -->
          <div class="space-y-2">
            <label for="users" class="block text-sm font-medium text-gray-700">Users (comma-separated integers)</label>
            <input 
              id="users" 
              type="text" 
              bind:value={usersInput} 
              on:input={updateUsers}
              placeholder="e.g. 10651409, 20085097" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {#if users.length > 0}
              <div class="text-xs text-gray-500">
                Parsed {users.length} user IDs: {users.join(', ')}
              </div>
            {/if}
          </div>
          
          <!-- Mode -->
          <div class="space-y-2">
            <label for="mode" class="block text-sm font-medium text-gray-700">Mode</label>
            <select 
              id="mode" 
              bind:value={mode} 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="osu">osu</option>
              <option value="taiko">taiko</option>
              <option value="fruits">fruits</option>
              <option value="mania">mania</option>
            </select>
          </div>
          
          <!-- Metric -->
          <div class="space-y-2">
            <label for="metric" class="block text-sm font-medium text-gray-700">Metric</label>
            <select 
              id="metric" 
              bind:value={metric} 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="pp">pp</option>
              <option value="stable_score">stable_score</option>
              <option value="lazer_score">lazer_score</option>
              <option value="classic_score">classic_score</option>
              <option value="accuracy">accuracy</option>
              <option value="date">date</option>
            </select>
          </div>
          
          <!-- Desc -->
          <div class="flex items-center">
            <input 
              id="desc" 
              type="checkbox" 
              bind:checked={desc} 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded"
            />
            <label for="desc" class="ml-2 block text-sm text-gray-700">Descending order</label>
          </div>
          
          <!-- Limit -->
          <div class="space-y-2">
            <label for="limit" class="block text-sm font-medium text-gray-700">Limit (max 100)</label>
            <input 
              id="limit" 
              type="number" 
              bind:value={limit} 
              min="1" 
              max="100" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Mod Filters -->
          <div class="space-y-2">
            <label for="mod_filters" class="block text-sm font-medium text-gray-700">Mod Filters</label>
            <input 
              id="mod_filters" 
              type="text" 
              bind:value={mod_filters} 
              placeholder="Enter mod filters" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Score Filters -->
          <div class="space-y-2">
            <label for="score_filters" class="block text-sm font-medium text-gray-700">Score Filters</label>
            <input 
              id="score_filters" 
              type="text" 
              bind:value={score_filters} 
              placeholder="Enter score filters" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Beatmap Filters -->
          <div class="space-y-2">
            <label for="beatmap_filters" class="block text-sm font-medium text-gray-700">Beatmap Filters</label>
            <input 
              id="beatmap_filters" 
              type="text" 
              bind:value={beatmap_filters} 
              placeholder="Enter beatmap filters" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Beatmapset Filters -->
          <div class="space-y-2">
            <label for="beatmapset_filters" class="block text-sm font-medium text-gray-700">Beatmapset Filters</label>
            <input 
              id="beatmapset_filters" 
              type="text" 
              bind:value={beatmapset_filters} 
              placeholder="Enter beatmapset filters" 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <!-- Return Format -->
          <div class="space-y-2">
            <label for="return_format" class="block text-sm font-medium text-gray-700">Return Format</label>
            <select 
              id="return_format" 
              bind:value={return_format} 
              class="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="verbose">verbose</option>
              <option value="readable">readable</option>
              <option value="minimal">minimal</option>
            </select>
          </div>
          
          <!-- Submit Button -->
          <div class="space-y-2">
            <button 
              type="submit" 
              class="w-full p-2 flex justify-center align-middle py-2px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    
    <!-- Results Column -->
    <div class="w-2/3 p-6">
      <div class="bg-muted/50 rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-300">Results</h2>
        
        <!-- This is your results div that you can design later -->
        <div id="results-container" class="relative min-h-[calc(100vh-280px)] overflow-hidden">
          {#if loading}
            <div class="flex items-center justify-center h-64">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          {:else if error}
            <div class="bg-red-50 p-4 rounded-md">
              <div class="flex">
                <div class="text-red-700">
                  <p class="font-medium">Error:</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          {:else if response}
            <pre class="bg-muted/50 p-4 rounded overflow-y-scroll absolute h-full flex">{JSON.stringify(response, null, 2)}</pre>
          {:else}
            <div class="flex items-center justify-center h-64 text-gray-400 italic text-2xl">
              <p>Submit a request to see results!</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>