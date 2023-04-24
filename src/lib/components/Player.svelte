<script>
	import { currentEp, isDub, continueWatching, currentProvider } from '$lib/store/store.js';
	import { onDestroy, onMount } from 'svelte';
	import Artplayer from 'artplayer';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let playingEp = null;

	let ready = false;
	let arr = $continueWatching;
	let art;
	let playingEpisode = null;
	let currentTime = 0;
	$: currentEpNumber = playingEp?.number ?? undefined;
	$: currentTitle = playingEp?.title ?? undefined;
	let captions = [];
	let newArray = [];
	let url;
	let subSrc;
	let engSub;
	let proxy = 'https://m3u8-proxy-cors-eta.vercel.app/cors?url=';
	let duration;

	$: playingEpisode = {
		id: $page.data.paramsId.toString(),
		title: $page.data.title,
		image: $page.data.anime.image,
		rating: $page.data.anime.rating,
		totalEpisodes: $page.data.anime.totalEpisodes,
		eps: [
			{
				number: currentEpNumber,
				title: currentTitle,
				image: playingEp?.image,
				time: currentTime,
				duration: duration,
				percent: (currentTime / duration) * 100
			}
		],
		lastWatched: {
			percent: (currentTime / duration) * 100,
			number: currentEpNumber
		}
	};
	// const keyMap = {
	// 	lang: 'html',
	// 	url: 'url'
	// };

	// const createNewObjectWithChangedKeys = (obj, keyMap) => {
	// 	const newObj = {};
	// 	for (const key in obj) {
	// 		if (keyMap.hasOwnProperty(key)) {
	// 			if (key === 'lang') {
	// 				newObj[keyMap[key]] = `<span style="color:green">${obj[key]}</span>`;
	// 			} else {
	// 				newObj[keyMap[key]] = obj[key];
	// 			}
	// 		} else {
	// 			newObj[key] = obj[key];
	// 		}
	// 	}
	// 	return newObj;
	// };

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
					fontSize: '32px'
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
					width: 250
					// selector: newArray,
					// onSelect: async function (item, $dom, event) {
					// 	art.subtitle.url = item.url;
					// 	return item.html;
					// }
				}
			],
			icons: {
				loading: '<img src="/dsgif.gif">'
			}
		});

		art.on('ready', async () => {
			if (engSub) {
				art.subtitle.url = engSub.url;
			}
			duration = art.duration;
			const url = await art.getBlobUrl();
			seekFunction();
		});

		art.on('video:timeupdate', () => {
			currentTime = Math.trunc(art.currentTime);
		});
		art.on('destroy', () => {
			console.info('destroy-event');
		});
		art.on('video:loadedmetadata', () => {
			console.info('loaded');
		});
	});

	onDestroy(async () => {
		art.destroy();
		await updateContinueWatching();
		playingEp = null;
		dispatch('updateWatching', {
			text: 'Update it man!'
		});
		console.log('destroy');
	});

	const seekFunction = async () => {
		const foundIndex = await arr.findIndex((obj) => obj['id'] === $page.data.paramsId);
		if (foundIndex !== -1) {
			const obj = arr[foundIndex].eps.find((obj) => obj['number'] === playingEpisode.eps[0].number);
			if (obj) {
				art.seek = obj.time;
			}
		}
	};

	const updateContinueWatching = async () => {
		const foundIndex = await arr.findIndex((obj) => obj['id'] === $page.data.paramsId);
		if (foundIndex !== -1) {
			const obj = arr[foundIndex].eps.find((obj) => obj['number'] === playingEpisode.eps[0].number);
			if (obj) {
				obj.time = playingEpisode.eps[0].time;
			} else if (playingEpisode.eps[0].time > 20) {
				arr[foundIndex].eps.unshift(playingEpisode.eps[0]);
			}
			if (playingEpisode.eps[0].time > 20) {
				arr[foundIndex].lastWatched = playingEpisode.lastWatched;
			}
		} else if (playingEpisode.eps[0].time > 20) {
			arr.unshift(playingEpisode);
		}
		continueWatching.set(arr);
	};

	async function getDefaultSource(sources) {
		const defaultSource = sources.find(
			(source) => source.quality === 'auto' || source.quality === 'default'
		);
		url = defaultSource.url || sources[0].url;
	}

	const getUrl = async (id) => {
		console.log('started');
		if (id) {
			const res = await fetch(
				`https://api-consumet-rust.vercel.app/meta/anilist/watch/${id}?provider=${$currentProvider.value}`
			);
			let resJson;

			if (res.ok) {
				resJson = await res.json();
				getDefaultSource(resJson.sources);
			}

			// if ($currentProvider.value === 'zoro') {
			// 	console.log('getting subs');
			// 	subSrc = data.subtitles;

			// 	newArray = subSrc.map((obj) => createNewObjectWithChangedKeys(obj, keyMap));
			// 	console.log(newArray);
			// }
			if ($currentProvider.value === 'zoro') {
				console.log('getting subs');
				subSrc = resJson.subtitles;
				const data = subSrc.find((obj) => obj.lang === 'English');
				if (data) {
					engSub = data;
				}
			}
		}
	};
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</svelte:head>

<div class="artplayer-app w-full h-full object-contain " />
