import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export async function load(event, locals) {
	return {
		session: await getServerSession(event)
	};
}
