<script lang="ts">
	import { goto } from '$app/navigation';
	import MiniCreatePost from '$lib/components/MiniCreatePost.svelte';
	import Posts from '$lib/components/Posts.svelte';
	import SubscribeLeave from '$lib/components/SubscribeLeave.svelte';
	import { dateFormat, type ExtendedPost } from '$lib/utils';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { INFINITE_SCROLL_PAGINATION_RESULTS } from '../../../config.js';
	import toast from 'svelte-french-toast';
	let posts: ExtendedPost[] = [];
	export let data;
	let loader: HTMLDivElement;
	onMount(() => {
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) {
				return;
			}
			if (posts.length === data.totalPost) {
				io.unobserve(loader);
				toast.error('No more posts to fetch');
				loader.remove();
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

<div class="mx-auto h-full max-w-7xl pt-12">
	<div>
		<!-- TODO: Button to take us back -->
		<div class="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
			<div class="col-span-2 flex flex-col space-y-6">
				<h1 class="h-14 text-3xl font-bold md:text-4xl">r/{data.subreddit.name}</h1>
				<MiniCreatePost />
				<!-- Todo Show Posts -->
				<Posts {posts} />
				<p bind:this={loader} class="self-center">
					<ProgressRadial class="h-8 w-8" />
				</p>
			</div>
			<div
				class="sticky top-3 order-first hidden h-fit overflow-hidden rounded-lg border-gray-200 md:order-last md:block"
			>
				<div class="px-6 py-4">
					<p class="py-3 font-semibold">About r/{data.subreddit.name}</p>
				</div>
				<dl class="lead divide-y divide-gray-100 bg-white px-6 py-4 text-sm leading-6">
					<div class="flex justify-between gap-x-4 py-3">
						<dt class="text-gray-500">Created</dt>
						<dd class="text-gray-700">
							<time datetime={data.subreddit.createdAt.toDateString()}
								>{dateFormat(data.subreddit.createdAt)}</time
							>
						</dd>
					</div>
					<div class="flex justify-between gap-x-4 py-3">
						<dt class="text-gray-500">Members</dt>
						<dd class="text-gray-700">
							<div class="text-gray-900">{data.memberCount}</div>
						</dd>
					</div>
					{#if data.subreddit.creatorId === data.session?.user?.id}
						<div class="flex justify-between gap-x-4 py-3">
							<p class="text-gray">You Created this Subreddit</p>
						</div>
					{/if}
					{#if data.subreddit.creatorId !== data.session?.user?.id}
						<SubscribeLeave
							isSubscribed={data.isSubscribed}
							subredditId={data.subreddit.id}
							subreddit={data.subreddit.name}
						/>
					{/if}
				</dl>
			</div>
		</div>
	</div>
</div>
