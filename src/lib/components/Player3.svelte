<script>
	import { onDestroy, onMount } from 'svelte';
	import { defineCustomElements } from 'vidstack/elements';
	import { currentEp, isDub, continueWatching, currentProvider } from '$lib/store/store.js';
	import 'vidstack/styles/defaults.css';

	export let playingEp = null;
	let player;
	let ready = false;
	let url;
	let proxy = 'https://m3u8-proxy-cors-eta.vercel.app/cors?url=';
	let engSub = null;
	let captions = [];
	let newArray = [];
	let subSrc;

	onMount(() => {
		let unsub;
		defineCustomElements().then(() => {
			player.onAttach(() => {
				ready = true;
				unsub = player.subscribe(({ currentTime }) => {
					console.log('currentTime:', Math.trunc(currentTime));
				});
			});
		});

		return unsub;
	});

	onDestroy(() => {
		playingEp = null;
		player.destroy();
	});

	$: if (playingEp && ready) {
		changeSrc();
	}

	function getDefaultSource(sources) {
		const defaultSource = sources.find(
			(source) => source.quality === 'auto' || source.quality === 'default'
		);
		return defaultSource.url || sources[0].url;
	}

	const changeSrc = async () => {
		console.log('got req');
		console.log(url);

		console.log(playingEp.id);
		const res = await fetch(
			`https://api-consumet-rust.vercel.app/meta/anilist/watch/${playingEp.id}?provider=${$currentProvider.value}`
		);

		const resJson = await res.json();
		const newUrl = await getDefaultSource(resJson.sources);
		console.log(newUrl);
		player.src = `${proxy}${newUrl}`;

		if ($currentProvider.value === 'zoro') {
			console.log('getting subs');
			subSrc = resJson.subtitles;
			engSub = subSrc.find((obj) => obj.lang === 'English');
			console.log(engSub);
			// newArray = subSrc.map((obj) => createNewObjectWithChangedKeys(obj, keyMap));
		}
	};
</script>

<media-player
	class="w-full h-full object-contain"
	aspect-ratio="16/9"
	bind:this={player}
	controls
>
	<media-outlet />
</media-player>
