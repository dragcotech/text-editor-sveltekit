<script lang="ts">
	import type { ExtendedPost } from '$lib/utils';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Link from './editorjsFormat/Link.svelte';
	import Paragraph from './editorjsFormat/Paragraph.svelte';
	import About from './posts/About.svelte';
	export let posts: ExtendedPost[];
</script>

<div class="flex flex-col gap-3">
	{#each posts as post}
		<div
			class="flex max-h-[200px] gap-2 overflow-hidden truncate rounded-md border
			 border-gray-400 hover:cursor-pointer hover:border-gray-900"
		>
			<div class="flex flex-col items-center justify-start border-r bg-gray-100 px-2 py-5">
				<ChevronUp class="hover:border hover:stroke-red-600" />
				{'0'}
				<ChevronDown class="hover:border hover:stroke-red-600" />
			</div>
			<div class="w-full py-1 pb-2">
				<About
					authorName={post.author.name}
					subredditName={post.subreddit.name}
					time={post.content.time}
				/>

				<div>
					<h1 class="mt-1 text-xl font-bold capitalize">{post.title}</h1>
					<div class="px-3 pr-[4.25rem] text-sm">
						{#each post?.content?.blocks as block}
							{#if block.type === 'paragraph'}
								<Paragraph text={block?.data?.text} />
							{/if}

							{#if block.type === 'linkTool'}
								<Link
									link={block.data.link}
									title={block.data?.meta?.title}
									description={block.data?.meta?.description}
									url={block.data.meta?.image?.url}
								/>
							{/if}
							{#if block.type === 'list' && block.data.items}
								{#each block?.data?.items as item}
									<li>{item}</li>
								{/each}
							{/if}
							{#if block.type === 'code'}
								<pre class="pre">{block.data.code}</pre>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
