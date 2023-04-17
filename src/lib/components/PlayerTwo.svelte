<script>
	import { onMount, onDestroy } from 'svelte';
	import { currentEp, isDub, continueWatching, currentProvider } from '$lib/store/store.js';
	import Artplayer from 'artplayer';
	import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
	import { page } from '$app/stores';

	export const propFunction = async () => {
		console.log('ran prop');
		changeSrc();
	};

	export let playingEp = null;
	$: console.log('url:', url);
	$: console.log('playingEp:', playingEp.title);

	let ready = false;
	let url;
	let art;
	let proxy = 'https://m3u8-proxy-cors-eta.vercel.app/cors?url=';

	// $: if (playingEp && ready) {
	// 	changeSrc();
	// }

	const changeSrc = async () => {
		console.log('got req');
		console.log(url);

		const res = await fetch(
			`https://api-consumet-rust.vercel.app/meta/anilist/watch/${playingEp.id}?provider=${$currentProvider.value}`
		);

		const resJson = await res.json();
		const newUrl = await getDefaultSource(resJson.sources);
		console.log(newUrl);

		art.switchUrl(`${proxy}${newUrl}`);
	};

	function playM3u8(video, url, art) {
		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(url);
			hls.attachMedia(video);

			// optional
			art.hls = hls;
			art.once('url', () => hls.destroy());
			art.once('destroy', () => hls.destroy());
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = url;
		} else {
			art.notice.show = 'Unsupported playback format: m3u8';
		}
	}

	function getDefaultSource(sources) {
		const defaultSource = sources.find(
			(source) => source.quality === 'auto' || source.quality === 'default'
		);
		return defaultSource.url || sources[0].url;
	}

	onMount(async () => {
		const res = await fetch(
			`https://api-consumet-rust.vercel.app/meta/anilist/watch/${playingEp.id}?provider=${$currentProvider.value}`
		);

		const resJson = await res.json();
		url = await getDefaultSource(resJson.sources);

		art = new Artplayer({
			container: '.artplayer-app',
			type: 'm3u8',
			setting: true,
			plugins: [
				artplayerPluginHlsQuality({
					// Show quality in control
					control: true,

					// Show quality in setting
					setting: true,

					// Get the resolution text from level
					getResolution: (level) => level.height + 'P',

					// I18n
					title: 'Quality',
					auto: 'Auto'
				})
			],
			customType: {
				m3u8: playM3u8
			}
		});

		art.on('ready', async () => {
			art.url = `${proxy}${url}`
			ready = true;
		});
	});

	onDestroy(() => {
		console.log('destroyed');
		art.destroy();
	});
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</svelte:head>

<div class="artplayer-app w-full h-full object-contain " />
