import { db } from '$lib/server/prisma';
import { subscriptionValidator } from '$lib/validators/subreddit';
import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const user = await locals.getSession();
		if (!user?.user) {
			return json('Please Log in', { status: 401 });
		}
		const body = await request.json();
		const { subredditId } = subscriptionValidator.parse(body);
		const subscriptionExists = await db.subscription.findFirst({
			where: {
				subredditId,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				userId: user.user?.id
			}
		});
		const isCreator = await db.subreddit.findFirst({
			where: {
				id: subredditId,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				creatorId: user.user.id
			}
		});
		if (isCreator) {
			return json("You can't leave your own subreddit");
		}
		if (!subscriptionExists) {
			return json('You are not a member', { status: 400 });
		}
		await db.subscription.delete({
			where: {
				userId_subredditId: {
					subredditId,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					userId: user.user.id
				}
			}
		});
		return json(subredditId);
	} catch (e) {
		if (e instanceof z.ZodError) {
			return json('Invalid request data passed', { status: 400 });
		}
		return json('Could not join Subreddit', { status: 500 });
	}
};
