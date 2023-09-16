import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ parent, locals }) => {
	const user = await locals.getSession();
	if (!user) {
		throw error(404, 'Not Logged In');
	}

	const { subreddit, subredditName } = await parent();
	return {
		subredditName,
		subreddit
	};
};

export const actions: Actions = {
	createPost: async ({ request }) => {
		const formdata = Object.fromEntries(await request.formData());
		console.log(formdata);
	}
};
