import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export async function load(event, locals) {

	const res = await fetch('https://api.consumet.org/meta/anilist/airing-schedule')

	return {
		session: await getServerSession(event)
	};
}
