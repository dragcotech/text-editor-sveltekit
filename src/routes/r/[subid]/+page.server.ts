import { db } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals }) => {
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
	return {
		subreddit,
		isSubscribed,
		memberCount
	};
};
