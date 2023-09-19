import { db } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals, url }) => {
	const page = url.searchParams.get('page') ?? 1;
	const limit = url.searchParams.get('limit') ?? 2;
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
		take: +limit,
		skip: (+page - 1) * +limit
	});
	return {
		totalPost,
		posts: post,
		page,
		subreddit,
		isSubscribed,
		memberCount
	};
};
