<script lang="js">
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import ModeIcon from "./mode-icon.svelte";
    import RankIcon from "./rank-icon.svelte";
    import { Link, SquareArrowOutUpRight } from "lucide-svelte";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import utc from "dayjs/plugin/utc";

    let { item, user_info } = $props();

    console.log(user_info);

    dayjs.extend(relativeTime);
    dayjs.extend(utc);
</script>

<Table.Row
    class="score-table-row"
    style="background-image: url(https://assets.ppy.sh/beatmaps/{item.beatmapset_id}/covers/cover.jpg); background-size: cover; background-blend-mode: darken; color: white;"
>
    <a
        class="flex flex-col"
        href={"https://osu.ppy.sh/users/" + user_info.user_id}
    >
        <Table.Cell>
            <Avatar.Root>
                <Avatar.Image
                    src={user_info.avatar_url}
                    alt={user_info.username}
                />
                <Avatar.Fallback>:3</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-auto">
                <h1
                    class="text-md rounded p-1 shadow-sm text-pretty text-muted-foreground/100 underline"
                >
                    {user_info.username}
                </h1>
            </div>
        </Table.Cell></a
    >
    <Table.Cell>
        <a
            class="flex flex-col"
            href={"https://osu.ppy.sh/beatmapsets/" +
                item.beatmapset_id +
                "#" +
                item.mode +
                "/" +
                item.beatmap_id}
        >
            <div class="flex">
                <ModeIcon mode={item.mode} />
                <p class="p-1 text-muted-foreground align-top text-md">
                    {item.title} - [{item.version}]
                </p>
            </div>
        </a>
    </Table.Cell>
    <Table.Cell>
        <div>
            <p
                class="text-muted-foreground flex items-center justify-between gap-2"
            >
                <span class="text-lg text-muted-foreground font-bold"
                    ><RankIcon rank={item.rank} /></span
                >
                <span class="font-semibold text-right text-md"
                    >{item.enabled_mods.replaceAll(" ", "")}</span
                >
            </p>
        </div>
    </Table.Cell>
    <Table.Cell>
        <div class="flex flex-col text-nowrap px-4">
            <p
                class="text-muted-foreground items-center font-semibold text-md"
            >
                {Math.round(item.pp ?? 0)}pp
            </p>
            <p class="text-muted-foreground items-center">
                <span class=" text-sm font-light"
                    >{item.lazer_score.toLocaleString()} | {(
                        item.accuracy * 100
                    ).toFixed(2)}%
                </span>
            </p>
        </div>
    </Table.Cell>
    <Table.Cell>
        <div class="flex flex-col">
            <p class="text-muted-foreground">
                <span class=" font-bold">{item.maxcombo.toLocaleString()}x</span
                >/{item.max_combo.toLocaleString()}x
            </p>
            <p class="text-muted-foreground/50">
                &#123;{item.count300.toLocaleString()}/{item.count100.toLocaleString()}/{item.count50.toLocaleString()}/{item.countmiss.toLocaleString()}&#125;
            </p>
        </div>
    </Table.Cell>
    <Table.Cell>
        <div class="flex">
            <span
                class="text-muted-foreground text-sm inline-block align-middle mx-4"
                >{dayjs.utc().to(dayjs.utc(item.date))}
            </span>
            <span class="inline-block align-middle"
                ><a href={"https://osu.ppy.sh/scores/" + item.score_id}
                    ><SquareArrowOutUpRight size={20} strokeWidth={1} /></a
                ></span
            >
        </div>
    </Table.Cell>
</Table.Row>

<style>
    :global(.score-table-row) {
        background-color: rgba(0, 0, 0, 0.85);
    }
    :global(.score-table-row:hover) {
        background-color: rgba(0, 0, 0, 0.6);
    }
    :global(.score-table-row) {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }
</style>
