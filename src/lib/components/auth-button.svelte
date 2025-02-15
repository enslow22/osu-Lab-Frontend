<script>
    import * as Popover from "$lib/components/ui/popover/index.js";
    // Assume `authenticated` is a boolean that determines if the user is authenticated
    let authenticated = false;

    // Function to toggle authentication status (for demonstration purposes)
    function toggleAuth() {
        authenticated = !authenticated;
    }
</script>

<div class="ml-auto px-4">
{#if authenticated}
    <Popover.Root>
        <Popover.Trigger><img src="" alt="Profile Avatar" /></Popover.Trigger>
        <Popover.Content class="w-full">
            <button on:click={toggleAuth}>Log Out</button>
        </Popover.Content>
      </Popover.Root>
{:else}
<!-- <a href="/login">Login</a> -->
<button on:click={toggleAuth}>Login</button>
{/if}
</div>