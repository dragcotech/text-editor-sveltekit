<script lang="ts">
	import { page } from '$app/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import toast from 'svelte-french-toast';
	let loading = false;
	let name: string;
	async function createSubreddit() {
		loading = true;
		try {
			const response = await fetch('/api/subreddit', {
				method: 'POST',
				body: JSON.stringify({ name }),
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

{JSON.stringify($page.data.session?.user)}
<div class="mx-auto flex h-full max-w-3xl">
	<div class="relative h-fit w-full space-y-6 rounded-lg bg-white p-4">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold">Create a Community</h1>
		</div>
		<hr class="h-px bg-zinc-500" />
		<div>
			<p class="text-lg font-medium">Name</p>
			<p class="pb-2 text-xs">Community name including capitalisation cannot be changed</p>
			<div class="relative">
				<p
					class="absolute inset-y-0 -top-1 left-1 grid w-8 place-items-center text-lg text-zinc-400"
				>
					r/
				</p>
				<input
					type="text"
					class="w-full rounded-md py-2 pl-8 outline outline-2 outline-gray-300"
					bind:value={name}
				/>
			</div>
		</div>
		<div class="flex justify-end gap-4">
			<button
				on:click={() => createSubreddit()}
				disabled={loading}
				class="btn flex gap-2 bg-black text-white"
			>
				{#if loading}
					<ProgressRadial class="h-6 w-6" />
				{/if}
				Create Community
			</button>
		</div>
	</div>
</div>
