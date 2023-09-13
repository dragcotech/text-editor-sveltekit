<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import toast from 'svelte-french-toast';
	export let isSubscribed: boolean;
	export let subredditId: string;
	export let subreddit: string;
	let loading = false;

	async function joinSubreddit() {
		loading = true;
		try {
			const response = await fetch('/api/subreddit/subscribe', {
				method: 'POST',
				body: JSON.stringify({ subredditId }),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (!response.ok) {
				const res = await response.json();
				toast.error(res.toString() ?? 'Try again Later...');
			}
			if (response.ok) {
				await invalidateAll();
				toast.success(`sucessfully joined r/${subreddit}`);
			}
			loading = false;
			return await response.json();
		} catch (e) {
			console.log('try again');
		}
	}
	async function leaveSubreddit() {
		loading = true;
		try {
			const response = await fetch('/api/subreddit/leave', {
				method: 'POST',
				body: JSON.stringify({ subredditId }),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (!response.ok) {
				const res = await response.json();
				toast.error(res.toString() ?? 'Try again Later...');
			}
			if (response.ok) {
				await invalidateAll();
				toast.success(`Left r/${subreddit}`);
			}
			loading = false;
			return await response.json();
		} catch (e) {
			console.log('try again');
		}
	}
</script>

{#if isSubscribed}
	<button
		class="btn mb-4 mt-1 flex w-full gap-3 bg-black font-semibold text-white"
		on:click={() => leaveSubreddit()}
		disabled={loading}
	>
		{#if loading}
			<ProgressRadial class="h-6 w-6 stroke-white" track="bg-white" />
		{/if}
		Leave Community
	</button>
{:else}
	<button
		class="btn mb-4 mt-1 flex w-full gap-3 bg-black font-semibold text-white"
		on:click={() => joinSubreddit()}
		disabled={loading}
	>
		{#if loading}
			<ProgressRadial class="h-6 w-6 stroke-white" track="bg-white" />
		{/if}
		Join Community
	</button>
{/if}
