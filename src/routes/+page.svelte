<script>
	import { page } from '$app/stores';
	import Card from '../lib/components/Card.svelte';
	import { ChevronLeft, ChevronRight, Play } from 'lucide-svelte';
	export let data;

	$: trending = data.trend?.results ?? undefined;
	$: recent = data.recent?.results ?? undefined;
	$: popular = data.popular?.results ;
	$: session = $page.data?.session ?? undefined;
</script>

<div class="featured h-[350px] bg-base-content/10 flex relative">
	<div class="empty-area w-2/5 bg-base-300 h-full" />
	<div class="banner relative 3/5 h-full">
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
		<h1 class="font-lexend font-bold text-5xl line-clamp-2 text-white">MASHLE: MAGIC AND MUSCLES</h1>
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
</div>
<main class="p-4 space-y-10 mt-10">
	<div class="trending space-y-3">
		<h1 class="text-xl font-bold">Trending</h1>
		<div class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 ">
			{#each trending as anime}
				<Card {anime} {session} />
			{/each}
		</div>
	</div>
	<div class="recent space-y-3">
		<h1 class="text-xl font-bold">Recent Episodes</h1>
		<div class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 ">
			{#each recent as anime}
				<Card {anime} {session} recentEpisode=true/>
			{/each}
		</div>
	</div>
	<div class="popular space-y-3">
		<h1 class="text-xl font-bold">Popular</h1>
		<div class="grid gap-3 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 ">
			{#each popular as anime}
				<Card {anime} {session} />
			{/each}
		</div>
	</div>
</main>
