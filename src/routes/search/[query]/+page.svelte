<script>
	import { onDestroy, onMount } from 'svelte';
	import Card from '../../../lib/components/Card.svelte';
	import { Plus } from 'lucide-svelte';
	export let data;

	$: results = data.results.results;
	$: hasNextPage = data.hasNextPage;
	$: currentPage = data.currentPage;
	$: title = data.title;

	let loading = false;
	let currentPage = 1;

	const getSearch = async () => {
		const response = await fetch(
			`https://api-consumet-rust.vercel.app/meta/anilist/${title}?perPage=12&page=${currentPage}`
		);
		const resJson = await response.json();
		console.log(resJson);
		results = [...results, ...resJson.results];
		hasNextPage = resJson.hasNextPage;
	};

	onDestroy(() => {
		console.log('destroy');
		currentPage = 1;
		// hasNextPage = true;
		loading = false;
	});
</script>

<div class="main mt-8 p-6">
	<h1 class="text-lg font-medium mb-4">Top results for ~ {data.title}</h1>
	<div class="main-content flex flex-col items-center gap-8">
		<div
			class="card-group grid gap-3 gap-y-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-6"
		>
			{#each results as anime}
				<Card {anime} showRating="true" />
			{/each}
		</div>
		<button
			on:click={async () => {
				loading = true;
				currentPage += 1;
				await getSearch();
				loading = false;
			}}
			class="btn btn-primary rounded-none flex gap-1"
		>
			{#if hasNextPage}
				<h1 class="">Load more</h1>
				{#if loading}
					<div class="icon text-3xl h-fit flex items-center ">
						<iconify-icon icon="eos-icons:three-dots-loading" />
					</div>
				{:else}
					<div class="icon flex ">
						<Plus size="14" />
					</div>
				{/if}
			{:else}
				you reach the end
			{/if}
		</button>
	</div>
</div>
