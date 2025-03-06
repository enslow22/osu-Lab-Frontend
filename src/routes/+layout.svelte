<script lang="ts">
	import "../app.css";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
    import { ModeWatcher } from "mode-watcher";
	import AuthWatcher from "$lib/components/auth-watcher.svelte";
	import AuthButton from "$lib/components/auth-button.svelte";
	import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
	import { page } from '$app/state'
	
	const route_page_names = {
		"/": "Main Dashboard",
		"/about": "About",
		"/leaderboards": "Leaderboards",
		"/leaderboards/[leaderboard_id]": "Leaderboard Info",
		"/create_leaderboard": "Create a Leaderboard",
		"/terms": "Terms of Service",
		"/users/[user_id]": "User Profile",
		"/query_builder": "Query Builder"
	}
	
	let { data, children } = $props();
</script>

<ModeWatcher/>
<Sidebar.Provider>
<AppSidebar authstate={data.session}/>
<Sidebar.Inset>
<div class="flex flex-1 h-screen flex-col">
	<header class="h-16 flex shrink-0 items-center gap-2 border-b pl-4">
		<SidebarTrigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 h-4" />
		<h1 class="text-2xl font-bold">{route_page_names[page?.route?.id] ?? "Unknown Page"}</h1>		
		<AuthWatcher authstate={data.session}/>
	</header>
	{@render children?.()}
</div>
</Sidebar.Inset>
</Sidebar.Provider>
