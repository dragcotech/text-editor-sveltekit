import type { Subreddit, User, Vote, Comment } from '@prisma/client';
const errors: { [key: string]: string } = {
	SigninError: 'Try signing with a different account.',
	OAuthSigninError: 'Try signing with a different account.',
	OAuthCallbackError: 'Try signing with a different account.',
	OAuthCreateAccountError: 'Try signing with a different account.',
	EmailCreateAccountError: 'Try signing with a different account.',
	CallbackRouteError: 'Try signing with a different account.',
	OAuthAccountNotLinkedError:
		'To confirm your identity, sign in with the same account you used originally.',
	EmailSigninError: 'Check your email address.',
	CredentialsSigninError: 'Sign in failed. Check the details you provided are correct.',
	default: 'Unable to sign in.'
};

export function checkError(e: string | null) {
	if (e) {
		if (Object.keys(errors).includes(e) || '') {
			return {
				error: errors[e]
			};
		}
	}
}

export function dateFormat(date: number | Date, style: 'full' | 'short' = 'full') {
	const formattedDate = new Intl.DateTimeFormat('en-GB', {
		dateStyle: style
	}).format(date);
	return formattedDate;
}

interface DataMeta {
	title?: string;
	description?: string;
	image?: {
		url: string;
	};
}
interface BlockData {
	text?: string;
	link?: string;
	level?: number; // Optional property for headers
	style?: string; // Optional property for lists
	items?: ArrayLike<unknown> | Iterable<unknown>; // Optional property for list items
	meta?: DataMeta;
	code?: string;
	file: {
		url: string;
	};
}

export interface Block {
	id: string;
	type: 'paragraph' | 'linkTool' | 'header' | 'code' | 'list' | 'image';
	data: BlockData;
}

interface PostContent {
	time: number;
	blocks: Block[];
	version: string;
}
export type ExtendedPost = {
	id: string;
	title: string;
	content: PostContent;
	createdAt: Date;
	updatedAt: Date;
	authorId: string;
	subredditId: string;
	subreddit: Subreddit;
	votes: Vote[];
	author: User;
	comments: Comment[];
};
