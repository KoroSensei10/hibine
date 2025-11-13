<script lang="ts">
    import SearchBar from '$components/SearchBar.svelte';
    import Pane from './Pane.svelte';
    import BottomNav from './BottomNav.svelte';
    import { viewportStore } from '$stores/Viewport.svelte.js';
    import { getCurrentTape } from '$lib/remotes/files.remote';
    import { stopEvent } from '$lib/utils';

    let searchBarOpen: boolean = $state(false);


    async function handleKeys(e: KeyboardEvent) {
    	if (e.metaKey && e.key === 'k') {
    		// open the command palette/file selector
    		stopEvent(e);
    		searchBarOpen = !searchBarOpen;
    	} else if (e.metaKey && e.key === 's') {
    		// save the current file
    		stopEvent(e);
    		// TODO: add small feedback
    	}
    }
</script>

<svelte:window onkeydown={handleKeys} />

{#if !viewportStore.isMobile}
    <SearchBar bind:searchBarOpen />
{/if}

<svelte:head>
		<title>{await getCurrentTape()} – Hibine</title>
</svelte:head>

<main
	aria-label="Main content"
	class="w-full h-full grid grid-rows-[1fr_auto] md:flex md:flex-row-reverse"
>
		<Pane />
		<!-- Mobile only -->
		<BottomNav />
</main>
