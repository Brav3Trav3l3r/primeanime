<script>
	import '../app.css';
	import 'iconify-icon';

	export let data;
	const { session } = data;
	import { playerOn, currentEp, continueWatching } from '$lib/store/store.js';
	import Player from '../lib/components/Player.svelte';
	import { redirect } from '@sveltejs/kit';
	import { getProfile, profile } from '$lib/store/supaStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate, invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import Navbar from '../lib/components/Navbar.svelte';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { AlignLeft } from 'lucide-svelte';
	import Footer from '../lib/components/Footer.svelte';

	NProgress.configure({ showSpinner: false });

	// $: ()=>{
	// 	const newArr = $continueWatching.map(e=>e.id)
	// 	console.log(newArr)
	// }

	// animesInContinueWatcihng()

	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		yScroll = 0;
		NProgress.done();
		box.scrollTop = yScroll;
	});

	onMount(() => {
		getProfile(session);
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(async (event, session) => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	let box;
	let yScroll;
	function parseScroll() {
		yScroll = box.scrollTop;
	}
</script>

<svelte:head>
	<title>{$page.data.title ? $page.data.title : 'AniFlix'}</title>
</svelte:head>

<div class="drawer drawer-mobile font-poppins">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div
		class="drawer-content relative flex flex-col justify-between"
		bind:this={box}
		on:scroll={parseScroll}
	>
		<div class="slot relative z-0">
			<slot />
		</div>
		<label
			for="my-drawer-2"
			class="z-10 absolute top-2 left-4 drawer-button lg:hidden text-white p-2 cursor-pointer"
			><AlignLeft /></label
		>
		<Footer />
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<Navbar />
	</div>
</div>
