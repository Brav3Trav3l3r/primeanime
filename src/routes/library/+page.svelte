<script>
	import { profile, deleteFromLib } from '$lib/store/supaStore';
	import { X } from 'lucide-svelte';
	import Card from '../../lib/components/Card.svelte';
	$: library = $profile?.library;
</script>

<div class="container px-4">
	<h1 class="text-xl font-semibold mt-10 ">Library</h1>
	{#if library != null}
		<div class="card-group grid grid-cols-6 mt-6 gap-4">
			{#each library as anime}
				{#if anime != null}
					<Card {anime} />
				{/if}
			{/each}
		</div>
	{/if}
</div>
