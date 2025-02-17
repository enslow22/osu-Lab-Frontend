<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import type { ComponentProps } from "svelte";
	import { Title } from "./ui/sheet";
	import SidebarGroup from "./ui/sidebar/sidebar-group.svelte";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	// sample data
	const data = {
		navMain: [
			{
				title: "Getting Started",
				url: "#",
				items: [
					{
						title: "About",
						url: "/about",
						isActive: false,
					},
					{
						title: "Fetch My Scores!",
						url: "https://api.enslow.me/",
						isActive: false,
					},
				],
			},
			{
				title: "Stats",
				url: "#",
				items: [
					{
						title: "Leaderboards",
						url: "/leaderboards",
						isActive: false,
					},
					{
						title: "Tags",
						url: "/tags",
						isActive: false,
					},
					{
						title: "Users",
						url: "/users",
						isActive: false,
					},
				],
			},
			{
				title: "API Reference",
				url: "#",
				items: [
					{
						title: "Documentation",
						url: "https://api.enslow.me/docs",
						isActive: false,
					},
					{
						title: "Terms of Service",
						url: "/terms",
						isActive: false,
					},
				],
			},
		],
	};
	let {
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header>
		<a href="/"
			><h1 class="px-2 text-4xl font-bold hover:animate-pulse">
				osu!Ladders
			</h1></a
		>
	</Sidebar.Header>
	<Sidebar.Content class="gap-0">
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Collapsible.Root
				title={group.title}
				open={false}
				class="group/collapsible"
			>
				<Sidebar.Group>
					<Sidebar.GroupLabel
						class="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
					>
						{#snippet child({ props })}
							<Collapsible.Trigger {...props}>
								{group.title}
								<ChevronRight
									class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
								/>
							</Collapsible.Trigger>
						{/snippet}
					</Sidebar.GroupLabel>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each group.items as item (item.title)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											isActive={item.isActive}
										>
											{#snippet child({ props })}
												<a href={item.url} {...props}
													><span class="text-xs"
														>{item.title}</span
													></a
												>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
		<SidebarGroup>
			<Sidebar.GroupContent>
				<Popover.Root>
					<Sidebar.Menu>
						<Popover.Trigger>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									Find User
									<Popover.Content>
										<div class="p-0">
											<form
												class="flex w-full max-w-sm items-center space-x-2"
											>
												<Input
													type="user_id"
													placeholder="user id or username"
												/>
												<Button type="submit"
													>search</Button
												>
											</form>
										</div></Popover.Content
									>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						</Popover.Trigger>
					</Sidebar.Menu>
				</Popover.Root>
			</Sidebar.GroupContent>
		</SidebarGroup>
	</Sidebar.Content>
	<Sidebar.Footer>
		<p>:3</p>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
