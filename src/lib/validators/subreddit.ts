import { z } from 'zod';

export const subredditSchema = z.object({
	name: z
		.string({ required_error: 'Required Subreddit Name' })
		.max(21, { message: 'Subreddit name should be less than 21 words' })
		.min(3, { message: 'Subreddit name should be more than 3 words' })
});

export const subscriptionValidator = z.object({
	subredditId: z.string()
});

export type SubscribeSubredditPayload = z.infer<typeof subscriptionValidator>;
