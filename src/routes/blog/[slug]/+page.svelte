<script lang="ts">
	import * as Bread from "@uilib/breadcrumb";
	import { Separator } from "@uilib/separator";

	import { Comark } from "@comark/svelte";

	import highlight from "@comark/svelte/plugins/highlight";
	import light from "@shikijs/themes/catppuccin-frappe";
	import dark from "@shikijs/themes/catppuccin-mocha";

	import { ProseHeader } from "@components/blog";
	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";
	import { Skeleton } from "@uilib/skeleton";
	import type { Post } from "$types/blog";

	const comarkPlugins = [
		highlight({
			themes: { dark: dark, light: light },
		}),
	];

	const components: Record<string, any> = {};

	[1, 2, 3, 4, 5, 6].forEach((level) => {
		components[`ProseH${level}`] = (internals: any, props: any) =>
			ProseHeader(internals, { ...props, tag: `h${level}` });
	});

	let { data } = $props();

	let pageTitle = $state<string | undefined>(undefined);

	let pagePost = $state<Post | undefined>(undefined);

	$effect(() => {
		data.post.then((post) => {
			if (post) pageTitle = post.title;
			if (post) pagePost = post;
		});
	});
</script>

<svelte:head>
	<title>{formatPageTitle("Blog", pageTitle)}</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<Bread.Root>
		<Bread.List>
			<Bread.Item>
				<Bread.Link href="/blog">Blog</Bread.Link>
			</Bread.Item>
			<Bread.Separator />
			<Bread.Item>
				<Bread.Page>
					{#if pagePost}
						{pageTitle}
					{:else}
						<Skeleton class="h-4 w-24" />
					{/if}
				</Bread.Page>
			</Bread.Item>
		</Bread.List>
	</Bread.Root>
	{#await data.post}
		<!--  -->
	{:then post}
		{#if post}
			<div class="flex flex-col gap-4">
				<h1 class="text-4xl font-bold">{post.title}</h1>
				<p class="text-lg text-muted-foreground">{post.summary}</p>
				<span class="text-sm text-muted-foreground"
					>{dayjs(new Date(post.timestamp * 1000)).format(
						"MMMM D, YYYY",
					)}</span
				>
				<Separator />
			</div>
			{#if post.coverImg}
				<img
					class="w-full max-h-120 rounded-lg shadow-md outline outline-border mb-10 object-cover"
					src={post.coverImg}
					alt={post.coverAlt || ""}
				/>
			{/if}
			<div class="flex justify-center">
				<Comark
					class="prose dark:prose-invert w-full max-w-full!"
					markdown={post.content}
					{components}
					plugins={comarkPlugins}
				/>
			</div>
		{/if}
	{/await}
</div>
