<script lang="ts">
    let { data } = $props();
    const group = data?.group ?? { name: "Unknown", users: [], defaultSettings: { mods: "Unknown" } };
</script>

<main>
    <h1>Group: {group.name}</h1>
    <ul>
        {#each group.users as user}
            <li>{user.name}</li>
        {/each}
    </ul>
    <h1>Default Mods: {group.defaultSettings.mods}</h1>
</main>
