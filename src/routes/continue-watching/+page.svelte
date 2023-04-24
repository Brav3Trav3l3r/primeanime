<script>
	import { continueWatching } from '$lib/store/store.js';
	import Card from '$lib/components/Card.svelte';
	$: data = $continueWatching;

	
</script>

<div class="main mt-8 p-6">
	<h1 class="text-lg font-medium mb-4">Continue Watching</h1>
	<div class="card-group grid gap-3 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
		{#each data as anime}
			<Card {anime} />
		{/each}
	</div>
</div>
