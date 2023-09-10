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
	session: { strategy: 'jwt' },
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
		async session({ token, session }) {
			if (token) {
				token.name = session.user?.name;
				token.email = session.user?.email;
				token.picture = session.user?.image;
				token.id = session.user?.id;
				token.username = session.user?.username;
			}
			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: {
					email: token.email
				}
			});
			if (!dbUser) {
				token.id = user.id;
				return token;
			}
			if (!dbUser.username) {
				await db.user.update({
					where: {
						id: dbUser.id
					},
					data: {
						username: crypto.randomUUID()
					}
				});
			}
			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				username: dbUser.username
			};
		}
	}
});
