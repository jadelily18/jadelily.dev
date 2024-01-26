<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { Select, Tooltip } from '@lilydev/ui';

	import { title } from '$lib/stores/title';
	import dayjs from 'dayjs';

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

<div class="flex flex-col w-full md:px-12 my-12 gap-6">
	<div class="flex flex-col w-full max-w-[75rem] place-self-center gap-6">
		<div class="flex justify-between w-full">
			<h1 class="text-4xl font-bold">Blog</h1>
			<Select
				items={[
					{ value: 'ascending', label: 'Date (ascending)' },
					{ value: 'descending', label: 'Date (descending)' }
				]}
				placeholder="Sort order..."
				id="blog_order_select"
				bind:value={sortOrder}
				class="w-48 duration-500"
			/>
		</div>

		<div class="flex flex-col place-items-center w-full gap-3">
			{#each posts as post}
				<a
					class="
						flex flex-col w-full p-5 rounded-lg border
						border-zinc-400 dark:border-zinc-600 hover:bg-zinc-800 transition-colors
					"
					href="/blog/p/{post.slug}"
				>
					<div class="flex justify-between">
						<p class="text-xl font-semibold">{post.title}</p>
						<Tooltip
							align="left"
							tooltip={dayjs.unix(post.timestamp).format('MMM DD, YYYY h:ma')}
						>
							<p class="text-right">
								{dayjs.unix(post.timestamp).format('MMM DD, YYYY')}
							</p>
						</Tooltip>
					</div>
					<!-- <div class="divider my-1"></div> -->
					<p class="text-zinc-700 dark:text-zinc-200 duration-500 mb-3 mt-1">
						{post.description}
					</p>
					<div class="flex gap-1">
						{#each post.tags as tag}
							<a
								class="px-2 pt-0.5 pb-1 rounded-full bg-primary hover:bg-primary-hover transition-colors w-min text-xs text-zinc-900"
								href="?categories=[{tag}]"
							>
								#{tag}
							</a>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
