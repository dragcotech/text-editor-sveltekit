<script lang="ts">
	import { enhance } from '$app/forms';
	import { onDestroy, onMount } from 'svelte';
	let editor: any;
	export let subredditName: string;

	onMount(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		// @ts-ignore
		const Embed = (await import('@editorjs/embed')).default;
		// @ts-ignore
		const Table = (await import('@editorjs/table')).default;
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
				table: Table,
				embed: Embed
			}
		});
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="w-full rounded-lg border-zinc-200 bg-zinc-50 p-4">
	<form action="?/createPost" id="subreddit-post-form" class="w-fit" method="POST">
		<input type="text" hidden class="hidden" name="subreddit" value={subredditName} />
		<div>
			<textarea
				class="textarea hide-scrollbar my-1 w-full resize-none appearance-none overflow-scroll border-2 border-gray-400 bg-transparent p-2 text-5xl font-bold placeholder:py-2 focus:outline-none"
				rows="1"
				placeholder="Title"
				name="title"
			/>
		</div>
		<div bind:this={editor} class="min-h-[300px] overflow-clip" />
		<button
			class="btn w-full bg-black font-semibold text-gray-200"
			type="submit"
			id="subreddit-post-form">Post</button
		>
	</form>
</div>
