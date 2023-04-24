<script>
	import Card from '../../../lib/components/Card.svelte';
	export let data;
	$: results = data.results.results;
</script>

<div class="main mt-8 p-6">
	<h1 class="text-lg font-medium mb-4">Top results for ~ {data.title}</h1>
	<div class="card-group grid gap-3 gap-y-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-6">
		{#each results as anime}
			<Card {anime} />
		{/each}
	</div>
</div>