<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	export let data;
</script>

<!-- {JSON.stringify(data)} -->
<div class="flex flex-col gap-6">
	<div class="border-b border-gray-200 pb-5">
		<div class="-ml-2 -mt-2 flex flex-wrap items-baseline">
			<h3 class=" ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">Create Post</h3>
			<p class="ml-2 mt-1 truncate text-sm text-gray-500">in r/{data.subredditName}</p>
		</div>
	</div>
	<!-- form -->
	<div class="flex w-full justify-end">
		<Editor subredditName={data.subredditName} />
	</div>
</div>
