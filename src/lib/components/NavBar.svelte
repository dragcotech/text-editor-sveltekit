<script lang="ts">
	import { page } from '$app/stores';
	import ComboBox from './ComboBox.svelte';
</script>

<div class="mx-auto flex h-full max-w-7xl items-center justify-between">
	<a href="/" class="flex items-center gap-2">
		<img class="h-8 w-8" src="/favicon.ico" alt="Logo" />
		<p class="hidden text-sm font-bold text-zinc-700 sm:text-base md:block md:text-lg lg:text-lg">
			Breadit
		</p>
	</a>
	<div class="flex items-center gap-2">
		{#if $page.data?.session?.user}
			<ComboBox
				imageUrl={$page.data.session.user.image}
				name={$page.data.session.user.name}
				email="{$page.data.session.user.email}!"
			/>
		{:else}
			<a
				href="/sign-in"
				class="variant-filled-primary btn rounded-md text-sm font-medium sm:text-base">Sign In</a
			>
			<hr class="divider-vertical h-5 sm:h-7" />
			<a
				href="/sign-up"
				class="variant-glass-primary btn rounded-md text-sm font-medium sm:text-base">Sign Up</a
			>
		{/if}
	</div>
</div>
