<script>
	import { playerOn, currentEp, isDub, currentProvider } from '$lib/store/store.js';
	import { onDestroy, onMount } from 'svelte';
	import { X } from 'lucide-svelte';
	import Artplayer from 'artplayer';
	import { beforeNavigate } from '$app/navigation';

	let art;
	let captions = [];
	let newArray = [];
	let url;
	let subSrc;
	let proxy = 'https://m3u8-proxy-cors-eta.vercel.app/cors?url=';

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
		await getUrl($currentEp.id);

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

		art.on('video:canplaythrough', () => {
			console.info('play');
		});
		art.on('destroy', () => {
			console.info('destroy-event');
		});

		// return () => {
		// 	art.destroy();
		// 	console.log('destroyed');
		// };
	});

	onDestroy(() => {
		art.destroy();
		console.log('destroyed');
		currentEp.set(null)
	});

	const search = async (array) => {
		if (array != null) {
			const obj = await array.find((el) => el.quality === 'default' || el.quality === 'auto');
			return obj.url;
		}
	};
	const getUrl = async (id) => {
		if (id != null) {
			const res = await fetch(
				`https://api-consumet-rust.vercel.app/meta/anilist/watch/${id}?provider=${$currentProvider.value}`
			);
			const data = await res.json();
			const sources = data.sources;
			const promise = await search(sources);
			url = promise;
			if ($currentProvider.value === 'zoro') {
				subSrc = data.subtitles;
				newArray = subSrc.map((obj) => createNewObjectWithChangedKeys(obj, keyMap));
				// const subData = await subtitles.find((el) => el.lang === 'English');
				// subSrc = await subData.url;
			}
		}
	};
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</svelte:head>

<div class="artplayer-app w-full h-full object-contain " />
<button
	on:click={() => {
		art.destroy();
		currentEp.set(null);
	}}
	class="button z-50 absolute top-4 right-4 cursor-pointer"
>
	<X color="red" />
</button>
