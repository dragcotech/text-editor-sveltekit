<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.postcss';
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<Toast
	padding="p-4"
	position="tr"
	buttonDismissLabel="❌"
	buttonDismiss="hover:scale-[0.8] transition-all"
	color="variant-glass-error text-black"
/>

<main class="pt-[5rem]">
	<div class="fixed inset-x-0 top-0 z-10 h-fit border-b border-zinc-300 bg-zinc-100 px-4 py-3">
		<NavBar />
	</div>
	<slot />
</main>
