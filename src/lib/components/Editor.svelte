<script lang="ts">
	import { goto } from '$app/navigation';
	import { ProgressRadial, focusTrap } from '@skeletonlabs/skeleton';
	let isFocused: boolean = true;
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	let editor: any;
	let loading = false;
	export let subredditId: string;
	export let subredditName: string;
	let title: string;
	onMount(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		// @ts-ignore
		const Embed = (await import('@editorjs/embed')).default;
		// @ts-ignore
		const List = (await import('@editorjs/list')).default;
		// @ts-ignore
		const Code = (await import('@editorjs/code')).default;
		// @ts-ignore
		const LinkTool = (await import('@editorjs/link')).default;
		// @ts-ignore
		const InlineCode = (await import('@editorjs/inline-code')).default;
		// @ts-ignore
		const ImageTool = (await import('@editorjs/image')).default;

		editor = new EditorJS({
			holder: editor,
			placeholder: 'Type here to write your post...',
			inlineToolbar: true,
			data: { blocks: [] },
			tools: {
				header: Header,
				linkTool: {
					class: LinkTool,
					config: {
						endpoint: '/api/link'
					}
				},
				image: {
					class: ImageTool
				},
				list: List,
				code: Code,
				inlineCode: InlineCode,
				embed: Embed
			}
		});
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	async function createPost() {
		loading = true;
		const content = await editor.save();
		const response = await fetch('/api/subreddit/post/create', {
			method: 'POST',
			body: JSON.stringify({ subredditId, title, content }),
			headers: {
				'content-type': 'application/json'
			}
		});
		if (response.ok) {
			toast.promise(
				goto(`/r/${subredditName}`, {
					noScroll: true
				}),
				{
					success: 'Post Created',
					error: 'Cannot Redirect',
					loading: 'Creating'
				}
			);
		}
		if (!response.ok) {
			const res = await response.json();
			toast.error(res.toString() ?? 'Try again Later...');
			loading = false;
		}
	}
</script>

<div class="w-full rounded-lg border-zinc-200 bg-zinc-50 p-4">
	<form
		class="w-fit"
		use:focusTrap={isFocused}
		on:submit={() => {
			createPost();
		}}
	>
		<div>
			<textarea
				class="textarea hide-scrollbar my-1 w-full resize-none appearance-none overflow-scroll border-2 border-gray-400 bg-transparent px-2 pt-1 text-4xl font-bold leading-none placeholder:py-1 focus:outline-none"
				rows="1"
				placeholder="Title"
				bind:value={title}
			/>
		</div>
		<div bind:this={editor} class="min-h-[300px] overflow-clip" />
		<button
			class="btn flex w-full gap-3 bg-black font-semibold text-gray-200"
			type="submit"
			disabled={loading}
		>
			{#if loading}
				<ProgressRadial class="h-6 w-6 stroke-white" track="bg-white" />
			{/if}
			Post
		</button>
	</form>
</div>
