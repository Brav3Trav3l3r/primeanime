<script>
	export let anime;
	export let recentEpisode = false;
	export let showRating = false;
	import {LazyImage} from 'svelte-lazy-image';
	$: animeTitle = (anime.title?.english ?? anime.title.romaji) || anime.title;
	import { addToLib, profile, lib, deleteFromLib } from '$lib/store/supaStore';
	import { currentProvider, isDub } from '$lib/store/store';
	import { Percent, Plus, Check, Heart } from 'lucide-svelte';
</script>

{#if anime.id}
	<div class="card relative group">
		<div class="absolute right-1 top-1 z-10 hidden group-hover:block ">
			{#if $lib && $profile && $lib?.includes(anime.id)}
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
		</div>

		<a href="/{anime.id}?dub={$isDub.value}&provider={$currentProvider.value}" class="z-0">
			<div class="card z-0 flex flex-col relative">
				<div class=" image aspect-[2/3] flex-1 overflow-hidden">
					<LazyImage src={anime.image} alt={animeTitle} options={{ threshold: 0.5 }} class="w-full h-full object-cover" />
				</div>

				<div class="w-full bg-base-300 h-10" />
				<div
					class="w-full absolute bottom-10 inset-x-0 h-40 bg-gradient-to-t from-base-300 to-base-300/0"
				/>
				<div
					class="w-full space-y-2 absolute bottom-0 inset-x-0 h-40 flex flex-col justify-end p-2"
				>
					{#if anime.type != 'TV'}
						<div class="badge">{anime?.type ?? ''}</div>
					{/if}
					{#if anime.isAdult === true}
						<div class="badge badge-error">{anime?.isAdult ?? ''}</div>
					{/if}

					<div class="title ">
						<h1 class="">{animeTitle}</h1>
					</div>
					{#if showRating}
						<div class="info flex justify-between">
							<h1 class="text-md text-neutral-content opacity-70">
								<i class="font-roboto text-md"
									>{anime.episodes || anime.totalEpisodes
										? anime?.episodes ?? anime.totalEpisodes
										: anime.episodeNumber || '?'}</i
								>
								<i class="text-sm ml-1 ">eps</i>
							</h1>
	
							{#if anime.rating}
								<div class="rating flex items-center text-md gap-1 text-secondary">
									<h1 class="font-roboto">{anime.rating}</h1>
									<Percent size="16" />
								</div>
							{/if}
						</div>
					{/if}
				</div>
				{#if recentEpisode}
					<div
						class="absolute px-3 py-1 top-2 flex items-center justify-center left-0 bg-black"
					>
						<h1 class="text-xs">
							<span class="text-accent">#</span> {anime.episodeNumber} 
						</h1>
					</div>
				{/if}
			</div>
		</a>
	</div>
{/if}
