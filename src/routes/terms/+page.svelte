<script>
    import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
    import AuthButton from "$lib/components/auth-button.svelte";
</script>

<header class="h-16 flex shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <h1>Terms of User</h1>
    <AuthButton />
</header>
<div class="terms-container p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Terms of Service</h1>
    <p class="mb-2">Welcome to our Terms of Service page. Please read the following terms carefully:</p>
    <hr class="my-4" />
    <p>I want to keep this tool as open as possible, so please don't abuse it. That's all :3</p>
</div>