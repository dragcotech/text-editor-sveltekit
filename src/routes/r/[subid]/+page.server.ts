import { db } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../../../config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const subredditName = params.subid;
	const subreddit = await db.subreddit.findFirst({
		where: { name: subredditName },
		include: {
			posts: {
				include: {
					comments: true,
					author: true,
					votes: true,
					subreddit: true
				},
				take: INFINITE_SCROLL_PAGINATION_RESULTS
			}
		}
	});
	if (!subreddit) {
		throw error(404, { message: 'Cannot Find Subreddit' });
	}
	return {
		subreddit
	};
};
