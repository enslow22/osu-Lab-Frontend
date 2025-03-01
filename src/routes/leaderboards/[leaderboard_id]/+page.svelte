<script lang="ts">
    import ModeIcon from "$lib/components/mode-icon.svelte";
    import { BarChart, Tooltip } from "layerchart";
    import { bin } from 'd3-array';
    import { Separator } from "$lib/components/ui/separator/index.js";

    let { data } = $props()
    let leaderboardInfo = data.leaderboardInfo

    let metricUnit = ''
    let metricXAxis = ''
    let metricTitle = ''

    if (leaderboardInfo.metric == 'weighted_pp') {
        metricUnit = 'pp'
        metricXAxis = 'Profile pp'
        metricTitle = 'Distribution of Profile pp for '+leaderboardInfo.name
    }
    else if (leaderboardInfo.metric == 'count_unique_beatmaps') {
        metricUnit = ' Maps'
        metricXAxis = 'Maps Cleared'
        metricTitle = 'Distribution of Number of maps cleared for '+leaderboardInfo.name
    }

    // Helper function to format boolean values
    const formatBoolean = (value: boolean) => value ? 'Yes' : 'No';
    
    // Helper function to handle null values
    const formatNullable = (value: boolean) => value === null ? 'Not set' : value;

    let thresholds: number = 10;

    /**
     * 
  $: binByWeight = bin<(typeof data.olympians)[0], number>()
    .value((d) => d.weight)
    .thresholds(thresholds);
  $: olympiansBins = binByWeight(data.olympians);
     * 
     * 
     */

    console.log(leaderboardInfo.users)

    let binByValue = $state(bin<(typeof leaderboardInfo.users)[0], number>().value((d) => d.value).thresholds(thresholds))
    let userBins = $derived(binByValue(leaderboardInfo.users))
</script>



<div class="flex flex-col md:flex-row h-[calc(100vh-65px)] gap-4 p-2">
    <!-- Left Section (Two stacked divs) - Now wider -->
    <div class="w-full md:w-3/4 h-full flex flex-col gap-4">
      <!-- Top Left Div -->
      <div class="flex flex-row gap-4">
      <div class="w-1/3 bg-muted/50 rounded-lg shadow-md overflow-hidden">
        <!-- Header section -->
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-600">
          <h2 class="text-xl font-semibold">{leaderboardInfo.name}</h2>
          <ModeIcon mode={leaderboardInfo.mode} width={25}/>
        </div>
        
        <!-- Description section -->
        <div class="px-6 py-3 border-b border-gray-600">
          <p class=" font-thin">{leaderboardInfo.description}</p>
        </div>
        
        <!-- Main details grid -->
        <div class="px-6 py-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-gray-500 block">ID</span>
              <span class="font-medium">{leaderboardInfo.leaderboard_id}</span>
            </div>
            
            <div>
              <span class="text-xs text-gray-500 block">Metric</span>
              <span class="font-medium">{leaderboardInfo.metric}</span>
            </div>
            
            <div>
              <span class="text-xs text-gray-500 block">Unique Maps</span>
              <span class="font-medium">{formatBoolean(leaderboardInfo.unique)}</span>
            </div>
            
            <div>
              <span class="text-xs text-gray-500 block">Private</span>
              <span class="font-medium">{formatBoolean(leaderboardInfo.private)}</span>
            </div>
          </div>
          
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="text-xs text-gray-500 block">Mod Filters</span>
                  <span class="font-medium italic text-gray-400">{formatNullable(leaderboardInfo.mod_filters)}</span>
                </div>
                
                <div>
                  <span class="text-xs text-gray-500 block">Score Filters</span>
                  <span class="font-medium italic text-gray-400">{formatNullable(leaderboardInfo.score_filters)}</span>
                </div>
                
                <div>
                  <span class="text-xs text-gray-500 block">Beatmap Filters</span>
                  <span class="font-medium italic text-gray-400">{formatNullable(leaderboardInfo.beatmap_filters)}</span>
                </div>
                
                <div>
                  <span class="text-xs text-gray-500 block">Beatmapset Filters</span>
                  <span class="font-medium italic text-gray-400">{formatNullable(leaderboardInfo.beatmapset_filters)}</span>
                </div>
              </div>
            </div>

        </div>
        
        <!-- Creator section -->
        <div class="px-6 py-3 border-t border-gray-600">
          <div class="flex items-center relative">
            
            <h2 class="text-gray-400 text-xs italic mr-3 pr-3 border-r-2 border-gray-600">Leaderboard Owner </h2>
            <img 
              class="w-8 h-8 rounded-full mr-3" 
              src={leaderboardInfo.creator.avatar_url} 
              alt={leaderboardInfo.creator.username} 
            />
            <div>
              <a href="https://osu.ppy.sh/users/{leaderboardInfo.user_id}"><p class="text-sm font-medium">{leaderboardInfo.creator.username}</p></a>
              <p class="text-xs text-gray-500">ID: {leaderboardInfo.creator.user_id}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3 bg-muted/50 rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-600">
          <h2 class="text-xl font-semibold">Graph here</h2>
        </div>
      </div>
    </div>
      
      <!-- Bottom Left Div -->
      <div class="border bg-muted/50 rounded-lg shadow-md flex-1">
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-600">
          <h2 class="text-xl font-semibold">{metricTitle}</h2>
        </div>
        <div class=" h-[80%] p-4 rounded">
        <BarChart
            data={userBins}
            x="x0"
            y="length"
            props={{
              xAxis: { tweened: true },
              yAxis: { format: "metric",  tweened: true },
              bars: { tweened: true, class: " fill-blue-500" },
            }}
          >
            <svelte:fragment slot="tooltip">
              <Tooltip.Root let:data>
                <Tooltip.Header class="text-center"
                  >{data.x0 + " - " + (data.x1 - 1)}</Tooltip.Header
                >
                <Tooltip.List>
                  <Tooltip.Item label="count" value={data.length} format="integer" />
                  <Tooltip.Separator />
                  {#each data.slice(0, 5) as d}
                    <Tooltip.Item label={d.username} value={d.value} />
                  {/each}
                  {#if data.length > 5}
                    <span></span>
                    <span>...</span>
                  {/if}
                </Tooltip.List>
              </Tooltip.Root>
            </svelte:fragment>
          </BarChart>
          <p class="text-center font-semibold text-xl">{metricXAxis}</p>
        </div>
      </div>
    </div>
    
    <!-- Right Section (One full-height div) - Now thinner -->
    <div class="w-full border bg-muted/50 md:w-1/4 rounded-lg shadow-md p-6 flex-1 overflow-auto">
      <h2 class="text-2xl bg-muted/100 text-center rounded">Leaderboard</h2>
      <div class="grid gap-1 pt-2">
        {#each leaderboardInfo.users as item, index}
          <div class="bg-muted/50 flex shadow-md rounded-lg p-2 hover:shadow-lg transition-shadow duration-300">
            <img class="mr-3 rounded-full h-10 w-10" src="{item.avatar_url}" alt="{item.username}'s avatar">
            <div class=" overflow-hidden">
            <a href="https://osu.ppy.sh/users/{item.user_id}"><h2 class="text-sm font-semibold text-gray-200">{item.username}</h2>
            <p class="text-gray-600 text-xs text-nowrap"><span class=" text-gray-500">#{index + 1} | </span> {item.value}{metricUnit}</p></a></div>
          </div>
        {/each}
      </div>
    </div>
</div>