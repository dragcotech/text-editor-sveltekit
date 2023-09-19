<script lang="ts">
	import { goto } from '$app/navigation';
	import Posts from '$lib/components/Posts.svelte';
	import type { ExtendedPost } from '$lib/utils.js';
	import { Home } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../config.js';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import toast from 'svelte-french-toast';
	export let data;
	let posts: ExtendedPost[] = [];
	let loader: HTMLDivElement;
	onMount(() => {
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				return;
			}
			if (posts.length === data.totalPost) {
				io.unobserve(loader);
				loader.remove();
				toast.error('No more posts to fetch');
			} else {
				toast.promise(
					goto(`?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${+data.page + 1}`, {
						noScroll: true,
						replaceState: true,
						invalidateAll: true
					}),
					{
						loading: 'Loading Posts',
						success: 'Post Loaded',
						error: 'Error Fetching Post'
					}
				);
			}
		});
		io.observe(loader);
	});

	$: {
		// @ts-ignore
		posts.push(...data.posts);
		posts = posts;
	}
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

<Posts {posts} />
<p bind:this={loader} class="self-center">
	<ProgressRadial class="h-8 w-8" />
</p>
