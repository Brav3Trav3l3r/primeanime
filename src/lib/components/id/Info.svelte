<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import Card from '../Card.svelte';
	export let anime;
	export let title;
	let maxLength = 350;
	afterNavigate(() => {
		maxLength = 350;
	});

	$: if (anime.nextAiringEpisode) {
		converTime(anime?.nextAiringEpisode.timeUntilAiring);
	}
	// $: console.log(anime.nextAiringEpisode.timeUntilAiring);

	let time;

	const converTime = async (unix_timestamp) => {
		if (!unix_timestamp) {
			return (time = null);
		}

		let date = new Date(unix_timestamp * 1000);
		let hours = date.getHours();
		let minutes = '0' + date.getMinutes();
		let seconds = '0' + date.getSeconds();

		let formattedTime = hours + 'hr' + " " + minutes.substr(-2) + 'min' ;

		return (time = formattedTime);
	};
</script>

<div class="anime ">
	<div class="flex flex-col md:flex-row gap-6">
		<div class="image h-80 w-fit aspect-[2/3] truncate">
			<img src={anime.image} alt="" class="w-full h-full object-cover" />
		</div>
		<section class="flex-1 flex flex-col space-y-2">
			<div class="title">
				<h1 class="text-2xl font-semibold max-w-prose">{title}</h1>
				<h1 class="max-w-prose">{anime.title?.romaji}</h1>
			</div>
			<div class="g-1 flex gap-4">
				<h1>{anime?.type}</h1>
				<h1>{anime?.releaseDate}</h1>
				{#if anime.duration}
					<h1>{anime?.duration} mins</h1>
				{/if}
			</div>
			<div class="g-2 flex gap-4">
				<h1 class={`${anime.status === 'Completed' ? 'text-red-500' : 'text-green-500'}`}>
					{anime.status}
				</h1>
				{#if anime.totalEpisodes}
					<h1>/</h1>
					<h1>{anime.totalEpisodes} episode(s)</h1>
				{/if}
				{#if anime.nextAiringEpisode}
					<h1>/</h1>
					<h1>
						<span class="text-sm opacity-60"
							>episode {anime.nextAiringEpisode.episode} will air in :</span
						>
						{time}
					</h1>
				{/if}
			</div>
			<div class="description mt-4 text-sm opacity-60 max-w-prose tracking-wider">
				{#if anime.description.length > maxLength}
					<p class=" ">
						{@html anime.description.slice(0, maxLength)} ...
						<button on:click={() => (maxLength = 100000)} class="text-sm text-white tracking-wider"
							>Read More</button
						>
					</p>
				{:else if anime.description.length < 350}
					<p class="">
						{@html anime.description}
					</p>
				{:else}
					<p class="">
						{@html anime.description}
					</p>
					<button on:click={() => (maxLength = 350)} class="text-sm text-white tracking-wider"
						>Read Less</button
					>
				{/if}
			</div>
		</section>
	</div>


	{#if anime.relations.length > 0}
		<div class="relations mt-14">
			<h1 class="text-xl font-semibold">Related</h1>
			<div
				class="card-group grid gap-3 gap-y-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-6"
			>
				{#each anime.relations as anime}
					<Card {anime} />
				{/each}
			</div>
		</div>
	{/if}
	{#if anime.recommendations.length > 0}
		<div class="recommendations mt-14">
			<h1 class="text-xl font-semibold">Recommendations</h1>
			<div
				class="card-group grid gap-3 gap-y-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-6"
			>
				{#each anime.recommendations as anime}
					{#if anime.id}
						<Card {anime} />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
