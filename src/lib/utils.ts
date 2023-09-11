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

export function dateFormat(date: number | Date) {
	const formattedDate = new Intl.DateTimeFormat('en-GB', {
		dateStyle: 'full'
	}).format(date);
	return formattedDate;
}
