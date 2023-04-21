import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const body = Object.fromEntries(await request.formData());

		if (body.query) {
			throw redirect(303, `/search/${body.query}`);
		}
	}
};
