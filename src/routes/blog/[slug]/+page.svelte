<script lang="ts">
	import * as Bread from "@uilib/breadcrumb";
	import { Separator } from "@uilib/separator";

	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";
	import { AspectRatio } from "@uilib/aspect-ratio";

	import { Markdown } from "@components/markdown";

	let { data } = $props();
</script>

<svelte:head>
	<title>{formatPageTitle("Blog", data.post.title)}</title>
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
					{data.post.title}
				</Bread.Page>
			</Bread.Item>
		</Bread.List>
	</Bread.Root>

	<!--  -->
	<div class="flex flex-col gap-4">
		<h1 class="text-4xl font-bold">{data.post.title}</h1>
		<p class="text-lg text-muted-foreground">{data.post.summary}</p>
		<span class="text-sm text-muted-foreground">
			{dayjs(new Date(data.post.timestamp * 1000)).format("MMMM D, YYYY")}
		</span>
		<Separator />
	</div>
	{#if data.post.coverImg}
		<AspectRatio
			ratio={16 / 9}
			class="rounded-lg shadow-md outline outline-border overflow-hidden md:mx-4"
		>
			<img
				class="w-full h-full object-cover"
				src={data.post.coverImg}
				alt={data.post.coverAlt || ""}
			/>
		</AspectRatio>
	{/if}
	<div class="flex justify-center">
		<Markdown
			class="prose dark:prose-invert w-full max-w-full!"
			markdown={data.post.content}
			withHeaders
			withHighlight
		/>
	</div>
</div>
