<script>
	import {
		Play,
		Heart,
		MoreHorizontal,
		CheckCircle,
		ChevronsUpDown
	} from 'lucide-svelte';
	import { addToLib, profile, lib, deleteFromLib } from '$lib/store/supaStore';
	import { page } from '$app/stores';
	import { currentProvider, isDub } from '$lib/store/store.js';
	let pageForm;
	import { invalidate, goto } from '$app/navigation';
	$: query = $page.data.query;
	export let anime;

	$: if (query.provider != $currentProvider.value) {
		const value = sources.find((e) => e.value === query.provider);
		currentProvider.set(value);
	}
	$: if (query.dub != $isDub.value) {
		const value = dubValue.find((e) => e.value === query.dub);
		isDub.set(value);
	}

	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Transition
	} from '@rgossiaux/svelte-headlessui';

	const sources = [
		{ name: 'Zoro', value: 'zoro', unavailable: false },
		{ name: 'Gogoanime', value: 'gogoanime', unavailable: false },
		{ name: 'Enime', value: 'enime', unavailable: false },
		{ name: 'Animephae', value: 'animephae', unavailable: false },
		{ name: 'Marin', value: 'marin', unavailable: false }
	];

	$: selectedSource = sources.find((e) => e.value === $currentProvider.value);

	const dubValue = [
		{ value: 'false', name: 'Sub', unavailable: false },
		{ value: 'true', name: 'Dub', unavailable: false }
	];

	$: selectedDubValue = dubValue.find((e) => (e.value === $isDub.value));
</script>

<div class="controls  flex items-center justify-between">
	<div class="group-1 flex items-center gap-6 ">
		<div class="play bg-primary p-3 rounded-full flex items-center justify-center">
			<div class="icon translate-x-0.5">
				<Play fill="black" size="32" strokeWidth="0" />
			</div>
		</div>
		<div class="heart-icon brightness-95 hover:brightness-90 cursor-pointer ">
			{#if $lib && $profile && $lib?.includes(anime.id)}
				<button
					on:click={() => deleteFromLib($profile, anime)}
					class=" w-10 aspect-square flex items-center justify-center"
					><Heart fill="red" strokeWidth="0" size="32" /></button
				>
			{:else if $profile}
				<button
					on:click={() => addToLib($profile, anime)}
					class=" w-10 aspect-square flex items-center brightness-50 justify-center"
					><Heart size="32" /></button
				>
			{:else}
				<button
					disabled
					on:click={() => addToLib($profile, anime)}
					class=" w-10 cursor-not-allowed aspect-square flex items-center brightness-50 justify-center"
					><Heart size="32" /></button
				>
			{/if}
		</div>
		<div class="dots-icon brightness-75 hover:brightness-90 cursor-pointer">
			<MoreHorizontal size="32" />
		</div>
		{#if $page.data.info && $page.data.info.trailer}
			<div class="trailer px-6 py-2 border-2 border-zinc-400/60 rounded-md hover:cursor-pointer">
				{#if $page.data.info.type === 'MUSIC'}
					<h1 class=" text-sm font-medium">PLAY</h1>
				{:else}
					<h1 class=" text-sm font-medium">TRAILER</h1>
				{/if}
			</div>
		{/if}
	</div>
	<div class="g-2 flex gap-1">
		<Listbox
			class="relative text-sm"
			value={selectedSource}
			on:change={(e) => {
				selectedSource = e.detail;
				goto(`/${anime.id}?dub=${selectedDubValue.value}&provider=${selectedSource.value}`);
			}}
		>
			<ListboxButton class="bg-base-100 py-2 px-4 flex items-center gap-3 focus:outline-none"
				>{selectedSource.name} <ChevronsUpDown size="14" color="gray" /></ListboxButton
			>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<ListboxOptions class="absolute bg-base-300 right-0 w-52 focus:outline-none mt-1 py-2 ">
					{#each sources as source (source.value)}
						<ListboxOption
							value={source}
							disabled={source.unavailable}
							class={({ active }) => (active ? 'bg-base-content/10 py-2 px-3 flex justify-between items-center' : 'py-2 px-3 opacity-50 flex justify-between items-center')}
							let:selected
						>
							{source.name}
							{#if selected}
								<CheckCircle size=16 color=green/>
							{/if}
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</Transition>
		</Listbox>
		<Listbox
			class="relative text-sm"
			value={selectedDubValue}
			on:change={(e) => {
				selectedDubValue = e.detail;
				goto(`/${anime.id}?dub=${selectedDubValue.value}&provider=${selectedSource.value}`);
			}}
		>
			<ListboxButton class="bg-base-100 py-2 px-4 flex items-center gap-3 focus:outline-none"
				>{selectedDubValue.name} <ChevronsUpDown size="14" color="gray" /></ListboxButton
			>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<ListboxOptions class="absolute bg-base-300 right-0 w-52 focus:outline-none mt-1 py-2 ">
					{#each dubValue as val (val.value)}
						<ListboxOption
							value={val}
							disabled={val.unavailable}
							class={({ active }) => (active ? 'bg-base-content/10 py-2 px-3 flex justify-between items-center' : 'py-2 px-3 opacity-50 flex justify-between items-center')}
							let:selected
						>
							{val.name}
							{#if selected}
								<CheckCircle size=16 color=green/>
							{/if}
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</Transition>
		</Listbox>
		
	</div>
</div>
