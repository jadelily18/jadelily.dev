<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { Tooltip } from '@lilydev/ui';
	import Select from '$lib/components/base/Select.svelte';

	import { title } from '$lib/stores/title';
	import dayjs from 'dayjs';
	import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-svelte';
	import PostCard from '$lib/components/blog/PostCard.svelte';

	let pageTitle = 'blog';

	title.set(pageTitle);

	export let data;

	let sortOrder: 'ascending' | 'descending' = 'descending';

	$: posts = data.posts.sort((a, b) => {
		switch (sortOrder) {
			case 'ascending':
				return a.timestamp - b.timestamp;
			case 'descending':
				return b.timestamp - a.timestamp;
		}
	});
</script>

<MetaTags
	title={pageTitle}
	description="Jade's blog!"
	openGraph={{
		title: pageTitle,
		description: "Jade's blog!"
	}}
/>

<div class="flex flex-col w-full md:px-12 my-12 place-items-center place-self-center">
	<div class="flex flex-col w-full max-w-[65rem] place-self-center gap-6">
		<div class="flex justify-center gap-2">
			<h1 class="text-4xl font-bold">Blog</h1>
			<Select
				items={[
					{ value: 'ascending', label: 'Date (ascending)' },
					{ value: 'descending', label: 'Date (descending)' }
				]}
				placeholder="Sort order..."
				id="blog_order_select"
				align="right"
				bind:value={sortOrder}
				globalClass=""
			>
				<svelte:fragment slot="icon">
					{#if sortOrder === 'descending'}
						<ArrowDownWideNarrow />
					{:else}
						<ArrowUpWideNarrow />
					{/if}
				</svelte:fragment>
			</Select>
		</div>

		<hr class="w-full" />

		<div class="flex flex-col place-items-center gap-3">
			{#if posts.length > 0}
				{#each posts as post}
					<PostCard {post} />
				{/each}
			{:else}
				<p class="flex text-lg">No blog posts found.</p>
			{/if}
		</div>
	</div>
</div>
