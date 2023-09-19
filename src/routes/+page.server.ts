import { db } from '$lib/server/prisma';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
	const user = await locals.getSession();
	const page = url.searchParams.get('page') ?? 1;
	let followedCommunitiesIds: string[] = [];
	if (user?.user) {
		const followedCommunities = await db.subscription.findMany({
			where: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				userId: user.user.id
			},
			include: {
				subreddit: true
			}
		});

		followedCommunitiesIds = followedCommunities.map((sub) => sub.subreddit.id);
	}
	const whereClause = {
		subreddit: {
			id: {
				in: followedCommunitiesIds
			}
		}
	};
	const post = await db.post.findMany({
		take: INFINITE_SCROLL_PAGINATION_RESULTS,
		skip: (+page - 1) * INFINITE_SCROLL_PAGINATION_RESULTS, // skip should start from 0 for page 1
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			subreddit: true,
			votes: true,
			author: true,
			comments: true
		},
		where: whereClause
	});
	const totalPost = await db.post.count({
		where: whereClause
	});
	return {
		posts: post,
		page,
		totalPost
		// subreddit,
		// isSubscribed,
		// memberCount
	};
};
