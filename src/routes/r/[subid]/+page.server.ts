import { db } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../../../config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await locals.getSession();
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
	const subscription = !user?.user
		? undefined
		: await db.subscription.findFirst({
				where: {
					subreddit: {
						name: subredditName
					},
					user: {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						id: user.user.id
					}
				}
		  });
	const isSubscribed = !!subscription;
	const memberCount = await db.subscription.count({
		where: {
			subreddit: { name: subredditName }
		}
	});

	return {
		subreddit,
		isSubscribed,
		memberCount
	};
};
