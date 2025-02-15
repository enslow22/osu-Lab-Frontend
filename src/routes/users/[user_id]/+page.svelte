<script lang="ts">
    import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
    import AuthButton from "$lib/components/auth-button.svelte";
    let user = {
        name: "John Doe",
        age: 30,
        bio: "Software developer with a passion for open-source projects.",
        interests: ["Coding", "Hiking", "Photography"]
    };
    import { page } from '$app/state';
    export let user_id = page.params.user_id;
</script>

<header class="h-16 flex shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <h1>User Info for {user_id}</h1>
    <AuthButton />
</header>
<div class="flex-1 flex flex-col m-3 p-3 gap-3">
    <div class="flex-1 p-3 border">User Info for {user_id}</div>
    <div class="flex flex-row gap-3 flex-1">
        <div class="flex-1 p-3 border">Playcount Graph</div>
        <div class="flex-1 p-3 border">pp per day Graph</div>
    </div>
</div>