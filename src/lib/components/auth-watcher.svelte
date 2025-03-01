<script>
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { PUBLIC_API_DOMAIN } from "$env/static/public";
    let { authstate } = $props();
    // The auth is stored in a cookie called session_cookie. This cookie is set by the server when the user logs in on either subdomain.
    // We can tell if someone is authenticated by checking if this cookie exists.

    // Logout is easy. Just delete the cookie.
    // Login is easy, just send them to api.enslow.me/login?redirect=www.enslow.me/
</script>

{#if authstate}
    <Popover.Root>
        <Popover.Trigger class="absolute right-4"
            ><img
                class=" h-12 rounded-full border-blue-300 border"
                src={authstate.avatar_url}
                alt="Profile Avatar"
            /></Popover.Trigger
        >
        <Popover.Content class="w-full">
            <button
                onclick={async () => {
                    await fetch(PUBLIC_API_DOMAIN+"/logout", {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        method: "POST",
                        credentials: "include",
                    });
                    window.location.href = '/'
                }}>Log Out</button
            >
        </Popover.Content>
    </Popover.Root>
{:else}
    <!-- <a href="/login">Login</a> -->
    <a class="absolute right-4" href={PUBLIC_API_DOMAIN+"/login"}>Log In</a>
{/if}
