import { redirect, error } from '@sveltejs/kit';
import Vibrant from 'node-vibrant';

const providers = ['zoro', 'enime', 'gogoanime', 'animephae', 'marin'];
const type = ['true', 'false'];

export async function load({ params, fetch, setHeaders, url }) {
	const dub = await url.searchParams.get('dub');
	const provider = await url.searchParams.get('provider');

	const res = await fetch(
		`https://api-consumet-rust.vercel.app/meta/anilist/info/${params.id}?dub=${dub}&provider=${provider}`
	);
	const anime = await res.json();
	console.log(res.status);

	if (res.ok) {
		setHeaders({ 'cache-control': 'max-age=60' });
	} else {
		throw redirect(
			303,
			`/${params.id}?dub=${dub}&provider=${providers.find((e) => e !== provider)}`
		);
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
