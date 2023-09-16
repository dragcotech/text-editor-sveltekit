import { db } from '$lib/server/prisma';
import { PostValidator } from '$lib/validators/subreddit';
import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.getSession();
	if (!user) {
		return json('Please Log In', { status: 401 });
	}
	try {
		const body = await request.json();
		const { title, subredditId, content } = PostValidator.parse(body);
		const subscriptionExists = db.subscription.findFirst({
			where: {
				subredditId,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				userId: user.user.id
			}
		});
		if (!subscriptionExists) {
			return json('Join the Subreddit Before Posting', { status: 400 });
		}
		await db.post.create({
			data: {
				title,
				content,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				authorId: user.user.id,
				subredditId
			}
		});
		return json('OK', { status: 200 });
	} catch (e) {
		if (e instanceof z.ZodError) {
			const { title } = e.flatten().fieldErrors;
			return json(title, { status: 400 });
		}
		return json('Could not create Subreddit', { status: 500 });
	}
};
