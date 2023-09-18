<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ImagePlus, Link2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	function createRedirect() {
		toast.promise(goto(`${$page.url.pathname}/submit`), {
			loading: 'Creating Page...',
			error: 'Try again',
			success: 'Page created'
		});
	}
</script>

<li class="list-none overflow-hidden rounded-md bg-white shadow">
	<div class="flex justify-between gap-6 px-6 py-4">
		<div class="relative">
			<img class="h-8 w-8" src={$page.data.session?.user?.image} alt="" />
			<span
				class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 outline outline-2 outline-white"
			>
			</span>
		</div>
		<input
			type="text"
			class="input variant-form-material"
			placeholder="Create Post"
			readonly
			on:click={() => createRedirect()}
		/>
		<button on:click={() => createRedirect()}><ImagePlus /></button>
		<button on:click={() => createRedirect()}><Link2 /></button>
	</div>
</li>
