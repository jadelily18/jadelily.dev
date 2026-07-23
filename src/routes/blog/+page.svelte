<script lang="ts">
	import {
		StickyNoteXIcon,
		ImageOffIcon,
		StarIcon,
		Funnel,
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

	function setTags(values: string[]): void {
		const url = new URL(window.location.href);
		url.searchParams.delete("tags");
		for (const value of values) {
			url.searchParams.append("tags", value);
		}
		replaceState(url, {});
	}

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
			console.log("effect triggered");
			setTags(selectedTags);
		}
	});
</script>

<Meta title={formatPageTitle("Blog")} />

<div class="flex flex-col w-full h-full grow gap-6">
	<h1 class="text-4xl font-bold">Blog</h1>
	{#if data.posts.length > 0}
		<div
			class="flex flex-wrap md:flex-nowrap w-full min-h-50 rounded-2xl border-border border overflow-hidden divide-sidebar-border"
		>
			<a
				class="w-full min-w-80 md:w-80 h-50 transition-[filter] hover:brightness-110"
				href="/blog/{data.posts[0].slug}"
			>
				{#if data.posts[0].coverImg}
					<img
						class="w-full h-full object-cover"
						src={data.posts[0].coverImg}
						alt={data.posts[0].coverAlt || ""}
					/>
				{:else}
					<div
						class="flex justify-center items-center h-full transition-colors text-muted bg-lavender-pink-400 dark:bg-lilac-bush-500"
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
						href="/blog/{data.posts[0].slug}"
						>{data.posts[0].title}</a
					>
					<span class="text-muted-foreground grow">
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
					<div class="flex flex-wrap gap-1">
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
			<div class="flex justify-between items-center">
				<h2 class="font-semibold text-muted-foreground">More posts</h2>
				<div class="flex items-center gap-2">
					<div class="flex gap-1 max-w-full overflow-x-scroll">
						{#each Object.entries(tags).filter(([_, f]) => f) as [tag]}
							<Tag
								name={tag}
								state="remove"
								onRemove={() => (tags[tag] = false)}
							/>
						{/each}
					</div>

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
			{#if data.posts.slice(1).filter(filterPosts).length > 0}
				<div
					class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 gap-4"
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
		<div class="flex w-full h-full grow mb-16 justify-center items-center">
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
