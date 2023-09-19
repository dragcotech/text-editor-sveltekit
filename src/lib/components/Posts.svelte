<script lang="ts">
	// @ts-nocheck
	import type { ExtendedPost } from '$lib/utils';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import About from './posts/About.svelte';
	import { page } from '$app/stores';
	import MainRenderer from './editorjsFormat/MainRenderer.svelte';
	export let posts: ExtendedPost[];
</script>

<div class="flex flex-col gap-3">
	{#each posts as post}
		{@const currentVote = post.votes.find((vote) => vote.userId === $page.data?.session?.user?.id)}
		<div
			class="flex max-h-[200px] gap-2 overflow-hidden truncate rounded-md border
			 border-gray-400 hover:cursor-pointer hover:border-gray-900"
		>
			<div class="flex flex-col items-center justify-start border-r bg-gray-100 px-2 py-5">
				{#if currentVote && currentVote?.type === 'UP'}
					<ChevronUp class="stroke-red-600 hover:border" />
				{:else}
					<ChevronUp class="hover:border hover:stroke-red-600 " />
				{/if}
				{post.votes.reduce((acc, vote) => {
					if (vote.type === 'UP') {
						return acc + 1;
					}
					if (vote.type === 'DOWN') {
						return acc - 1;
					}
					return acc;
				}, 0)}

				{#if currentVote && currentVote?.type === 'DOWN'}
					<ChevronDown class="stroke-red-600 hover:border" />
				{:else}
					<ChevronDown class="hover:border hover:stroke-red-600" />
				{/if}
			</div>
			<div class="w-full py-1 pb-2">
				<About
					authorName={post.author.name}
					subredditName={post.subreddit.name}
					time={post.content.time}
				/>

				<a href={`r/${post.subreddit.name}/${post.id}`}>
					<h1 class="mt-1 text-xl font-bold capitalize">{post.title}</h1>
					<div class="px-3 pr-[4.25rem] text-sm">
						{#each post?.content?.blocks as block}
							<MainRenderer {block} />
						{/each}
					</div>
				</a>
			</div>
		</div>
	{/each}
</div>
