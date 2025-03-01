<script lang="ts" generics="TData">
  import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
  import { Separator } from "$lib/components/ui/separator/index";
  import {
      PieChart,
      Text,
      Chart,
      Svg,
      Axis,
      LinearGradient,
      Bars,
      Tooltip,
      Highlight,
  } from "layerchart";
  import { sum } from "d3-array";
  import { scaleBand, scaleOrdinal } from "d3-scale";
  import { format, PeriodType } from "@layerstack/utils";
  import AuthButton from "$lib/components/auth-button.svelte";

  const modeColors = [
      "#ff66ab",
      "LightGreen",
      "LightSkyBlue ",
      "MediumPurple",
  ];

  const data = [
      {
          year: 2019,
          basket: 1,
          fruit: "standard",
          value: 3840,
      },
      {
          year: 2019,
          basket: 1,
          fruit: "taiko",
          value: 1920,
      },
      {
          year: 2019,
          basket: 2,
          fruit: "catch",
          value: 960,
      },
      {
          year: 2019,
          basket: 2,
          fruit: "mania",
          value: 400,
      },
  ];

  const todayData = [
      {
          year: 2019,
          basket: 1,
          fruit: "standard",
          value: 54234,
      },
      {
          year: 2019,
          basket: 1,
          fruit: "taiko",
          value: 3312,
      },
      {
          year: 2019,
          basket: 2,
          fruit: "catch",
          value: 1254,
      },
      {
          year: 2019,
          basket: 2,
          fruit: "mania",
          value: 1232,
      },
  ];

  const tagData = {
      "Total Registered Users": 29,
      "Total Tags": 12,
      "Total Tagged Players": 22,
  };

  const dateData = [
      {
          year: 2019,
          fruit: "apples",
          keys: {
              year: 2019,
              fruit: "apples",
          },
          value: 3840,
          values: [0, 3840],
          data: [
              {
                  year: 2019,
                  basket: 1,
                  fruit: "apples",
                  value: 3840,
              },
              {
                  year: 2019,
                  basket: 1,
                  fruit: "bananas",
                  value: 1920,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2018,
          fruit: "apples",
          keys: {
              year: 2018,
              fruit: "apples",
          },
          value: 1600,
          values: [0, 1600],
          data: [
              {
                  year: 2018,
                  basket: 1,
                  fruit: "apples",
                  value: 1600,
              },
              {
                  year: 2018,
                  basket: 1,
                  fruit: "bananas",
                  value: 1440,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2017,
          fruit: "apples",
          keys: {
              year: 2017,
              fruit: "apples",
          },
          value: 820,
          values: [0, 820],
          data: [
              {
                  year: 2017,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2017,
                  basket: 1,
                  fruit: "bananas",
                  value: 1000,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "cherries",
                  value: 640,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2016,
          fruit: "apples",
          keys: {
              year: 2016,
              fruit: "apples",
          },
          value: 820,
          values: [0, 820],
          data: [
              {
                  year: 2016,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2016,
                  basket: 1,
                  fruit: "bananas",
                  value: 560,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "cherries",
                  value: 720,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2019,
          fruit: "bananas",
          keys: {
              year: 2019,
              fruit: "bananas",
          },
          value: 1920,
          values: [3840, 5760],
          data: [
              {
                  year: 2019,
                  basket: 1,
                  fruit: "apples",
                  value: 3840,
              },
              {
                  year: 2019,
                  basket: 1,
                  fruit: "bananas",
                  value: 1920,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2018,
          fruit: "bananas",
          keys: {
              year: 2018,
              fruit: "bananas",
          },
          value: 1440,
          values: [1600, 3040],
          data: [
              {
                  year: 2018,
                  basket: 1,
                  fruit: "apples",
                  value: 1600,
              },
              {
                  year: 2018,
                  basket: 1,
                  fruit: "bananas",
                  value: 1440,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2017,
          fruit: "bananas",
          keys: {
              year: 2017,
              fruit: "bananas",
          },
          value: 1000,
          values: [820, 1820],
          data: [
              {
                  year: 2017,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2017,
                  basket: 1,
                  fruit: "bananas",
                  value: 1000,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "cherries",
                  value: 640,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2016,
          fruit: "bananas",
          keys: {
              year: 2016,
              fruit: "bananas",
          },
          value: 560,
          values: [820, 1380],
          data: [
              {
                  year: 2016,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2016,
                  basket: 1,
                  fruit: "bananas",
                  value: 560,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "cherries",
                  value: 720,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2019,
          fruit: "cherries",
          keys: {
              year: 2019,
              fruit: "cherries",
          },
          value: 960,
          values: [5760, 6720],
          data: [
              {
                  year: 2019,
                  basket: 1,
                  fruit: "apples",
                  value: 3840,
              },
              {
                  year: 2019,
                  basket: 1,
                  fruit: "bananas",
                  value: 1920,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2018,
          fruit: "cherries",
          keys: {
              year: 2018,
              fruit: "cherries",
          },
          value: 960,
          values: [3040, 4000],
          data: [
              {
                  year: 2018,
                  basket: 1,
                  fruit: "apples",
                  value: 1600,
              },
              {
                  year: 2018,
                  basket: 1,
                  fruit: "bananas",
                  value: 1440,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2017,
          fruit: "cherries",
          keys: {
              year: 2017,
              fruit: "cherries",
          },
          value: 640,
          values: [1820, 2460],
          data: [
              {
                  year: 2017,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2017,
                  basket: 1,
                  fruit: "bananas",
                  value: 1000,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "cherries",
                  value: 640,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2016,
          fruit: "cherries",
          keys: {
              year: 2016,
              fruit: "cherries",
          },
          value: 720,
          values: [1380, 2100],
          data: [
              {
                  year: 2016,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2016,
                  basket: 1,
                  fruit: "bananas",
                  value: 560,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "cherries",
                  value: 720,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2019,
          fruit: "grapes",
          keys: {
              year: 2019,
              fruit: "grapes",
          },
          value: 400,
          values: [6720, 7120],
          data: [
              {
                  year: 2019,
                  basket: 1,
                  fruit: "apples",
                  value: 3840,
              },
              {
                  year: 2019,
                  basket: 1,
                  fruit: "bananas",
                  value: 1920,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2019,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2018,
          fruit: "grapes",
          keys: {
              year: 2018,
              fruit: "grapes",
          },
          value: 400,
          values: [4000, 4400],
          data: [
              {
                  year: 2018,
                  basket: 1,
                  fruit: "apples",
                  value: 1600,
              },
              {
                  year: 2018,
                  basket: 1,
                  fruit: "bananas",
                  value: 1440,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "cherries",
                  value: 960,
              },
              {
                  year: 2018,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2017,
          fruit: "grapes",
          keys: {
              year: 2017,
              fruit: "grapes",
          },
          value: 400,
          values: [2460, 2860],
          data: [
              {
                  year: 2017,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2017,
                  basket: 1,
                  fruit: "bananas",
                  value: 1000,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "cherries",
                  value: 640,
              },
              {
                  year: 2017,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
      {
          year: 2016,
          fruit: "grapes",
          keys: {
              year: 2016,
              fruit: "grapes",
          },
          value: 400,
          values: [2100, 2500],
          data: [
              {
                  year: 2016,
                  basket: 1,
                  fruit: "apples",
                  value: 820,
              },
              {
                  year: 2016,
                  basket: 1,
                  fruit: "bananas",
                  value: 560,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "cherries",
                  value: 720,
              },
              {
                  year: 2016,
                  basket: 2,
                  fruit: "grapes",
                  value: 400,
              },
          ],
      },
  ];

  const bigFormatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
  });
  export let renderContext: "svg" | "canvas" = "svg";
  export let debug = true;
</script>

<div class="flex flex-1 flex-col">
  <div class="flex flex-[10vh] w-full">
      <div class="flex-1 border p-2 bg-muted/50">
          <PieChart
          {data}
          key="fruit"
          value="value"
          legend={{ placement: "top-left", orientation: "vertical" }}
          innerRadius={-20}
          cRange={modeColors}
          cornerRadius={5}
          padAngle={0.02}
          {renderContext}
          {debug}
          >
          <svelte:fragment slot="aboveMarks">
              <Text
              value={bigFormatter.format(sum(data, (d) => d.value))}
              textAnchor="middle"
              verticalAnchor="middle"
              class="text-3xl"
              dy={0}
              />
              <Text
              value="total (all time)"
              textAnchor="middle"
              verticalAnchor="middle"
              class="text-xs fill-surface-content/50"
              dy={20}
              />
          </svelte:fragment>
          </PieChart>
      </div>
      <div class="flex-1 border p-2 bg-muted/50">
          <PieChart
          data={todayData}
          key="fruit"
          value="value"
          legend={{ placement: "top-left", orientation: "vertical" }}
          innerRadius={-20}
          cRange={modeColors}
          cornerRadius={5}
          padAngle={0.02}
          {renderContext}
          {debug}
          >
          <svelte:fragment slot="aboveMarks">
              <Text
              value={bigFormatter.format(
                  sum(todayData, (d) => d.value),
              )}
              textAnchor="middle"
              verticalAnchor="middle"
              class="text-3xl"
              dy={2}
              />
              <Text
              value="total (today)"
              textAnchor="middle"
              verticalAnchor="middle"
              class="text-xs fill-surface-content/50"
              dy={20}
              />
          </svelte:fragment>
          </PieChart>
      </div>
      <div class="flex-[0.4] border p-2 flex flex-col bg-muted/50">
          <div class="mb-2 border p-2 bg-muted/50">
          <h1 class="text-2xl text-left w-full font-bold">
              {tagData["Total Registered Users"]}
              <span class="font-extralight text-xs text-left w-full pl-1 block">Total Registered Users</span>
          </h1>
          </div>
          <div class="mb-2 border p-2 bg-muted/50">
          <h1 class="text-2xl text-left w-full font-bold">
              {tagData["Total Tags"]}<span
              class="font-extralight text-xs text-left w-full pl-1 block"
              >Total Tags</span>
          </h1>
          </div>
          <div class="border p-2 bg-muted/50">
          <h1 class="text-2xl text-left w-full font-bold">
              {tagData["Total Tagged Players"]}
              <span class="font-extralight text-xs text-left w-full pl-1 block"
              >Total Tagged Players</span>
          </h1>
          </div>
      </div>
  </div>
  <div class="flex-[60vh] bg-muted/50 p-2 px-4">
      <Chart
          data={dateData}
          x="year"
          xScale={scaleBand().paddingInner(0.4).paddingOuter(0.1)}
          y="values"
          yNice={4}
          c="fruit"
          cScale={scaleOrdinal()}
          cRange={modeColors}
          padding={{ left: 16, bottom: 24 }}
          tooltip={{ mode: "band" }}
          let:cScale
      >
          <Svg>
              <Axis placement="left" grid rule />
              <Axis placement="bottom" rule />
              <Bars strokeWidth={1} />
              <Highlight area />
          </Svg>

          <Tooltip.Root let:data>
              <Tooltip.Header>{data.year}</Tooltip.Header>
              <Tooltip.List>
                  {#each data.data as d}
                      <Tooltip.Item
                          label={d.fruit}
                          value={d.value}
                          color={cScale?.(d.fruit)}
                          format="integer"
                          valueAlign="right"
                      />
                  {/each}

                  <Tooltip.Separator />

                  <!-- TODO: Remove [...] type hack to make svelte-check happy -->
                  <Tooltip.Item
                      label="total"
                      value={sum([...data.data], (d) => d.value)}
                      format="integer"
                      valueAlign="right"
                  />
              </Tooltip.List>
          </Tooltip.Root>
      </Chart>
  </div>
</div>