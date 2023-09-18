<script lang="ts">
	export let authorName: string | null;
	export let subredditName: string;
	export let time: number;
	import { dateFormat } from '$lib/utils';
</script>

<div class="flex items-start gap-2 font-light">
	<a
		class="text-xs underline-offset-1 hover:text-gray-950 hover:underline"
		href={`${subredditName}`}
	>
		r/{subredditName}
	</a>
	<a
		href={`/user/${authorName}`}
		class="text-xs underline-offset-1 hover:text-gray-950 hover:underline">{authorName}</a
	>
	<p class="text-xs">{dateFormat(time, 'short')}</p>
</div>
