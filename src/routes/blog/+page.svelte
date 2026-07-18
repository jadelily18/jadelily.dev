<script lang="ts">
	import { StickyNoteXIcon, ImageOffIcon, StarIcon } from "@lucide/svelte";

	import * as Empty from "@uilib/empty";
	import { Separator } from "@uilib/separator";
	import { cn } from "$lib/shadcn/utils";

	import { BlogPostCard, Tag } from "@components/blog";

	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";
	import { Skeleton } from "@uilib/skeleton";
	import { GenericIcon, Icon } from "@components/icon";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import type { Post } from "$types/blog";

	let { data } = $props();

	const cardImgFallbackStyles =
		"transition-colors text-muted-foreground bg-pink-950/15 hover:bg-pink-950/5 dark:bg-pink-500/10 dark:hover:bg-pink-500/15";

	let filteredTags = $derived(page.url.searchParams.getAll("tags"));

	function setArrayParam(key: string, values: string[]): void {
		const url = new URL(page.url);
		url.searchParams.delete(key);
		for (const value of values) {
			url.searchParams.append(key, value);
		}
		goto(`?${url.searchParams.toString()}`, {
			replaceState: true,
			keepFocus: true,
			noScroll: true,
		});
	}

	function addTag(tag: string): void {
		if (filteredTags.find((t) => t === tag)) return;
		setArrayParam("tags", [...filteredTags, tag]);
	}

	function removeTag(tag: string): void {
		setArrayParam(
			"tags",
			filteredTags.filter((t) => t !== tag),
		);
	}

	function filterPosts(p: Post) {
		const tags = p.tags ?? [];

		let includePost = true;
		for (let tag of filteredTags) {
			if (!tags.includes(tag)) includePost = false;
		}

		return includePost;
	}
</script>

<svelte:head>
	<title>{formatPageTitle("Blog")}</title>
</svelte:head>

<div class="flex flex-col w-full h-full grow gap-6">
	<h1 class="text-4xl font-bold">Blog</h1>

	{#await data.posts}
		<div
			class="flex flex-wrap md:flex-nowrap w-full min-h-50 rounded-2xl md:gap-4 border-border border overflow-hidden divide-sidebar-border"
		>
			<div class="relative min-w-full md:min-w-80 h-50 p-2 md:pr-0">
				<Icon
					class="absolute left-1/2 top-1/2 -translate-1/2 animate-pulse"
					icon={GenericIcon.PawPrint}
				/>
				<div class="h-full w-full bg-accent rounded-xl"></div>
			</div>
			<div
				class="flex flex-col justify-between w-full min-h-50 gap-6 p-4 md:pl-0"
			>
				<div class="flex flex-col gap-2.5">
					<div class="flex flex-col w-full gap-2">
						<Skeleton class="h-4 w-30" />
						<Skeleton class="h-7 w-64" />
					</div>
					<div class="flex flex-col w-full gap-2">
						<Skeleton class="h-4.5 w-[90%]" />
						<Skeleton class="h-4.5 w-[69%]" />
					</div>
				</div>
				<div class="flex flex-wrap gap-2 items-center justify-between">
					<Skeleton class="h-4 w-32" />
					<div class="flex gap-1">
						<Skeleton class="h-5 w-18" />
						<Skeleton class="h-5 w-24" />
						<Skeleton class="h-5 w-16" />
					</div>
				</div>
			</div>
		</div>
	{:then posts}
		{#if posts.length > 0}
			<div
				class="flex flex-wrap md:flex-nowrap w-full min-h-50 rounded-2xl border-border border overflow-hidden divide-sidebar-border"
			>
				<a
					class="w-full min-w-80 md:w-80 max-h-50 transition-[filter] hover:brightness-110"
					href="/blog/{posts[0].slug}"
				>
					{#if posts[0].coverImg}
						<img
							class="w-full h-full object-cover"
							src={posts[0].coverImg}
							alt={posts[0].coverAlt || ""}
						/>
					{:else}
						<div
							class={cn(
								"flex justify-center items-center h-full w-full",
								cardImgFallbackStyles,
							)}
						>
							<ImageOffIcon />
						</div>
					{/if}
				</a>
				<div class="flex flex-col justify-between w-full gap-4 p-4">
					<div class="flex flex-col w-full gap-1">
						<span
							class="inline-flex items-center font-semibold text-muted-foreground gap-1 text-sm"
						>
							<StarIcon size="14" />
							Featured
						</span>
						<a
							class="text-2xl font-bold hover:underline"
							href="/blog/{posts[0].slug}">{posts[0].title}</a
						>
						<span class="text-muted-foreground grow">
							{posts[0].summary}
						</span>
					</div>
					<div
						class="flex flex-wrap items-center justify-between gap-2"
					>
						<span class="text-muted-foreground text-sm"
							>{dayjs(new Date(posts[0].timestamp * 1000)).format(
								"MMM D, YYYY",
							)}</span
						>
						<div class="flex flex-wrap gap-1">
							{#each posts[0].tags as tag}
								<Tag
									name={tag}
									state="add"
									onAdd={() => addTag(tag)}
								/>
							{/each}
						</div>
					</div>
				</div>
			</div>
			{#if posts.length > 1}
				<Separator />
				<div class="flex justify-between items-center">
					<h2 class="font-semibold text-muted-foreground">
						More posts
					</h2>
					<div class="flex gap-1">
						{#each filteredTags as tag}
							<Tag
								name={tag}
								state="remove"
								onRemove={() => removeTag(tag)}
							/>
						{/each}
					</div>
				</div>
				{#if posts.slice(1).filter(filterPosts).length > 0}
					<div
						class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						{#each posts.filter(filterPosts) as post}
							{#if post !== posts[0]}
								<BlogPostCard {post} />
							{/if}
						{/each}
					</div>
				{:else}
					<div class="flex justify-center">
						<span class="text-sm text-muted-foreground"
							>{"No posts matching filter :("}</span
						>
					</div>
				{/if}
			{:else}
				<span class="self-center text-sm text-muted-foreground"
					>{"No more posts :("}</span
				>
			{/if}
		{:else}
			<div
				class="flex w-full h-full grow mb-16 justify-center items-center"
			>
				<Empty.Root>
					<Empty.Header>
						<Empty.Media variant="icon">
							<StickyNoteXIcon />
						</Empty.Media>
						<Empty.Title>No blog posts!</Empty.Title>
					</Empty.Header>
					<Empty.Description>
						{"I haven't made a blog post yet :("}
					</Empty.Description>
				</Empty.Root>
			</div>
		{/if}
	{/await}
</div>
