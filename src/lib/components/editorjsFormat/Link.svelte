<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	export let link: string | undefined;
	export let title: string | undefined;
	export let description: string | undefined;
	export let url: string | undefined;
</script>

<a class="my-3 flex gap-3 truncate rounded-md border border-black px-3 py-2" href={link}>
	<div class="flex-shrink-0">
		<img src={url} alt={title} class="h-14 w-14 rounded-md border border-black object-contain" />
	</div>
	<div class="flex flex-col">
		<a class="flex text-lg font-semibold hover:text-violet-500" href={link}
			>{@html title?.split('·')[0]}
			<ExternalLink class="w-4" />
		</a>
		<p class=" pl-2 text-xs font-light">{@html description}</p>
	</div>
</a>
