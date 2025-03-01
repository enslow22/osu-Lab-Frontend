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
        BarChart,
    } from "layerchart";
    import { sum } from "d3-array";
    import { scaleBand, scaleOrdinal } from "d3-scale";
    import { format, PeriodType } from "@layerstack/utils";
    import AuthButton from "$lib/components/auth-button.svelte";

    let { info } = $props()


    const modeColors = [
        "#ff66ab",
        "LightGreen",
        "LightSkyBlue ",
        "MediumPurple",
    ];

    const databaseSummary = [
        {
            fruit: "standard",
            value: info.databaseSummary["osu"],
        },
        {
            fruit: "taiko",
            value: info.databaseSummary["taiko"],
        },
        {
            fruit: "catch",
            value: info.databaseSummary["fruits"],
        },
        {
            fruit: "mania",
            value: info.databaseSummary["mania"],
        },
    ];

    const todayData = [
        {
            fruit: "standard",
            value: info.recentDatabaseSummary["0"]["osu"],
        },
        {
            fruit: "taiko",
            value: info.recentDatabaseSummary["0"]["taiko"],
        },
        {
            fruit: "catch",
            value: info.recentDatabaseSummary["0"]["fruits"],
        },
        {
            fruit: "mania",
            value: info.recentDatabaseSummary["0"]["mania"],
        },
    ];

    const dateData = info.recentDatabaseSummary

    const bigFormatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
    });
    let renderContext: "svg" | "canvas" = "svg";
    let debug = true;
</script>

<div class="flex flex-1 flex-col h-full rounded-b-lg overflow-hidden rounded-t-lg">
    <div class="flex">
        <div class="flex-[0.3] border p-2 flex flex-col bg-muted/50">
            <div class="mb-2 border p-2 bg-muted/50">
            <h1 class="text-2xl text-left w-full font-bold">
                {info.databaseSummary['num_users']}
                <span class="font-extralight text-xs text-left w-full pl-1 block">Total Registered Users</span>
            </h1>
            </div>
            <div class="mb-2 border p-2 bg-muted/50">
            <h1 class="text-2xl text-left w-full font-bold">
                {info.databaseSummary['num_leaderboards']}<span
                class="font-extralight text-xs text-left w-full pl-1 block"
                >Total Leaderboards</span>
            </h1>
            </div>
            <div class="border p-2 bg-muted/50">
            <h1 class="text-2xl text-left w-full font-bold">
                {info.databaseSummary['num_beatmapsets']}
                <span class="font-extralight text-xs text-left w-full pl-1 block"
                >Total Beatmapsets</span>
            </h1>
            </div>
        </div>
        <div class="flex-[0.3] border p-2 flex flex-col bg-muted/50">
            <div class="border p-2 bg-muted/50 flex-1">
            <h1 class="text-2xl text-left w-full font-bold">
                {10}
                <span class="font-extralight text-xs text-left w-full pl-1 block"
                >Something Else...</span>
            </h1>
            </div>
        </div>
        <div class="flex-1 border p-2 bg-muted/50">
            <PieChart
            data={databaseSummary}
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
                value={bigFormatter.format(sum(databaseSummary, (d) => d.value))}
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
    </div>
    <div class="grow border pb-10 bg-muted/50 p-2 px-4">
        <h1 class=" text-xl pb-2">Score Fetches in the Past 7 Days</h1>
        <BarChart
            class="p-2"
            data={dateData}
            x="date"
            series={[
                {key: "osu", color:modeColors[0]},
                {key: "taiko", color:modeColors[1]},
                {key: "fruits", color:modeColors[2]},
                {key: "mania", color:modeColors[3]}
            ]}
            seriesLayout="stack"
            props={{
              yAxis: { format: "metric" },
              tooltip: {
                header: {},
              },
            }}
            legend
        >
        </BarChart>
    </div>
</div>
