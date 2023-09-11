<script lang="ts">
	// @ts-nocheck
	import MiniCreatePost from '$lib/components/MiniCreatePost.svelte';
	import SubscribeLeave from '$lib/components/SubscribeLeave.svelte';
	import { dateFormat } from '$lib/utils';
	export let data;
</script>

<div class="mx-auto h-full max-w-7xl pt-12">
	<div>
		<!-- TODO: Button to take us back -->
		<div class="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4">
			<div class="col-span-2 flex flex-col space-y-6">
				<div>
					<h1 class="h-14 text-3xl font-bold md:text-4xl">r/{data.subreddit.name}</h1>
					<MiniCreatePost />
					<!-- Todo Show Posts -->
				</div>
			</div>
			<div
				class="order-first hidden h-fit overflow-hidden rounded-lg border-gray-200 md:order-last md:block"
			>
				<div class="px-6 py-4">
					<p class="py-3 font-semibold">About r/{data.subreddit.name}</p>
				</div>
				<dl class="lead divide-y divide-gray-100 bg-white px-6 py-4 text-sm leading-6">
					<div class="flex justify-between gap-x-4 py-3">
						<dt class="text-gray-500">Created</dt>
						<dd class="text-gray-700">
							<time datetime={data.subreddit.createdAt.toDateString()}
								>{dateFormat(data.subreddit.createdAt)}</time
							>
						</dd>
					</div>
					<div class="flex justify-between gap-x-4 py-3">
						<dt class="text-gray-500">Members</dt>
						<dd class="text-gray-700">
							<div class="text-gray-900">{data.memberCount}</div>
						</dd>
					</div>
					{#if data.subreddit.creatorId === data.session?.user?.id}
						<div class="flex justify-between gap-x-4 py-3">
							<p class="text-gray">You Created this Subreddit</p>
						</div>
					{/if}
					{#if data.subreddit.creatorId !== data.session?.user?.id}
						<SubscribeLeave isSubscribed={data.isSubscribed} subredditId={data.subreddit.id} />
					{/if}
				</dl>
			</div>
		</div>
	</div>
</div>
