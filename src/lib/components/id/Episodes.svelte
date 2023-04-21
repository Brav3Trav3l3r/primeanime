<script>
	export let anime;
	import { ChevronRight, ChevronLeft, Play, X, Search, LayoutGrid } from 'lucide-svelte';
	import { currentProvider, continueWatching } from '$lib/store/store.js';
	import { paginate, PaginationNav } from 'svelte-paginate';
	import Player from '../Player.svelte';
	import { afterNavigate } from '$app/navigation';
	import Player3 from '../Player3.svelte';
	import PlayerTwo from '../PlayerTwo.svelte';
	import Card from '../Card.svelte';

	export let filterd = [];


	afterNavigate(() => {
		console.log('navigate');
		playingEp = null;
	});

	let playingEp = null;

	$: items = anime.episodes;

	let items;
	let currentPage = 1;
	let pageSize = 12;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<div class="main space-y-8 w-full">
	{#if playingEp}
		<div id='player' class="space-y-4 mx-auto max-w-[960px]">
			<div  class="player group aspect-video bg-base-300 truncate relative">
				{#key playingEp}
					<Player {playingEp} on:updateWatching/>
				{/key}
				<button
					on:click={() => {
						playingEp = null;
					}}
					class="button group-hover:block hidden z-50 absolute top-0 right-0 px-2 py-1 cursor-pointer hover:bg-red-600"
				>
					<X size="20" />
				</button>
			</div>
			<h1 class="font-semibold opacity-60">
				{playingEp.number}. {playingEp?.title ?? `Episode ${playingEp.number}`}
			</h1>
		</div>
	{/if}

	{#if playingEp}
		<hr class="opacity-10" />
	{/if}

	{#if paginatedItems.length}
		<div class="filter flex md:flex-row flex-col gap-2 md:items-center md:justify-between">
			<div class="paginate">
				<PaginationNav
					let:value={pageNumber}
					totalItems={items.length}
					{pageSize}
					{currentPage}
					limit={1}
					showStepOptions={true}
					on:setPage={(e) => {
						console.log(e);
						currentPage = e.detail.page;
					}}
				>
					<span slot="prev">
						<ChevronLeft />
					</span>
					<span slot="number" class="text-lg">
						{pageNumber}
					</span>
					<span slot="next">
						<ChevronRight />
					</span>
				</PaginationNav>
			</div>
			<div class="relative opacity-60 flex items-center gap-6">
				<LayoutGrid fill="#D6CBCB" strokeWidth="0" size="28" />
				<input
					type="text"
					placeholder="Search episode"
					class="input placeholder:text-base-content/50 rounded-md input-bordered w-full max-w-xs"
				/>
			</div>
		</div>

		<div
			class="episodes focus:outline-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-8 "
		>
			{#each paginatedItems as ep (ep.id)}
				<div class="ep-card space-y-2">
					<a href="#player"><figure
						on:click={async () => {
							playingEp = ep;
						}}
						on:keydown
						class="aspect-video relative"
					>
						<img
							src="https://proxy-for-movie-app.yashgajbhiye10.workers.dev/{ep.image}"
							alt={ep.title}
							class="h-full w-full object-cover"
						/>
						{#if playingEp?.id === ep.id}
							<div class="layer absolute inset-0 bg-base-300/80 flex items-center justify-center">
								<div class="play bg-primary p-3 rounded-full flex items-center justify-center">
									<div class="icon translate-x-0.5">
										<Play fill="black" size="32" strokeWidth="0" />
									</div>
								</div>
							</div>
						{/if}
						{#if filterd.length > 0 && filterd.some((obj) => obj.number === ep.number)}
							<div class="layer absolute inset-0 bg-black/60 flex items-end">
								<!-- <div
									class="transparent relative w-full z-0 inset-y-0 border-b-4 border-base-content/60"
								/> -->
								<div
									style="width: {filterd.find((eps) => eps.number === ep.number).percent}%;"
									class="transparent absolute z-10 inset-y-0 border-b-4 border-primary"
								/>
								<div
									style="width: {filterd.find((eps) => eps.number === ep.number).percent}%;"
									class="transparent blur absolute z-10 inset-y-0 border-b-4 border-primary"
								/>
							</div>
						{/if}
					</figure></a>

					<div class="card-content space-y-2">
						<h2 class="">{ep?.number}. {ep?.title ?? `Episodes ${ep?.number}`}</h2>
						{#if ep.description != null}
							<p class="opacity-60  text-xs line-clamp-3 tracking-wider">
								{ep.description}
							</p>
						{:else}
							<p />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<h1>No episode can be found from {$currentProvider.name} :(</h1>
		<h1 class="text-sm opacity-50">Try switching the provider</h1>
	{/if}
</div>

<style>
	.border-primary {
	}

	.paginate :global(.pagination-nav) {
		display: flex;
		gap: 16px;
		align-items: center;
	}

	.paginate :global(.option) {
		color: #d0c5c5;
		cursor: pointer;
	}

	.paginate :global(.option.active) {
		color: #d99330;
	}

	.paginate :global(.option.number) {
		text-align: center;
		width: 20px;
		font-weight: bold;
	}

	.paginate :global(.option.next) {
		opacity: 0.7;
	}

	.paginate :global(.option.prev) {
		opacity: 0.7;
	}

	.paginate :global(.option.disabled) {
		opacity: 0.2;
	}
</style>
