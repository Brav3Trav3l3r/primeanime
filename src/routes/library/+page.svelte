<script>
	import { profile, deleteFromLib } from '$lib/store/supaStore';
	import { X } from 'lucide-svelte';
	import Card from '../../lib/components/Card.svelte';
	$: library = $profile?.library;
</script>

<div class="main mt-10 p-3 md:px-6">
	<h1 class="text-lg font-medium my-3">Library</h1>
	{#if library != null}
		<div class="card-group grid gap-2 md:gap-3 gap-y-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
			{#each library as anime}
				{#if anime != null}
					<Card {anime} />
				{/if}
			{/each}
		</div>
	{/if}
</div>
