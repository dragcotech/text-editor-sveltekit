<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import '../app.postcss';
</script>

<Toaster />

<main class="px-4 pt-[5rem]">
	<div class="fixed inset-x-0 top-0 z-10 h-fit border-b border-zinc-300 bg-zinc-100 px-4 py-3">
		<NavBar />
	</div>
	<slot />
</main>
