<script>
	export let anime;
	import { playerOn, currentEp } from '$lib/store/store.js';
	import Player from '../Player.svelte';
</script>


{#if $currentEp}
	{#key $currentEp}
		<div class="player aspect-video bg-base-300 max-w-[960px] mx-auto mb-10 truncate relative">
			<Player />
		</div>
	{/key}
{/if}

<div class="episodes focus:outline-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-8 ">
	{#each anime.episodes as ep}
		<!-- <h1>{ep?.number}. {ep?.title}</h1> -->
		<div class="ep-card space-y-2">
			<figure
				on:click={() => {
					currentEp.set(ep);
					playerOn.set(true);
				}}
				on:keydown
				class="aspect-video"
			>
				<img src={ep.image} alt={ep.title} class="h-full w-full object-cover" />
			</figure>
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
		<!-- <div class="block group">
            <img
                src={ep.image}
                alt={ep.title}
                class="aspect-video w-full object-cover "
            />

            <div class="mt-3">
                <h3
                    class="text-sm text-gray-200 group-hover:underline group-hover:underline-offset-4"
                >
                {ep?.number}. {ep?.title}
                </h3>

                <p class="mt-1.5 max-w-[40ch] text-xs text-gray-400">
                    {ep.description?.slice(0, 80) ?? ''}...
                </p>
            </div>
        </div> -->
	{/each}
</div>
