<script lang="ts">
    import { page } from '$app/state';
    import AuthButton from '$lib/components/auth-button.svelte';
    import { SidebarTrigger } from '$lib/components/ui/sidebar';
    import { Separator } from '$lib/components/ui/separator';
</script>

<header class="h-16 flex shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <h1>Tags</h1>
    <AuthButton />
</header>
<div class="flex flex-1 items-start justify-center pt-10">
    <div class="text-center bg-muted/50 rounded-xl p-2">
    <h1 class="text-4xl font-bold">{page.error?.message}</h1>
</div>
</div>