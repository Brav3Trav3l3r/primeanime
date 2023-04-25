<script>
	import { page } from '$app/stores';
	import Card from '../lib/components/Card.svelte';
	import { ChevronLeft, ChevronRight, Play } from 'lucide-svelte';
	export let data;
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import { continueWatching, currentProvider, isDub } from '$lib/store/store.js';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	$: trending = data.trend?.results ?? undefined;
	$: recent = data.recent?.results ?? undefined;
	$: popular = data.popular?.results;
	$: session = $page.data?.session ?? undefined;
	import '@splidejs/svelte-splide/css';
</script>

{#if $continueWatching.length > 0}
	<div class="continue-watching mt-14 lg:mt-6 px-3 md:px-6 mb-6">
		<h1 class="text-lg font-medium mb-3">Recently Watched</h1>
		<!-- <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-4"> -->
		<Splide
			options={{
				// rewind: true,
				perPage: 4,
				breakpoints: {
					640: {
						perPage: 2
					},
					1280: {
						perPage:3
					},
					// 1280: {
					// 	perPage:4
					// }
				},
				gap: '1rem'
			}}
			aria-label="My Favorite Images"
		>
			{#each $continueWatching as anime}
				<SplideSlide>
					<div class="mian flex flex-col gap-2 ">
						<a href="/{anime.id}?dub={$isDub.value}&provider={$currentProvider.value}"
							><div class="card aspect-video relative ">
								<img
									class="w-full h-full object-cover"
									src="https://proxy-for-movie-app.yashgajbhiye10.workers.dev/{anime.eps[0].image}"
									alt=""
								/>
								<div class="absolute flex items-end bg-base-100/60 p-2 inset-0">
									<i class="text-sm">{anime.eps[0].number}. {anime.eps[0].title}</i>
								</div>
								<div class="percent layer absolute inset-0 flex items-end">
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
				</SplideSlide>
			{/each}
		</Splide>
		<!-- </div> -->
	</div>
{/if}

<TabGroup class="mt-14 lg:mt-0 relative">
	<TabList
		class="flex border-b-2 border-t-2 border-base-content/20 backdrop-blur bg-base-100/80 items-center gap-2 md:gap-3 h-16 sticky top-[-1px] z-10  px-3 md:px-6 "
	>
		<Tab let:selected let:active
			><span
				let:selected
				let:active
				class={selected ? 'text-base-content font-medium' : 'font-medium opacity-50'}>Trending</span
			></Tab
		>
		<ChevronRight size="16" strokeWidth="3" color="#636061" />
		<Tab let:selected let:active
			><span
				let:selected
				let:active
				class={selected ? 'text-base-content font-medium' : 'font-medium opacity-50'}>Recent</span
			></Tab
		>
		<ChevronRight size="16" strokeWidth="3" color="#636061" />
		<Tab let:selected let:active
			><span
				let:selected
				let:active
				class={selected ? 'text-base-content font-medium' : 'font-medium opacity-50'}>Popular</span
			></Tab
		>
	</TabList>
	<TabPanels class="p-3 md:p-6 relative z-0">
		<TabPanel
			class="grid gap-1 md:gap-3 gap-y-6 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
			>{#each trending as anime}
				<Card {anime} {session} showRating="true" />
			{/each}
		</TabPanel>
		<TabPanel
			class="grid gap-1 md:gap-3 gap-y-6 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
			>{#each recent as anime}
				<Card {anime} {session} showRating="true" recentEpisode="true" />
			{/each}</TabPanel
		>
		<TabPanel
			class="grid gap-1 md:gap-3 gap-y-6 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 "
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
