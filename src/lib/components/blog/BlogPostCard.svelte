<script lang="ts">
	import { ImageOffIcon } from "@lucide/svelte";

	import type { Post } from "$types/blog";

	import dayjs from "dayjs";

	type Props = {
		post: Post;
	};

	let { post }: Props = $props();
</script>

<div class="flex flex-col rounded-xl border border-border overflow-hidden">
	<a
		class="relative w-full h-48 sm:h-60 md:h-36 transition-[filter] hover:brightness-110"
		href="/blog/{post.slug}"
	>
		{#if post.coverImg}
			<img
				class="w-full h-full object-cover"
				src={post.coverImg}
				alt={post.coverAlt}
			/>
		{:else}
			<div
				class="flex justify-center items-center w-full h-full bg-lavender-pink-400 dark:bg-lilac-bush-500 text-muted"
			>
				<ImageOffIcon />
			</div>
		{/if}
	</a>
	<div class="flex flex-col w-full p-3 gap-1 grow">
		<a class="font-semibold hover:underline" href="/blog/{post.slug}">
			{post.title}
		</a>
		<span class="text-muted-foreground text-sm h-full">{post.summary}</span>
		<div class="flex flex-wrap justify-between items-center gap-1 mt-2">
			<span class="text-xs text-muted-foreground"
				>{dayjs(post.timestamp * 1000).format("MMM D, YYYY")}</span
			>
			<!-- {#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-1">
					{#each post.tags as tag}
						<Tag name={tag} />
					{/each}
				</div>
			{/if} -->
		</div>
	</div>
</div>
