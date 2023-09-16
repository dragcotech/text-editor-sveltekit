import { error } from '@sveltejs/kit';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../../../config';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
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
		subreddit,
		subredditName
	};
};
