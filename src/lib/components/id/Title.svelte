<script>
	export let anime;
	export let title;
	import { Verified } from 'lucide-svelte';
</script>

<div class="title text-white ">
	{#if anime?.cover === anime?.image}
		<div class="image w-56 xl:w-64 relative top-16 left-6 xl:left-8 aspect-square">
			<div class=" absolute blur-xl inset-0 bg-black opacity-50" />
			<img src={anime.cover} class="relative w-full h-full object-cover " alt="" />
		</div>
	{/if}

	<div
		class="{anime.cover === anime.image
			? 'left-72 xl:left-80'
			: 'md:left-6 left-3'} absolute bottom-3 right-3 md:bottom-6 md:right-6 top-16 flex flex-col justify-end"
	>
		{#if anime.studios && anime.studios.length > 0}
			<div class="studio flex items-center pb-2 gap-1">
				<div class="icon">
					<Verified fill="#3D91F4" strokeWidth="1" size="28" />
				</div>
				<div class="studios flex gap-2">
					{#each anime.studios as studio}
						<h1 class="text-sm">{studio}</h1>
					{/each}
				</div>
			</div>
		{/if}
		<h1
			class="{title.length > 24
				? 'text-3xl md:text-4xl xl:text-6xl'
				:  'text-4xl md:text-5xl  xl:text-7xl'} text-3xl md:text-4xl title-text font-bold line-clamp-3 overflow-hidden pt-1 pb-4 "
		>
			{title}
		</h1>
		<div class="group flex gap-3 xl:mt-4 mt-2 p-1 pt-1">
			<div class="nest-group flex gap-2">
				{#if anime.releaseDate != null}
					<h1>{anime.releaseDate}</h1>
				{/if}
				{#if anime.season != null}
					<h1>{anime.season}</h1>
				{/if}
			</div>
			<h1 class="hidden xl:block">|</h1>
			{#if anime.genres && anime.genres.length > 0}
				<ul class="xl:flex gap-2 hidden ">
					{#each anime.genres as genre}
						<li class="">{genre}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
