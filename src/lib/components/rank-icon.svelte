<script lang="ts">
    export let rank: string;
</script>

{#if rank == 'XH'}
XH
{:else if rank == 'X'}
X
{:else if rank == 'SH'}
SH
{:else if rank == 'S'}
S
{:else if rank == 'A'}
A
{:else if rank == 'B'}
B
{:else if rank == 'C'}
C
{:else if rank == 'D'}
D
{:else}
{rank}
{/if}