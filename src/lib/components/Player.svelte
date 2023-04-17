<script>
	import { currentEp, isDub, continueWatching, currentProvider } from '$lib/store/store.js';
	import { onDestroy, onMount } from 'svelte';
	import Artplayer from 'artplayer';
	import { page } from '$app/stores';

	export let playingEp = null;
	$: console.log(playingEp);

	let arr = $continueWatching;
	let art;
	let playingEpisode = null;
	let currentTime = 0;
	$: currentEpNumber = playingEp?.number ?? undefined;
	let captions = [];
	let newArray = [];
	let url;
	let subSrc;
	let proxy = 'https://m3u8-proxy-cors-eta.vercel.app/cors?url=';

	$: playingEpisode = {
		id: $page.data.paramsId,
		number: currentEpNumber,
		time: currentTime
	};

	$:async () => {
		console.log("change")
		await getUrl(playingEp);
		art.switchUrl(url);
	};

	const keyMap = {
		lang: 'html',
		url: 'url'
	};

	const createNewObjectWithChangedKeys = (obj, keyMap) => {
		const newObj = {};
		for (const key in obj) {
			if (keyMap.hasOwnProperty(key)) {
				if (key === 'lang') {
					newObj[keyMap[key]] = `<span style="color:green">${obj[key]}</span>`;
				} else {
					newObj[keyMap[key]] = obj[key];
				}
			} else {
				newObj[key] = obj[key];
			}
		}
		return newObj;
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

	onMount(async () => {
		await getUrl(playingEp.id);

		art = new Artplayer({
			container: '.artplayer-app',
			url: `${proxy}${url}`,
			type: 'm3u8',
			subtitle: {
				type: 'vtt',
				encoding: 'utf-8',
				escape: false,
				style: {
					color: '#fff',
					'font-size': '30px'
				}
			},
			caption: captions,

			customType: {
				m3u8: playM3u8
			},
			setting: true,
			settings: [
				{
					html: 'Subtitle',
					width: 250,
					selector: newArray,
					onSelect: async function (item, $dom, event) {
						art.subtitle.url = item.url;
						return item.html;
					}
				}
			]
		});

		art.on('ready', async () => {
			art.url = `${proxy}${url}`
			const obj = await arr.find(
				(obj) => obj['id'] === playingEpisode.id && obj['number'] === playingEpisode.number
			);
			if (obj) {
				console.log('obj', obj);
				art.seek = obj.time;
			}
		});

		art.on('video:timeupdate', () => {
			currentTime = Math.trunc(art.currentTime);
		});
		art.on('destroy', () => {
			console.info('destroy-event');
		});
	});

	onDestroy(async () => {
		const foundIndex = await arr.findIndex(
			(obj) => obj['id'] === playingEpisode.id && obj['number'] === playingEpisode.number
		);
		if (foundIndex !== -1) {
			arr[foundIndex].time = playingEpisode.time;
		} else {
			arr.push(playingEpisode);
		}
		continueWatching.set(arr);
		playingEp.set(null);
	});

	const getUrl = async (id) => {
		console.log('started');
		if (id) {
			const res = await fetch(
				`https://api-consumet-rust.vercel.app/meta/anilist/watch/${id}?provider=${$currentProvider.value}`
			);
			const data = await res.json();
			const sources = data.sources;
			const obj = await sources.find((el) => el.quality === 'default' || el.quality === 'auto');
			url = obj.url;
			console.log(url);
			if ($currentProvider.value === 'zoro') {
				console.log('getting subs');
				subSrc = data.subtitles;
				newArray = subSrc.map((obj) => createNewObjectWithChangedKeys(obj, keyMap));
				console.log(newArray)
			}
		}
	};
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</svelte:head>

<div class="artplayer-app w-full h-full object-contain " />
