<script lang="ts">
	import {
		StickyNoteXIcon,
		ImageOffIcon,
		StarIcon,
		Funnel,
		XIcon,
		RssIcon,
	} from "@lucide/svelte";

	import dayjs from "dayjs";
	import { afterNavigate, replaceState } from "$app/navigation";

	import { Button } from "@uilib/button";
	import * as Empty from "@uilib/empty";
	import { Separator } from "@uilib/separator";
	import * as Tooltip from "@uilib/tooltip";

	import { BlogPostCard, FilterDropdown, Tag } from "@components/blog";

	import { Meta } from "@components/app";
	import { formatPageTitle } from "$lib/utils";
	import type { Post } from "$types/blog";
	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { ScrollArea } from "@uilib/scroll-area";
	import { page } from "$app/state";

	let isMobile = new IsMobile();

	let { data } = $props();

	let finishedNavigation = $state(false);
	afterNavigate(() => {
		finishedNavigation = true;
	});

	// svelte-ignore state_referenced_locally
	let tags = $state(data.tags);
	let selectedTags = $derived<string[]>(
		Object.keys(tags).filter((t) => tags[t] === true),
	);

	function filterPosts(p: Post) {
		if (!p.tags) return false;

		let includePost = true;
		for (let tag of selectedTags) {
			if (!p.tags.includes(tag)) includePost = false;
		}

		return includePost;
	}

	$effect(() => {
		if (finishedNavigation) {
			const params = new URLSearchParams(page.url.searchParams);

			params.delete("tags");
			for (const [tag, active] of Object.entries(tags)) {
				if (active) params.append("tags", tag);
			}

			const query = params.toString();

			replaceState(
				query ? `?${params.toString()}` : page.url.pathname,
				page.state,
			);
		}
	});
</script>

<Meta
	title={formatPageTitle("Blog")}
	description="Jade's blog where she says silly things."
/>

{#snippet tagBar()}
	<ScrollArea
		class="w-full overflow-hidden"
		viewportStyles="fade-x fade-size-x-sm pb-3 sm:py-3 *:flex sm:*:justify-end"
		orientation="horizontal"
	>
		<div class="flex w-max justify-end gap-1.5 p-1">
			{#each Object.entries(tags).filter(([_, f]) => f) as [tag]}
				<Tag
					name={tag}
					state="remove"
					onRemove={() => (tags[tag] = false)}
				/>
			{/each}
		</div>
	</ScrollArea>
{/snippet}

<div class="flex h-full w-full grow flex-col gap-6">
	<div class="flex items-center justify-between">
		<h1 class="text-4xl font-bold">Blog</h1>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button
						href="/blog/rss.xml"
						class="cursor-pointer"
						variant="outline"
						size="icon"
						data-sveltekit-reload
						// ⬆️ 404s otherwise
						{...props}
					>
						<RssIcon />
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>RSS feed</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if data.posts.length > 0}
		<div
			class="flex min-h-50 w-full flex-wrap divide-sidebar-border overflow-hidden rounded-2xl border border-border md:flex-nowrap"
		>
			<a
				class="h-50 w-full min-w-80 transition-[filter] hover:brightness-110 md:w-80"
				href="/blog/{data.posts[0].slug}"
			>
				{#if data.posts[0].coverImg}
					<img
						class="h-full w-full object-cover"
						src={data.posts[0].coverImg}
						alt={data.posts[0].coverAlt || ""}
					/>
				{:else}
					<div
						class="flex h-full items-center justify-center bg-lavender-pink-400 text-muted transition-colors dark:bg-lilac-bush-500"
					>
						<ImageOffIcon />
					</div>
				{/if}
			</a>
			<div class="flex w-full flex-col justify-between gap-4 p-4">
				<div class="flex w-full flex-col gap-1">
					<span
						class="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
					>
						<StarIcon size="14" />
						Featured
					</span>
					<a
						class="text-2xl font-bold hover:underline"
						href="/blog/{data.posts[0].slug}"
						>{data.posts[0].title}</a
					>
					<span class="grow text-muted-foreground">
						{data.posts[0].summary}
					</span>
				</div>
				<div class="flex flex-wrap items-center justify-between gap-2">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<span
									{...props}
									class="text-xs text-muted-foreground"
									>{dayjs(
										data.posts[0].timestamp * 1000,
									).format("MMM D, YYYY")}</span
								>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content
							>{dayjs(data.posts[0].timestamp * 1000).format(
								"MMMM D, YYYY, h:mm a",
							)}</Tooltip.Content
						>
					</Tooltip.Root>
					<div class="flex flex-wrap gap-1.5">
						{#each data.posts[0].tags as tag}
							<Tag
								name={tag}
								state="add"
								onAdd={() => (tags[tag] = true)}
							/>
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if data.posts.length > 1}
			<Separator />
			<div class="flex flex-col gap-1">
				<div class="flex h-16 max-w-full items-center gap-4">
					<h2 class="font-semibold text-nowrap text-muted-foreground">
						More posts
					</h2>
					<div
						class="flex grow items-center justify-end gap-2 overflow-hidden"
					>
						{#if !isMobile.current}
							{@render tagBar()}
						{/if}

						<Tooltip.Root>
							<Tooltip.Trigger>
								<FilterDropdown bind:tags>
									{#snippet trigger({ props })}
										<Button
											{...props}
											class="cursor-pointer"
											variant="outline"
											size="icon"
										>
											<Funnel />
										</Button>
									{/snippet}
								</FilterDropdown>
							</Tooltip.Trigger>
							<Tooltip.Content>Filter posts</Tooltip.Content>
						</Tooltip.Root>
					</div>
				</div>
				{#if isMobile.current && selectedTags.length > 0}
					{@render tagBar()}
				{/if}
			</div>
			{#if data.posts.slice(1).filter(filterPosts).length > 0}
				<div
					class="grid-cols-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3"
				>
					{#each data.posts.filter(filterPosts) as post}
						{#if post !== data.posts[0]}
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
		<div class="mb-16 flex h-full w-full grow items-center justify-center">
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
</div>
