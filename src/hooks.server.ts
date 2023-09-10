import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/github';
import {
	GITHUB_CLIENT,
	GITHUB_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { db } from '$lib/server/prisma';

export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GitHub({ clientId: GITHUB_CLIENT, clientSecret: GITHUB_SECRET }),
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
	],
	pages: {
		signIn: '/sign-in',
		signOut: '/sign-out',
		error: '/error'
	},
	callbacks: {
		async session({ session, user }) {
			session.user = {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				id: user.id,
				name: user.name,
				email: user.email,
				image: user.image
			};
			return session;
		}
	}
});
