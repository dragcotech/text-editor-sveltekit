<script lang="ts">
	export let data;
	import { signIn } from '@auth/sveltekit/client';
	import toast from 'svelte-french-toast';
	import { Github, Youtube } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<p>{JSON.stringify($page.data.session?.user)}</p>
<!-- For error -->
{#if data.error}
	{toast.error(data.error.error)}
{/if}
<div class="flex flex-col items-start">
	<a href="/" class="variant-ghost-tertiary btn">Home</a>
	<div class="mx-auto flex w-full flex-col space-y-6 text-center">
		<div class="flex min-h-full flex-col space-y-2">
			<img src="/favicon.ico" alt="Logo" srcset="" class="mx-auto h-10 w-10 sm:h-14 sm:w-14" />
			<h1 class="text-2xl font-bold tracking-tight">Welcome Back</h1>
			<p class="mx-auto max-w-[40ch] text-base font-semibold leading-5">
				By continuing, you are setting up a Breadit account and agree to our User Agreement and
				Privacy Policy.
			</p>
			<button
				on:click={() => signIn('github', { callbackUrl: '/' })}
				class="btn flex gap-2 self-center rounded-md bg-black text-white"
			>
				<Github />
				Sign In Using Github
			</button>
			<button
				on:click={() => signIn('google', { callbackUrl: '/' })}
				class="btn flex items-center justify-center gap-2 self-center rounded-md bg-black text-white"
			>
				<Youtube />
				Sign In Using Google
			</button>
			<p class="px-8 text-center text-sm font-medium text-zinc-500">
				New to Breatdit?{' '}
				<a
					href="/sign-up"
					class="text-sm font-bold underline underline-offset-4 hover:text-zinc-950"
				>
					Sign Up</a
				>
			</p>
		</div>
	</div>
</div>
