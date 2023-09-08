<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { Github, GithubIcon, LucideGithub } from 'lucide-svelte';
	const toastStore = getToastStore();
	const successToast: ToastSettings = {
		message: '⚠️ Oops! Try Again',
		timeout: 5000
	};

	function signin() {
		try {
			// signIn('github', { callback: '/' });
			const p = he;
		} catch (e) {
			toastStore.trigger(successToast);
		}
	}
</script>

<div class="flex flex-col items-start">
	<a href="/" class="variant-ghost-tertiary btn">Home</a>
	<div class="mx-auto flex w-full flex-col space-y-6 text-center">
		<div class="flex min-h-full flex-col space-y-2">
			<img src="/favicon.ico" alt="Logo" srcset="" class="mx-auto h-10 w-10 sm:h-14 sm:w-14" />
			<h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
			<p
				class="mx-auto max-w-[40ch] text-base
			font-semibold leading-5"
			>
				By continuing, you are setting up a Breadit account and agree to our User Agreement and
				Privacy Policy.
			</p>
			<button on:click={signin} class="btn flex gap-2 self-center rounded-md bg-black text-white">
				<Github /> Sign In Using Github</button
			>
			<p class="px-8 text-center text-sm font-medium text-zinc-500">
				New to Breatdit?{' '}
				<a
					href="/sign-up"
					class="text-sm font-bold underline underline-offset-4 hover:text-zinc-950">Sign Up</a
				>
			</p>
		</div>
	</div>
</div>
