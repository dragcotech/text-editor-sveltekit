import { z } from 'zod';

// create subreddit validation
export const subredditSchema = z.object({
	name: z
		.string({ required_error: 'Required Subreddit Name' })
		.max(21, { message: 'Subreddit name should be less than 21 words' })
		.min(3, { message: 'Subreddit name should be more than 3 words' })
});
// create subreddit post validation
export const PostValidator = z.object({
	title: z
		.string()
		.min(3, { message: 'Title should be longer than 3 character' })
		.max(128, { message: 'Title must be less than 128 characters' }),
	subredditId: z.string(),
	content: z.any()
});
export const subscriptionValidator = z.object({
	subredditId: z.string()
});

export type SubscribeSubredditPayload = z.infer<typeof subscriptionValidator>;

export type PostValidatorType = z.infer<typeof PostValidator>;
