<script lang="ts">
	import Posts from '$lib/components/Posts.svelte';
	import { Home } from 'lucide-svelte';
</script>

<h1 class="text-3xl font-bold md:text-4xl">Your Feed</h1>
<div class="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
	<!-- Feed -->
	<!-- Subreddit Info -->
	<div class="h-fit overflow-hidden rounded-lg border border-gray-200 md:order-last">
		<div class="py4 bg-emerald-100 px-6">
			<p class="flex items-center gap-1.5 py-3 font-semibold">
				<Home class="h4 w-4" />
				Home
			</p>
		</div>
		<div class="py3 -my-3 divide-x divide-gray-100 px-6 py-4 text-sm leading-6">
			<div class="flex justify-between gap-x-4 py-3">
				<p class="text-zinc-500">
					Your personal Breadit hompage.Come here to checkin with your favorite communities
				</p>
			</div>
			<a href="/r/create" class="btn mb-6 mt-4 w-full bg-black text-zinc-200">Create Community</a>
		</div>
	</div>
</div>

<Posts />
