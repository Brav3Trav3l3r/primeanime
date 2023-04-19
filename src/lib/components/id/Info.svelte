<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import Card from '../Card.svelte';
	import { onDestroy, onMount } from 'svelte';
	export let anime;
	export let title;
	let maxLength = 350;
	afterNavigate(() => {
		maxLength = 350;
	});

	let time;

	function convertTimestamp(timestamp) {
		let d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
			yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
			hh = d.getHours(),
			h = hh,
			min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
			ampm = 'AM';

		if (hh > 12) {
			h = hh - 12;
			ampm = 'PM';
		} else if (hh === 12) {
			h = 12;
			ampm = 'PM';
		} else if (hh == 0) {
			h = 12;
		}

		// ie: 2014-03-24, 3:00 PM
		time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	}

	$: convertTimestamp(anime?.nextAiringEpisode?.airingTime);
</script>

<div class="anime ">
	<div class="flex flex-col md:flex-row gap-6">
		<div class="image h-80 w-fit aspect-[2/3] truncate">
			<img src={anime.image} alt="" class="w-full h-full object-cover" />
		</div>
		<section class="flex-1 flex flex-col space-y-3">
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
							>episode {anime.nextAiringEpisode.episode} will air on :</span
						>

						<span>{time}</span>
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
			<div class="rating bg-base-content/10 w-fit px-4 py-2 rounded-full">
				<h1 class="text-accent">
					<span class="text-base-content opacity-50 text-sm">Score:</span>
					<span class="font-semibold">{anime.rating}</span>
				</h1>
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
