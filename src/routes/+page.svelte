<script>
	import { page } from '$app/stores';
	import Card from '../lib/components/Card.svelte';
	import { ChevronLeft, ChevronRight, Play } from 'lucide-svelte';
	export let data;
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import { continueWatching, currentProvider, isDub } from '$lib/store/store.js';

	$: trending = data.trend?.results ?? undefined;
	$: recent = data.recent?.results ?? undefined;
	$: popular = data.popular?.results;
	$: session = $page.data?.session ?? undefined;
</script>

<!-- <div class="featured h-[350px]  bg-base-content/10 flex relative">
	<div class="empty-area w-2/5 bg-base-300 h-full" />
	<div class="banner relative h-full">
		<img
			src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/151801-zBFaJMIJFWfS.jpg"
			alt="banner"
			class="w-full h-full object-cover brightness-90"
		/>
		<div
			class="gradient absolute top-0 bottom-0 left-0 w-2/5 bg-gradient-to-r from-base-300 to-transparent h-full"
		/>
	</div>
	<div class="info absolute top-0 p-4 left-0 right-0 h-full space-y-6 flex flex-col justify-end">
		<h1 class="font-lexend font-bold text-6xl line-clamp-2 text-white">MASHLE: MAGIC AND MUSCLES</h1>
		<p class="text-sm text-zinc-400 max-w-prose tracking-wider">
			This is a world of magic. This is a world in which magic is casually used by everyone. In a
			deep, dark forest in this world of magic, there is a boy who is singlemindedly working out.
			His name is Mash Burnedead, and he has a secret. He can’t use magic.
		</p>
		<div class="flex justify-between">
			<div class="g-1 gap-10 flex items-center">
				<div
					class="play bg-primary p-3 rounded-full aspect-square w-14 h-14 flex items-center justify-center"
				>
					<div class="icon translate-x-0.5">
						<Play fill="black" size="32" strokeWidth="0" />
					</div>
				</div>
				<div class="stazz flex gap-8">
					<div class="totalepisodes flex flex-col items-center">
						<h1 class="text-4xl font-bold font-roboto">12</h1>
						<h1 class="opacity-50">episodes</h1>
					</div>
					<div class="totalepisodes flex flex-col items-center">
						<h1 class="text-4xl font-bold font-roboto">24 +</h1>
						<h1 class="opacity-50">minutes</h1>
					</div>
					<div class="totalepisodes flex flex-col items-center">
						<h1 class="text-4xl font-bold font-roboto">8.3</h1>
						<h1 class="opacity-50">Anilist score</h1>
					</div>
				</div>
			</div>
			<div class="caro-btns flex items-end gap-3">
				<div
					class="play bg-base-100/80 p-2 rounded-full aspect-square w-12 h-12 flex items-center justify-center"
				>
					<div class="icon opacity-50 text-white">
						<ChevronLeft  size="32"/>
					</div>
				</div>
				<div
					class="play bg-base-100/80 p-2 rounded-full aspect-square w-12 h-12 flex items-center justify-center"
				>
					<div class="icon opacity-50 text-white">
						<ChevronRight size="32"/>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div> -->

{#if $continueWatching.length > 0}
	<div class="continue-watching mt-6 p-6 border-b-2 border-base-content/20">
		<h1 class="text-lg font-medium mb-4">Recently Watched</h1>
		<div class="grid grid-cols-4 gap-2 gap-y-4">
			{#each $continueWatching as anime}
				<div class="mian flex flex-col gap-2 ">
					<a href="/{anime.id}?dub={$isDub.value}&provider={$currentProvider.value}"
						><div class="card aspect-video relative ">
							<img class="w-full h-full object-cover" src="https://proxy-for-movie-app.yashgajbhiye10.workers.dev/{anime.eps[0].image}" alt="" />
							<div class="absolute flex items-end bg-base-100/60 p-2 inset-0">
								<i class="text-sm">{anime.eps[0].number}. {anime.eps[0].title}</i>
							</div>
							<div class="layer absolute inset-0 flex items-end">
								<!-- <div
								class="transparent relative w-full z-0 inset-y-0 border-b-4 border-base-content/60"
							/> -->
								<div
									style="width: {anime.eps[0].percent}%;"
									class="transparent absolute z-10 inset-y-0 border-b-4 border-accent"
								/>
								<div
									style="width: {anime.eps[0].percent}%;"
									class="transparent blur absolute z-10 inset-y-0 border-b-4 border-accent"
								/>
							</div>
						</div></a
					>
					<h1 class="line-clamp-2 text-sm opacity-70">{anime.title}</h1>
				</div>
			{/each}
		</div>
	</div>
{/if}

<TabGroup class="p-4 ">
	<TabList class="mb-4 py-3 border-base-content/10">
		<Tab let:selected let:active class=""
			><span
				let:selected
				let:active
				class={selected
					? 'bg-base-content/20 p-3 rounded-md text-sm font-medium'
					: 'p-3 text-sm opacity-50 font-medium'}>Trending</span
			></Tab
		>
		<Tab let:selected let:active class=" "
			><span
				let:selected
				let:active
				class={selected
					? 'bg-base-content/20 p-3 rounded-md text-sm font-medium'
					: 'p-3 text-sm opacity-50 font-medium'}>Recent</span
			></Tab
		>
		<Tab let:selected let:active class=" "
			><span
				let:selected
				let:active
				class={selected
					? 'bg-base-content/20 p-3 rounded-md text-sm font-medium'
					: 'p-3 text-sm opacity-50 font-medium'}>Popular</span
			></Tab
		>
	</TabList>
	<TabPanels>
		<TabPanel
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
			>{#each trending as anime}
				<Card {anime} {session} showRating="true" />
			{/each}
		</TabPanel>
		<TabPanel
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
			>{#each recent as anime}
				<Card {anime} {session} showRating="true" recentEpisode="true" />
			{/each}</TabPanel
		>
		<TabPanel
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
			>{#each popular as anime}
				<Card {anime} {session} showRating="true" />
			{/each}</TabPanel
		>
	</TabPanels>
</TabGroup>

<!-- <main class="p-4 space-y-16 mt-10">
	<div class="trending space-y-3">
		<h1 class="text-xl font-medium">Trending</h1>
		<div
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
		>
			{#each trending as anime}
				<Card {anime} {session} showRating="true" />
			{/each}
		</div>
	</div>
	<div class="recent space-y-3">
		<h1 class="text-xl font-medium">Recent Episodes</h1>
		<div
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
		>
			{#each recent as anime}
				<Card {anime} {session} showRating="true" recentEpisode="true" />
			{/each}
		</div>
	</div>
	<div class="popular space-y-3">
		<h1 class="text-xl font-medium">Popular</h1>
		<div
			class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
		>
			{#each popular as anime}
				<Card {anime} {session} showRating="true" />
			{/each}
		</div>
	</div>
</main> -->
<style>
	:global(.tab-selected) {
		background-color: beige;
	}
</style>
