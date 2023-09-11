<script lang="ts">
	import toast from 'svelte-french-toast';
	export let isSubscribed: boolean;
	export let subredditId: string;

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
			loading = false;
			if (!response.ok) {
				const res = await response.json();
				toast.error(res.toString() ?? 'Try again Later...');
			}
			if (response.ok) {
				toast.success(`sucessfully created ${name}`);
			}
			return await response.json();
		} catch (e) {
			console.log('try again');
		}
	}
</script>

{#if isSubscribed}
	<button class="btn mb-4 mt-1 w-full bg-black font-semibold text-white">Leave Community</button>
{:else}
	<button
		class="btn mb-4 mt-1 w-full bg-black font-semibold text-white"
		on:click={() => joinSubreddit()}>Join Community</button
	>
{/if}
