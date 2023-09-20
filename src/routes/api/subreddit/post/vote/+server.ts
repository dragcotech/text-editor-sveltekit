import { db } from '$lib/server/prisma';
import { postVoteValdidator } from '$lib/validators/subreddit';
import { json, type RequestHandler } from '@sveltejs/kit';
const CACHE_AFTER_UPVOTES = 10;
export const PATCH: RequestHandler = async ({ locals, request }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return json('Please Log In', { status: 401 });
	}
	const body = await request.json();
	const { type, postId } = postVoteValdidator.parse(body);
	const existingVote = await db.vote.findFirst({
		where: {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			userId: user.id,
			postId
		}
	});
	const post = await db.post.findUnique({
		where: {
			id: postId
		},
		include: {
			author: true,
			votes: true
		}
	});
	if (!post) {
		return json('Post not found', { status: 404 });
	}
	if (existingVote) {
		if (existingVote.type === type) {
			await db.vote.delete({
				where: {
					userId_postId: {
						postId,
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						userId: user.user.id
					}
				}
			});
			return json('ok', { status: 200 });
		}
		await db.vote.update({
			where: {
				userId_postId: {
					postId,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					userId: user.user.id
				}
			},
			data: {
				type: type
			}
		});
		// recount the votes
		const votesAmt = post.votes.reduce((acc, vote) => {
			if (vote.type === 'UP') acc + 1;
			if (vote.type === 'DOWN') acc - 1;
			return acc;
		}, 0);
		// if (votesAmt >= CACHE_AFTER_UPVOTES) {
		// }
	}
	await db.vote.create({
		data: {
			type: type,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			userId: user.user.id,
			postId
		}
	});
	return json('ok', { status: 200 });
};
