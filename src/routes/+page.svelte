<script lang="ts">
  import MainDash_2 from "$lib/components/main-dash-2.svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import RecentDash from "$lib/components/recent-dash.svelte";

  let { data } = $props()
</script>

<Tabs.Root value="main" class="flex flex-col h-full p-1">
  <div class="flex flex-row items-center">
  <Tabs.List class="gap-2 mt-2 flex max-w-3xl">
    <Tabs.Trigger value="main">Database Statistics</Tabs.Trigger>
    <Tabs.Trigger value="recent">Recent Fetch Info</Tabs.Trigger>
  </Tabs.List>
  </div>
  <Tabs.Content value="main" class="h-full">
    <MainDash_2 info={data}/>
  </Tabs.Content>
  <Tabs.Content value="recent" class="h-full">
    <RecentDash info={data}/>
  </Tabs.Content>
  <Tabs.Content value="top users" class="h-full">
    <p>:3</p>
  </Tabs.Content>
</Tabs.Root>