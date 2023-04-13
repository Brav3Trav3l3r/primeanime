import { redirect, error } from '@sveltejs/kit';

export async function POST({ locals }) {
	const { error: err } = await locals.sb.auth.signOut();

	if (err) {
		throw error(500, 'Something went wrong');
	}

	throw redirect(303, '/');
}
