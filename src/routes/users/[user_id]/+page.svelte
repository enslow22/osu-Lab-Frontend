<script lang="ts">
    import { format, PeriodType } from '@layerstack/utils';
    import { Axis, Bars, Chart, LineChart, PieChart, Svg, Tooltip, Highlight, BarChart, Grid } from "layerchart";
    import ModeIcon from "$lib/components/mode-icon.svelte";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { quantize } from 'd3-interpolate';
    import { interpolateRainbow } from 'd3-scale-chromatic';
    import Autoplay from "embla-carousel-autoplay";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import CarouselItem from '$lib/components/ui/carousel/carousel-item.svelte';
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import utc from "dayjs/plugin/utc";
    import { Clock, Snowflake, Sparkles } from 'lucide-svelte';

    dayjs.extend(relativeTime)
    dayjs.extend(utc)

    let { data } = $props()
    //console.log(data.userSummary)
    let selectedMode = $state("osu")

    let user_info = $state(data.userSummary.user_info)

    let modThreshold = $state(10)
    let ppTimeMax = $derived(data.scoreHistory[selectedMode].scores.length)
    let ppTimeEnds = $state([0, data.scoreHistory[selectedMode].scores.length]);

    let histogramMetric = $state("pp_distribution")
    let histogramBinWidth = $derived(data.userSummary[selectedMode][histogramMetric][1].bin_floor - data.userSummary[selectedMode][histogramMetric][0].bin_floor)

    let ppHistogramEnds = $state([0, data.userSummary[selectedMode]["pp_distribution"].length])
    let ppHistogramMax = $derived(data.userSummary[selectedMode]["pp_distribution"].length)
    let accHistogramEnds = $state([0, data.userSummary[selectedMode]["acc_distribution"].length])
    let accHistogramMax = $derived(data.userSummary[selectedMode]["acc_distribution"].length)
    
    let modeIconClasses = $derived({
      osu: selectedMode == "osu" ? "fill-pink-400" : "fill-gray-500 hover:fill-pink-400",
      taiko: selectedMode == "taiko" ? "fill-green-300" : "fill-gray-500 hover:fill-green-300",
      fruits: selectedMode == "fruits" ? "fill-blue-300" : "fill-gray-500 hover:fill-blue-300",
      mania: selectedMode == "mania" ? "fill-purple-300" : "fill-gray-500 hover:fill-purple-300",
    })

    // TODO:
    // We also need to set up a /get_user_stats endpoint on the api. This will return a bunch of random stuff people might care about. Who knows. 
    
    Object.keys(data.scoreHistory).forEach((key, index) => {
      data.scoreHistory[key].scores = data.scoreHistory[key].scores.map(({date, max_pp}: {date: string, max_pp: number}) => ({ date: new Date(Date.parse(date)), max_pp: max_pp }))
    })

    // TODO: 
    // Add an ignore CL option (HD and HD CL count add to the same total)
    // Add a slider for a threshold (Only display numbers above a certain amount)
    //console.log(data.userSummary[selectedMode].acc_distribution)
    //console.log(data.userSummary)
    //data.userSummary[selectedMode].count_ranks

    function reset_sliders() {
      ppTimeEnds[0] = 0;
      ppTimeEnds[1] = ppTimeMax;
      ppHistogramEnds[0] = 0;
      ppHistogramEnds[1] = ppHistogramMax;
      accHistogramEnds[0] = 0;
      accHistogramEnds[1] = accHistogramMax;
    }
    let dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }
</script>

<div class="flex-1 flex flex-col m-3 p-3 gap-3">
  <div class="flex flex-1 gap-3 ">
    <div class="w-3/5 border rounded relative bg-slate-900">
      <div class="absolute right-3 flex flex-row gap-1 m-2 mt-4">
        <button onclick={() => {selectedMode="osu"; reset_sliders();}}>
        <ModeIcon mode={'osu'} classes={modeIconClasses.osu} width={40}/></button>
        <button onclick={() => {selectedMode="taiko"; reset_sliders();}}>
        <ModeIcon mode={'taiko'} classes={modeIconClasses.taiko} width={40}/></button>
        <button onclick={() => {selectedMode="fruits"; reset_sliders();}}>
        <ModeIcon mode={'fruits'} classes={modeIconClasses.fruits} width={40}/></button>
        <button onclick={() => {selectedMode="mania"; reset_sliders();}}>
        <ModeIcon mode={'mania'} classes={modeIconClasses.mania} width={40}/></button>
      </div>
      <div class="bg-gradient-to-br from-slate-800 to-indigo-950 rounded-lg m-2 shadow-md p-6 mb-6 flex items-center border-l-4 border-gray-600">
        <img src={user_info.avatar_url} alt={user_info.username} class="w-24 h-24 rounded-full border-4 border-blue-500">
        <div class="ml-6">
          <h1 class="text-3xl font-bold text-gray-300">{user_info.username}</h1>
          <div class="flex items-center mt-2">
            <div class="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
              {data.userSummary[selectedMode].num_scores} Scores on {data.userSummary[selectedMode].num_beatmaps} Beatmaps
            </div>
          </div>
        </div>
      </div>

      <Carousel.Root class="w-full p-2" plugins={[
        Autoplay({
          delay: 7000,
        }),
      ]} opts={{
        loop: true,
      }}>
        <Carousel.Content>
            <Carousel.Item>
              <div class="gap-1 items-center bg-gradient-to-br from-slate-800 to-indigo-950 rounded-lg p-6 border-l-4 border-gray-600 flex-row flex flex-1 justify-end">
              <div class="h-44 w-1/2">
                <h2 class="text-xl font-bold text-gray-400 mb-4 flex items-center">
                  <Snowflake class="h-6 w-6 mr-2 text-blue-400"/>
                  Oldest Score&nbsp;<span class="font-extrabold"> ({dayjs.utc().to(dayjs.utc(data.userSummary[selectedMode].oldest_score.date))})</span>
                </h2>
                <div class="space-y-2">
                  <p class="font-semibold text-lg text-gray-400">{data.userSummary[selectedMode].oldest_score.artist} - {data.userSummary[selectedMode].oldest_score.title} <span class="text-gray-400 font-normal">[{data.userSummary[selectedMode].oldest_score.version}] | ★{data.userSummary[selectedMode].oldest_score.stars.toFixed(2)}</span></p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="px-2 py-1 bg-blue-800 text-blue-100 text-xs rounded-full">
                      {data.userSummary[selectedMode].oldest_score.maxcombo} / {data.userSummary[selectedMode].oldest_score.max_combo} combo
                    </span>
                    <span class="px-2 py-1 bg-green-800 text-green-100 text-xs rounded-full">
                      {(data.userSummary[selectedMode].oldest_score.accuracy * 100).toFixed(2)}%
                    </span>
                    <span class="px-2 py-1 bg-purple-800 text-purple-100 text-xs rounded-full">
                      Rank: {data.userSummary[selectedMode].oldest_score.rank}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      Mods: {(data.userSummary[selectedMode].oldest_score.enabled_mods)}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      &#123;{data.userSummary[selectedMode].oldest_score.count300}/{data.userSummary[selectedMode].oldest_score.count100}/{data.userSummary[selectedMode].oldest_score.count50}/{data.userSummary[selectedMode].oldest_score.countmiss}&#125;
                    </span>
                    </div>
                  <p class="text-gray-500 text-sm mt-2">
                    {new Date(data.userSummary[selectedMode].oldest_score.date).toLocaleString("en-US", dateOptions)}
                  </p>
                </div>
              </div>
              <a href="https://osu.ppy.sh/beatmapsets/{data.userSummary[selectedMode].oldest_score.beatmapset_id}" class="w-1/2 bg-cover">
                <img class="rounded-lg drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_0px_10px_rgba(255,255,255,0.25)] duration-300 ease-out" src="https://assets.ppy.sh/beatmaps/{data.userSummary[selectedMode].oldest_score.beatmapset_id}/covers/cover.jpg" alt="Oldest score cover">
              </a>
              </div>
              
            </Carousel.Item>
            <CarouselItem>
              <div class="  items-center bg-gradient-to-br from-slate-800 to-indigo-950 rounded-lg shadow-md p-6 border-l-4 border-gray-600 flex-row flex flex-1 justify-end">
                <div class="h-44 w-1/2">
                <h2 class="text-xl font-bold text-gray-400 mb-4 flex items-center">
                  <Sparkles class="h-6 w-6 mr-2 text-yellow-500" />
                  Highest pp Score&nbsp;<span class="font-extrabold">({data.userSummary[selectedMode].highest_pp.pp.toFixed(2)}pp)</span>
                </h2>
                <div class="space-y-2">
                  <p class="font-semibold text-lg text-gray-400">{data.userSummary[selectedMode].highest_pp.artist} - {data.userSummary[selectedMode].highest_pp.title} <span class="text-gray-400 font-normal">[{data.userSummary[selectedMode].highest_pp.version}] | ★{data.userSummary[selectedMode].highest_pp.stars.toFixed(2)}</span></p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="px-2 py-1 bg-blue-800 text-blue-100 text-xs rounded-full">
                      {data.userSummary[selectedMode].highest_pp.maxcombo} / {data.userSummary[selectedMode].highest_pp.max_combo} combo
                    </span>
                    <span class="px-2 py-1 bg-green-800 text-green-100 text-xs rounded-full">
                      {(data.userSummary[selectedMode].highest_pp.accuracy * 100).toFixed(2)}%
                    </span>
                    <span class="px-2 py-1 bg-purple-800 text-purple-100 text-xs rounded-full">
                      Rank: {data.userSummary[selectedMode].highest_pp.rank}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      Mods: {(data.userSummary[selectedMode].highest_pp.enabled_mods)}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      &#123;{data.userSummary[selectedMode].highest_pp.count300}/{data.userSummary[selectedMode].highest_pp.count100}/{data.userSummary[selectedMode].highest_pp.count50}/{data.userSummary[selectedMode].highest_pp.countmiss}&#125;
                    </span>
                    </div>
                  <p class="text-gray-500 text-sm mt-2">
                    {new Date(data.userSummary[selectedMode].highest_pp.date).toLocaleString("en-US", dateOptions)}
                  </p>
                </div>
            </div>
            <a href="https://osu.ppy.sh/beatmapsets/{data.userSummary[selectedMode].highest_pp.beatmapset_id}" class="w-1/2 bg-cover">
              <img class="rounded-lg drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_0px_10px_rgba(255,255,255,0.25)] duration-300 ease-out" src="https://assets.ppy.sh/beatmaps/{data.userSummary[selectedMode].highest_pp.beatmapset_id}/covers/cover.jpg" alt="Highest pp score cover">
            </a>
            </div>
            </CarouselItem>
            <CarouselItem>
              <div class="items-center bg-gradient-to-br from-slate-800 to-indigo-950 rounded-lg shadow-md p-6 border-l-4 border-gray-600 flex-row flex flex-1 justify-end">
                <div class="h-44 w-1/2">
                <h2 class="text-xl font-bold text-gray-400 mb-4 flex items-center">
                  <Clock class="h-6 w-6 mr-2 text-gray-300"/>
                  Newest Score&nbsp;<span class="font-extrabold">({dayjs.utc().to(dayjs.utc(data.userSummary[selectedMode].newest_score.date))})</span>
                </h2>
                <div class="space-y-2">
                  <p class="font-semibold text-lg text-gray-400">{data.userSummary[selectedMode].newest_score.artist} - {data.userSummary[selectedMode].newest_score.title} <span class="text-gray-400 font-normal">[{data.userSummary[selectedMode].newest_score.version}] | ★{data.userSummary[selectedMode].newest_score.stars.toFixed(2)}</span></p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="px-2 py-1 bg-blue-800 text-blue-100 text-xs rounded-full">
                      {data.userSummary[selectedMode].newest_score.maxcombo} / {data.userSummary[selectedMode].newest_score.max_combo} combo
                    </span>
                    <span class="px-2 py-1 bg-green-800 text-green-100 text-xs rounded-full">
                      {(data.userSummary[selectedMode].newest_score.accuracy * 100).toFixed(2)}%
                    </span>
                    <span class="px-2 py-1 bg-purple-800 text-purple-100 text-xs rounded-full">
                      Rank: {data.userSummary[selectedMode].newest_score.rank}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      Mods: {(data.userSummary[selectedMode].newest_score.enabled_mods)}
                    </span>
                    <span class="px-2 py-1 bg-gray-800 text-gray-100 text-xs rounded-full">
                      &#123;{data.userSummary[selectedMode].newest_score.count300}/{data.userSummary[selectedMode].newest_score.count100}/{data.userSummary[selectedMode].newest_score.count50}/{data.userSummary[selectedMode].newest_score.countmiss}&#125;
                    </span>
                    </div>
                  <p class="text-gray-500 text-sm mt-2">
                    {new Date(data.userSummary[selectedMode].newest_score.date).toLocaleString("en-US", dateOptions)}
                  </p>
                </div>
              </div>
              <a href="https://osu.ppy.sh/beatmapsets/{data.userSummary[selectedMode].newest_score.beatmapset_id}" class="w-1/2 bg-cover">
                <img class="rounded-lg drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_0px_10px_rgba(255,255,255,0.25)] duration-300 ease-out" src="https://assets.ppy.sh/beatmaps/{data.userSummary[selectedMode].newest_score.beatmapset_id}/covers/cover.jpg" alt="Oldest score cover">
              </a>
            </div>
            </CarouselItem>
        </Carousel.Content>
      </Carousel.Root>
    </div>
  
    <div class="w-2/5 p-3 border rounded bg-slate-900">
      <Select.Root type="single" name="histogramMetric" bind:value={histogramMetric}>
        <Select.Trigger class="w-[180px]">
          {histogramMetric}
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.GroupHeading>Histogram Metric</Select.GroupHeading>
            <Select.Item value={"pp_distribution"} label={"pp"}>{"pp"}</Select.Item>
            <Select.Item value={"acc_distribution"} label={"accuracy"}>{"accuracy"}</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>

      <div class="h-[300px] p-4 rounded overflow-auto ">
        <BarChart
        data={histogramMetric == "pp_distribution" ? data.userSummary[selectedMode]["pp_distribution"].slice(ppHistogramEnds[0], ppHistogramEnds[1]) : data.userSummary[selectedMode]["acc_distribution"].slice(accHistogramEnds[0], accHistogramEnds[1])}
        x="bin_floor"
        y="count"
        yDomain={[0, null]}
        yNice={4}
        padding={{ left: 16, bottom: 24 }}
        tooltip={{ mode: "band" }}
      >
      <Svg>
        <Grid x xTicks={20} />
        <Axis placement="left" grid rule/>
        <Axis
          placement="bottom"
          rule
          ticks={4}
          format={(v => {return histogramMetric == "pp_distribution" ? v : `${(v*100).toFixed(0)}%`})}
        />
        <Bars strokeWidth={1} class="fill-blue-500" />
        <Highlight area />
      </Svg>
      <Tooltip.Root let:data>
        <Tooltip.Header>
          {histogramMetric == "pp_distribution" ? `[${data.bin_floor.toFixed(0)}pp - ${(data.bin_floor+histogramBinWidth).toFixed(0)}pp]` : `[${(data.bin_floor*100).toFixed(1)}% - ${((data.bin_floor+histogramBinWidth)*100).toFixed(1)}%)`}
        </Tooltip.Header>
        <Tooltip.List>
          <Tooltip.Item label="count" value={data.count} />
        </Tooltip.List>
      </Tooltip.Root>
      </BarChart>
    </div>
        {#if histogramMetric == "pp_distribution"}
        
        <div class="flex flex-col items-center m-3">
          <Slider type="multiple" bind:value={ppHistogramEnds} max={ppHistogramMax} step={1} class="max-w-[100%]" />
        </div>
          <div class="flex flex-rows justify-between items-center mt-1">
            <span>{data.userSummary[selectedMode]["pp_distribution"][ppHistogramEnds[0]].bin_floor} pp</span>
            <span>{data.userSummary[selectedMode]["pp_distribution"][ppHistogramEnds[1]-1].bin_floor} pp</span>
          </div>
        {:else if histogramMetric == "acc_distribution"}
          <div class="flex flex-col items-center m-3">
            <Slider type="multiple" bind:value={accHistogramEnds} max={accHistogramMax} step={1} class="max-w-[100%]" />
          </div>
            <div class="flex flex-rows justify-between items-center mt-1">
              <span>{data.userSummary[selectedMode]["acc_distribution"][accHistogramEnds[0]].bin_floor*100}%</span>
              <span>{data.userSummary[selectedMode]["acc_distribution"][accHistogramEnds[1]-1].bin_floor*100}%</span>
            </div>
        {/if}
    </div>
  </div>

    <div class="flex gap-3 flex-1">
        <div class="w-2/5 p-3 border rounded bg-slate-900"><span class=" font-bold text-2xl">Mod Distribution (All Scores)</span>
          <div class="h-[300px] p-4 rounded overflow-auto">
            <PieChart cRange={quantize(interpolateRainbow, 12)} legend={{ placement: "right", orientation: "vertical"}} data={data.modSpread[selectedMode].filter((item: { count: number; enabled_mods: string}) => {return item.count > modThreshold})} key="enabled_mods" value="count"/>
          </div>
            <div class="flex flex-col items-center mt-1">
            <Slider type="single" bind:value={modThreshold} max={200} step={1} class="max-w-[70%]" />
            <span class="mt-1">Threshold: {modThreshold}</span>
            </div>
        </div>
        <div class="w-3/5 p-3 border rounded bg-slate-900"><span class=" font-bold text-2xl">Highest PP Play Per Day</span>
          <div class="h-[300px] px-10 rounded">
            <LineChart
              data={data.scoreHistory[selectedMode].scores.slice(ppTimeEnds[0], ppTimeEnds[1])}
              x="date"
              y="max_pp"
              brush
              props={{
                spline: { tweened: { duration: 200 } },
                xAxis: { format: undefined, tweened: { duration: 200 } },
              }}
              series={[{ key: "max_pp", color: "hsl(var(--color-secondary))" }]}
            >
            <svelte:fragment slot="tooltip" let:x let:y let:height let:padding>
      <Tooltip.Root
        x={padding.left}
        y="data"
        anchor="right"
        contained={false}
        class="text-[10px] font-semibold text-primary bg-surface-100 mt-[2px] px-1 py-[2px] border border-primary rounded whitespace-nowrap"
        let:data
      >
        {y(data).toFixed(2)+" pp"}
      </Tooltip.Root>

      <Tooltip.Root
        x="data"
        y={height}
        anchor="top"
        class="text-[10px] font-semibold text-primary bg-surface-100 mt-[2px] px-2 py-[2px] border border-primary rounded whitespace-nowrap"
        contained={false}
        let:data
      >
        {format(x(data), PeriodType.Day)}
      </Tooltip.Root>
    </svelte:fragment>
            </LineChart>
            <div class="flex flex-col items-center mt-3">
            <Slider type="multiple" bind:value={ppTimeEnds} max={ppTimeMax} step={1} class="max-w-[100%]" />
          </div>
          <div class="flex flex-rows justify-between items-center mt-1">
            <span>{data.scoreHistory[selectedMode].scores[ppTimeEnds[0]].date.toLocaleDateString()}</span>
            <span>{data.scoreHistory[selectedMode].scores[ppTimeEnds[1]-1].date.toLocaleDateString()}</span>
          </div>
          </div>  
        </div>
    </div>
</div>