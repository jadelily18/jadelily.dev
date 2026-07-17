<script lang="ts">
	import { HashIcon, ImageOffIcon } from "@lucide/svelte";

	import type { Post } from "$types/blog";

	import dayjs from "dayjs";
	import { cn } from "$lib/shadcn/utils";

	const cardImgFallbackStyles =
		"transition-colors text-muted-foreground bg-pink-950/15 hover:bg-pink-950/5 dark:bg-pink-500/10 dark:hover:bg-pink-500/15";

	type Props = {
		post: Post;
	};

	let { post }: Props = $props();
</script>

{#snippet cardImgOverlay()}
	<span
		class="inline-flex gap-0.5 items-center left-0 bottom-0 absolute text-xs text-muted-foreground p-1 pr-2 bg-background rounded-tr-sm"
	>
		<HashIcon size="12" />
		tags
	</span>
	<span
		class="right-0 bottom-0 absolute text-xs text-muted-foreground font-semibold p-1 pl-2 bg-background rounded-tl-sm"
	>
		{dayjs(new Date(post.timestamp * 1000)).format("MMM D, YYYY")}
	</span>
{/snippet}

{#snippet cardImg()}
	{#if post.coverImg}
		<div class="relative h-36 w-full">
			<img
				class="absolute w-full h-full object-cover"
				src={post.coverImg}
				alt={post.coverAlt || ""}
			/>
			{@render cardImgOverlay()}
		</div>
	{:else}
		<div class={cn("relative h-36 w-full", cardImgFallbackStyles)}>
			<ImageOffIcon class="absolute left-1/2 top-1/2 -translate-1/2" />
			{@render cardImgOverlay()}
		</div>
	{/if}
{/snippet}

<div class="rounded-xl border border-border overflow-hidden">
	<a
		class="w-full transition-[filter] hover:brightness-110"
		href="/blog/{post.slug}"
	>
		{@render cardImg()}
	</a>
	<div class="flex flex-col p-3 gap-1">
		<a class="hover:underline font-semibold" href="/blog/{post.slug}">
			{post.title}
		</a>
		<span class="text-muted-foreground text-sm">{post.summary}</span>
	</div>
</div>
