import { subredditSchema } from '$lib/validators/subreddit';
import { db } from '$lib/server/prisma';
import { z } from 'zod';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const user = await locals.getSession();
		if (!user) {
			return json('Please Log In', { status: 401 });
		}
		const body = await request.json();
		const { name } = subredditSchema.parse(body);
		const subredditExists = await db.subreddit.findFirst({
			where: {
				name
			}
		});
		if (subredditExists) {
			return json('Subreddit Already Exists', { status: 409 });
		}
		const subreddit = await db.subreddit.create({
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			data: { name, creatorId: user.user?.id }
		});
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await db.subscription.create({ data: { userId: user.user?.id, subredditId: subreddit.id } });
		return json(subreddit.name);
	} catch (e) {
		if (e instanceof z.ZodError) {
			const { name } = e.flatten().fieldErrors;
			return json(name, { status: 400 });
		}
		return json('Could not create Subreddit', { status: 500 });
	}
};
