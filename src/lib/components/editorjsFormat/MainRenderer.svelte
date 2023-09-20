<script lang="ts">
	import type { Block } from '$lib/utils';
	import Link from './Link.svelte';
	import Paragraph from './Paragraph.svelte';
	export let block: Block;
</script>

{#if block.type === 'paragraph'}
	<Paragraph text={block?.data?.text} />
{/if}

{#if block.type === 'linkTool'}
	<Link
		link={block.data.link}
		title={block.data?.meta?.title ?? block.data.link}
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
