<script>
	import MiniCreatePost from '$lib/components/MiniCreatePost.svelte';
	export let data;
</script>

<div>
	<h1 class="h-14 text-3xl font-bold md:text-4xl">r/{data.subreddit.name}</h1>
	<MiniCreatePost />
	<!-- Todo Show Posts -->
</div>
