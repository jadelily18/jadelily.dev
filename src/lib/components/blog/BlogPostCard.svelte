<script lang="ts">
	import { ImageOffIcon } from "@lucide/svelte";

	import * as Tooltip from "@uilib/tooltip";

	import type { Post } from "$types/blog";

	import dayjs from "dayjs";

	type Props = {
		post: Post;
	};

	let { post }: Props = $props();
</script>

<div class="flex flex-col overflow-hidden rounded-xl border border-border">
	<a
		class="relative h-48 w-full transition-[filter] hover:brightness-110 sm:h-60 md:h-36"
		href="/blog/{post.slug}"
	>
		{#if post.coverImg}
			<img
				class="h-full w-full object-cover"
				src={post.coverImg}
				alt={post.coverAlt}
			/>
		{:else}
			<div
				class="flex h-full w-full items-center justify-center bg-lavender-pink-400 text-muted dark:bg-lilac-bush-500"
			>
				<ImageOffIcon />
			</div>
		{/if}
	</a>
	<div class="flex w-full grow flex-col gap-1 p-3">
		<a class="font-semibold hover:underline" href="/blog/{post.slug}">
			{post.title}
		</a>
		<span class="h-full text-sm text-muted-foreground">{post.summary}</span>
		<div class="mt-2 flex flex-wrap items-center justify-between gap-1">
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<span {...props} class="text-xs text-muted-foreground"
							>{dayjs(post.timestamp * 1000).format(
								"MMM D, YYYY",
							)}</span
						>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					>{dayjs(post.timestamp * 1000).format(
						"MMMM D, YYYY, h:mm a",
					)}</Tooltip.Content
				>
			</Tooltip.Root>
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
