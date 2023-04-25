<script>
	export let anime;
	export let showRating = false;
	import { LazyImage } from 'svelte-lazy-image';
	$: animeTitle = (anime.title?.english ?? anime.title.romaji) || anime.title;
	import { addToLib, profile, lib, deleteFromLib } from '$lib/store/supaStore';
	import { currentProvider, isDub } from '$lib/store/store';
	import { Percent, Plus, Check, Heart, Cross, X } from 'lucide-svelte';
	import { continueWatching } from '$lib/store/store.js';
	import { scale } from 'svelte/transition';

	$: newArr = $continueWatching.map((e) => e.id);

	const removeFromContinuetWatching = async (anime) => {
		const filterArr = $continueWatching.filter((e) => e.id != anime.id);
		console.log(filterArr);
		continueWatching.set(filterArr);
	};
</script>

{#if anime.id}
	<div class="card relative group">
		<div class="absolute group-hover:flex flex-col gap-2 right-1 top-1 z-10 hidden ">
			{#if $lib && $profile && $lib?.includes(anime.id.toString())}
				<button
					on:click={() => deleteFromLib($profile, anime)}
					class="w-8 aspect-square bg-red-300 flex items-center justify-center rounded-full"
					><Heart fill="red" strokeWidth="0" size="20" /></button
				>
			{:else if $profile}
				<button
					on:click={() => addToLib($profile, anime)}
					class=" w-8 aspect-square bg-red-300 flex items-center justify-center rounded-full"
					><Heart color="red" size="20" /></button
				>
			{/if}
			{#if newArr.includes(anime.id.toString())}
				<div class="tooltip tooltip-right tooltip-primary" data-tip="Remove">
					<button
						on:click={() => removeFromContinuetWatching(anime)}
						class="w-8 aspect-square bg-secondary text-base-100 hover:text-red-500 flex items-center justify-center rounded-full"
						><X strokeWidth="2" size="20" /></button
					>
				</div>
			{/if}
		</div>

		<a href="/{anime.id}?dub={$isDub.value}&provider={$currentProvider.value}" class="z-0">
			<div class="card z-0 flex flex-col relative">
				<div class=" image aspect-[2/3] flex-1 overflow-hidden">
					<LazyImage
						src={anime.image}
						alt={animeTitle}
						options={{ threshold: 0.5 }}
						class="w-full h-full object-cover"
					/>
				</div>

				<!-- <div class="w-full border bg-base-300 h-10" /> -->
				<div
					class="w-full absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-base-300 to-base-300/0"
				/>
				<div
					class="w-full space-y-2 absolute bottom-0 inset-x-0 h-40 flex flex-col justify-end p-2"
				>
					{#if anime.type && anime?.type != 'TV'}
						<div class="badge badge-acent">{anime?.type ?? ''}</div>
					{/if}
					{#if anime.type && anime?.isAdult === true}
						<div class="badge badge-error">{anime?.isAdult ?? ''}</div>
					{/if}

					{#if showRating}
						<div class="info flex items-end justify-between">
							<h1 class="text-info">
								<i class="text-sm"
									>{anime.episodes || anime.totalEpisodes
										? anime?.episodes ?? anime.totalEpisodes
										: anime.episodeNumber || '?'}</i
								>
								<i class="text-sm ml-1 ">eps</i>
							</h1>

							{#if anime.rating}
								<div class="rating flex items-center text-md gap-1 text-sm text-success">
									<i class="font-roboto">{anime.rating}</i>
									<Percent size="16" />
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
			<div class="title mt-2 line-clamp-2">
				<h1 class="text-sm ">{animeTitle}</h1>
			</div>
		</a>
	</div>
{/if}
