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
		if (subscriptionExists) {
			return json('You are already a member', { status: 400 });
		}
		await db.subscription.create({
			data: {
				subredditId,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				userId: user.user.id
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
