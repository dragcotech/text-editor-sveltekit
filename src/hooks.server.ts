import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_CLIENT, GITHUB_SECRET, GOOGLE_CLIENT, GOOGLE_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [GitHub({ clientId: GITHUB_CLIENT, clientSecret: GITHUB_SECRET })]
});
