import { redirect } from '@sveltejs/kit';
import * as Vibrant from 'node-vibrant';

export async function load({ params, fetch, setHeaders, url, depends }) {
	const dub = await url.searchParams.get('dub');
	const provider = await url.searchParams.get('provider');
	const res = await fetch(
		`https://api-consumet-rust.vercel.app/meta/anilist/info/${params.id}?dub=${dub}&provider=${provider}`
	);
	console.log(res.status)
	
	let anime;
	if (res.ok) {
		anime = await res.json();
		setHeaders({ 'cache-control': 'max-age=60' });
	}

	let color = null;

	if (res.ok && anime.cover) {
		const palette = await Vibrant.from(anime.cover).getPalette();
		const [r, g, b] = palette.Vibrant.rgb;
		color = `rgba(${r},${g},${b})`;
	}

	return {
		query: { dub: dub, provider: provider },
		paramsId: params.id,
		color,
		anime,
		title: res.ok ? (anime.title.english ? anime.title.english : anime.title.romaji) : ''
	};
}

export const actions = {
	changeSrc: async ({ request, params }) => {
		const formData = await request.formData();
		const dub = formData.get('dub');
		const provider = formData.get('provider');

		throw redirect(307, `/${params.id}?dub=${dub}&provider=${provider}`);
	}
};
