<script>
	export let anime;
	export let title;
	import { Verified } from 'lucide-svelte';

</script>

<div class="title text-white">
	{#if anime?.cover === anime?.image}
		<div class="image w-64 relative top-16 left-8 aspect-square">
			<div class=" absolute blur-xl inset-0 bg-black opacity-50" />
			<img src={anime.cover} class="relative w-full h-full object-cover " alt="" />
		</div>
	{/if}

	<div
		class="{anime.cover === anime.image
			? 'left-80'
			: 'left-6'} absolute bottom-6 right-6 top-16 flex flex-col justify-end"
	>
		{#if anime.studios && anime.studios.length > 0}
			<div class="studio flex items-center pb-2">
				<div class="icon">
					<Verified fill="#3D91F4" strokeWidth="1" size="28" />
				</div>
				<h1 class="px-1 text-sm">{anime.studios}</h1>
			</div>
		{/if}
		<h1
			class="{title.length > 24
				? 'text-6xl'
				: 'text-7xl'} title-text font-bold line-clamp-3 overflow-hidden pt-1 pb-4 "
		>
			{title}
		</h1>
		<div class="group flex space-x-4 mt-4 p-1 pt-1">
			<div class="nest-group flex space-x-2">
				{#if anime.releaseDate != null}
					<h1>{anime.releaseDate}</h1>
				{/if}
				{#if anime.season != null}
					<h1>{anime.season}</h1>
				{/if}
			</div>
			<h1>|</h1>
			{#if anime.genres && anime.genres.length > 0}
				<ul class="flex space-x-3">
					{#each anime.genres as genre}
						<li class="">{genre}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
