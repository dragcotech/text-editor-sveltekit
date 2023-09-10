import { DefaultSession as ogSession } from '@auth/core/types';

type UserId = string;
declare module '@auth/core/jwt' {
	interface JWT {
		id: UserId;
		username?: string | null;
	}
}

declare module '@auth/core/types' {
	interface Session {
		user?: ogSession['user'] & {
			id: UserId;
			username: string | null;
		};
	}
}
