import { db } from '$lib/server/prisma';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../../../config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals, url }) => {
	const data = url.searchParams.get('page') ?? 1;
	let take = INFINITE_SCROLL_PAGINATION_RESULTS;
	let skip = (+data - 1) * +take;
	const user = await locals.getSession();
	const { subreddit, subredditName } = await parent();
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
	const totalPost = await db.post.count({
		where: {
			subredditId: subreddit.id
		}
	});
	let end = false;
	if (skip >= totalPost) {
		take = totalPost;
		skip = 0;
		end = true;
	}
	const post = await db.post.findMany({
		where: {
			subredditId: subreddit.id
		},
		include: {
			subreddit: true,
			votes: true,
			author: true,
			comments: true
		},
		take: take,
		skip
	});
	return {
		end,
		posts: post,
		data,
		subreddit,
		isSubscribed,
		memberCount
	};
};
