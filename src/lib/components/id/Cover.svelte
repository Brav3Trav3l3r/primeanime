<script>
	import {LazyImage} from 'svelte-lazy-image';

	export let anime;
	export let color;

</script>

<div class="image w-full h-full z-0">
	{#if anime?.cover != anime?.image}
		<LazyImage options={{ threshold: 0.5 }} src={anime?.cover ?? anime.image} alt="" fetchpriority="high" class="image w-full h-full object-cover" />
	{:else}
		<div style:background-color={color} class="w-full h-full opacity-70" />
	{/if}
</div>
<div class="backdrop absolute inset-0 z-10 bg-black opacity-30" />
