<script lang="ts">
    import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
    import AuthButton from "$lib/components/auth-button.svelte";
    let { data } = $props();
</script>

<header class="h-16 flex shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <h1>Tags</h1>
    <AuthButton />
</header>
<div class="grow rounded-xl flex items-center justify-center">
<ul class="gap-2 space-y-2">
{#each data.strings as string}
<li class="p-2 bg-muted/50 w-full">{string}</li>
{/each}
</ul>
</div>