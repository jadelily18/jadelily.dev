<script lang="ts">
	import {
		CameraOffIcon,
		FileIcon,
		HashIcon,
		StarIcon,
	} from "@lucide/svelte";

	import * as Empty from "@uilib/empty";
	import { Separator } from "@uilib/separator";
	import { cn } from "$lib/shadcn/utils";

	import { Tag } from "@components/blog";
	import type { Post } from "$types/blog";

	import dayjs from "dayjs";

	let { data } = $props();

	const cardImgFallbackStyles =
		"transition-colors text-muted-foreground bg-pink-950/15 hover:bg-pink-950/5 dark:bg-pink-500/10 dark:hover:bg-pink-500/15";
</script>

{#snippet cardImgOverlay(post: Post)}
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

{#snippet cardImg(post: Post)}
	{#if post.coverImg}
		<div class="relative h-36 w-full">
			<img
				class="absolute w-full h-full object-cover"
				src={post.coverImg}
				alt={post.coverAlt || ""}
			/>
			{@render cardImgOverlay(post)}
		</div>
	{:else}
		<div class={cn("relative h-36 w-full", cardImgFallbackStyles)}>
			<CameraOffIcon class="absolute left-1/2 top-1/2 -translate-1/2" />
			{@render cardImgOverlay(post)}
		</div>
	{/if}
{/snippet}

<div class="flex flex-col w-full h-full grow gap-6">
	{#if data.posts.length > 0}
		<h1 class="text-4xl font-bold">Blog</h1>
		<div
			class="flex flex-wrap md:flex-nowrap w-full *:h-50 rounded-2xl border-border border overflow-hidden divide-sidebar-border"
		>
			<a
				class="w-full min-w-80 md:w-80 transition-[filter] hover:brightness-110"
				href="/blog/{data.posts[0].slug}"
			>
				{#if data.posts[0].coverImg}
					<div class="relative h-48 w-full">
						<img
							class="absolute w-full h-full object-cover"
							src={data.posts[0].coverImg}
							alt={data.posts[0].coverAlt || ""}
						/>
					</div>
				{:else}
					<div
						class={cn(
							"flex justify-center items-center h-full w-full",
							cardImgFallbackStyles,
						)}
					>
						<CameraOffIcon />
					</div>
				{/if}
			</a>
			<div class="flex flex-col w-full gap-1 p-4">
				<span
					class="inline-flex items-center font-semibold text-muted-foreground gap-1 text-sm"
				>
					<StarIcon size="14" />
					Featured
				</span>
				<a
					class="text-2xl font-bold hover:underline"
					href="/blog/{data.posts[0].slug}">{data.posts[0].title}</a
				>
				<span class="text-muted-foreground grow">
					{data.posts[0].summary}
				</span>
				<div class="flex items-center justify-between">
					<span class="text-muted-foreground text-sm"
						>{dayjs(
							new Date(data.posts[0].timestamp * 1000),
						).format("MMM D, YYYY")}</span
					>
					<div class="flex gap-1">
						{#each data.posts[0].tags as tag}
							<Tag name={tag} />
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if data.posts.length > 1}
			<Separator />
			<h2 class="font-semibold text-muted-foreground">More posts</h2>
			<div
				class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 gap-4"
			>
				{#each data.posts as post}
					{#if post !== data.posts[0]}
						<div
							class="rounded-xl border border-border overflow-hidden"
						>
							<a
								class="w-full transition-[filter] hover:brightness-110"
								href="/blog/{post.slug}"
							>
								{@render cardImg(post)}
							</a>
							<div class="flex flex-col p-3 gap-1">
								<a
									class="hover:underline font-semibold"
									href="/blog/{post.slug}"
								>
									{post.title}
								</a>
								<span class="text-muted-foreground text-sm"
									>{post.summary}</span
								>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<span class="self-center text-sm text-muted-foreground"
				>{"No more posts :("}</span
			>
		{/if}
	{:else}
		<div class="flex w-full h-full grow mb-16 justify-center items-center">
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon">
						<FileIcon />
					</Empty.Media>
					<Empty.Title>No blog posts!</Empty.Title>
				</Empty.Header>
				<Empty.Description>
					{"I haven't made a blog post yet :("}
				</Empty.Description>
			</Empty.Root>
		</div>
	{/if}
</div>
