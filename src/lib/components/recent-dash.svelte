<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import Separator from "./ui/separator/separator.svelte";
    import ModeIcon from "./mode-icon.svelte";
    import RankIcon from "./rank-icon.svelte";
    import { Link, SquareArrowOutUpRight } from "lucide-svelte";
    import dayjs from "dayjs"
    import relativeTime from "dayjs/plugin/relativeTime"

    let { info } = $props()
    /**
    let items = [
        {
            username: "user1111111111",
            userId: 10651409,
            beatmap: "beatmap1",
            beatmapsetId: 321321321,
            beatmapId: 321321312,
            beatmapCover: "https://assets.ppy.sh/beatmaps/2056084/covers/cover.jpg?1733086817",
            mapper: "enslow",
            difficulty: "difficulty1",
            stars: 5.0,
            time: "2021-10-10 10:10:10",
            mode: "osu",
            accuracy: 99.99,
            lazerScore: 500000,
            pp: 1000,
            rank: "A",
            mods: "HDHR",
            combo: 1000,
            perfect: 25,
            ok: 20,
            meh: 1,
            miss: 3,
            avatarUrl: "https://a.ppy.sh/10651409?1737054819.jpeg",
            scoreId: 111111111,
        },
    ];*/

    let items = info.lastTenScores

    // Probably going to get rid of table header later on.

    const colorMapper = {
        "osu": "#ff66ab",
        "taiko": "LightGreen",
        "catch": "LightSkyBlue",
        "mania": "MediumPurple"
    }

    dayjs.extend(relativeTime)
</script>


<style>
    :global(.score-table-row) {
      background-color: rgba(0, 0, 0, 0.85);
    }
    :global(.score-table-row:hover) {
      background-color: rgba(0,0,0,0.6);
    }
    :global(.score-table-row) {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }
</style>

<Table.Root class="rounded-b-lg overflow-hidden rounded-t-lg">
    <Table.Body>
        {#each items as item}
        <Table.Row class="score-table-row" style="background-image: url(https://assets.ppy.sh/beatmaps/{item.beatmapset_id}/covers/cover.jpg); background-size: cover; background-blend-mode: darken; color: white;">
            <a class="flex flex-col" href={"https://osu.ppy.sh/users/" + item.user_id}>
            <Table.Cell>
                <Avatar.Root>
                    <Avatar.Image
                        src={item.avatar_url}
                        alt={item.username}
                    />
                    <Avatar.Fallback>:3</Avatar.Fallback>
                </Avatar.Root>
                <div class="flex flex-auto"><h1 class="text-2xl rounded p-1 shadow-sm text-pretty text-muted-foreground/100 underline ">{item.username}</h1></div>
            </Table.Cell></a>
            <Table.Cell>
                <a class="flex flex-col" href={"https://osu.ppy.sh/beatmapsets/"+ item.beatmapset_id + "#"+item.mode+"/"+item.beatmap_id}>
            
                <div class="flex ">
                    <ModeIcon mode={item.mode}/>
                        <p class="p-2 text-muted-foreground align-top text-xl">{item.title} - [{item.version}]</p>
                </div>
                </a>
            </Table.Cell>
            <Table.Cell>
                <div>
                    <p class="text-muted-foreground flex items-center justify-between gap-3">
                        <span class="text-4xl text-muted-foreground font-bold"><RankIcon rank={item.rank}/></span>
                        <span class="font-semibold text-right text-2xl">{item.enabled_mods.replaceAll(" ", "")}</span>
                    </p>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div class="flex flex-col text-nowrap px-4">
                    <p class="text-muted-foreground items-center font-semibold text-2xl">{Math.round(item.pp ?? 0)}pp </p>
                    <p class="text-muted-foreground items-center"><span class=" text-lg font-light">{item.lazer_score.toLocaleString()} | {item.accuracy}% </span></p>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div class="flex flex-col">
                    <p class="text-muted-foreground"><span class=" font-bold">{item.maxcombo.toLocaleString()}x</span>/1,000x</p>
                    <p class="text-muted-foreground/50">&#123;{item.count300.toLocaleString()}/{item.count100.toLocaleString()}/{item.count50.toLocaleString()}/{item.countmiss.toLocaleString()}&#125;</p>
                </div>
            </Table.Cell>
            <Table.Cell >
                <div class="flex">
                    <span class="text-muted-foreground text-md inline-block align-middle mx-4">{dayjs().to(dayjs(item.time))}
                    </span>
                    <span class="inline-block align-middle"><a href={"https://osu.ppy.sh/scores/"+item.score_id}><SquareArrowOutUpRight size={20} strokeWidth={1} /></a></span>
                </div>
                        
            </Table.Cell>
        </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
