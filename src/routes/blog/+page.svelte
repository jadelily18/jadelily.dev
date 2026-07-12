<script lang="ts">
	import { Tag } from "@components/blog";
	import { HashIcon, StarIcon } from "@lucide/svelte";
	import { Separator } from "@uilib/separator";
	import dayjs from "dayjs";

	let { data } = $props();
</script>

<div class="flex flex-col w-full h-full gap-6 xl:px-36">
	<h1 class="text-4xl font-bold">Blog</h1>
	<div
		class="flex flex-wrap md:flex-nowrap w-full *:h-50 rounded-2xl border-border border overflow-hidden"
	>
		<div class="w-full min-w-80 md:w-80 bg-pink-950"></div>
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
					>{dayjs(new Date(data.posts[0].timestamp * 1000)).format(
						"MMM D, YYYY",
					)}</span
				>
				<div class="flex gap-1">
					{#each data.posts[0].tags as tag}
						<Tag name={tag} />
					{/each}
				</div>
			</div>
		</div>
	</div>
	<Separator />
	<h2 class="font-semibold text-muted-foreground">Other posts...</h2>
	<div class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.posts as post}
			{#if post !== data.posts[0]}
				<div class="rounded-xl border border-border overflow-hidden">
					<div class="relative h-36 w-full bg-pink-900/80">
						<span
							class="inline-flex gap-0.5 items-center left-0 bottom-0 absolute text-xs text-muted-foreground p-1 pr-2 bg-background rounded-tr-sm"
						>
							<HashIcon size="12" />
							tags
						</span>
						<span
							class="right-0 bottom-0 absolute text-xs text-muted-foreground font-semibold p-1 pl-2 bg-background rounded-tl-sm"
						>
							{dayjs(new Date(post.timestamp * 1000)).format(
								"MMM D, YYYY",
							)}
						</span>
					</div>
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
</div>
