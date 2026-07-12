<script lang="ts">
	import "./markdown.css";

	import * as Bread from "@uilib/breadcrumb";
	import { Separator } from "@uilib/separator";

	import { Comark } from "@comark/svelte";

	import highlight from "@comark/svelte/plugins/highlight";
	import light from "@shikijs/themes/catppuccin-frappe";
	import dark from "@shikijs/themes/catppuccin-mocha";

	import { ProseHeader } from "@components/blog";
	import dayjs from "dayjs";

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
</script>

<svelte:head>
	<title>{data.post.title} — Blog</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<Bread.Root>
		<Bread.List>
			<Bread.Item>
				<Bread.Link href="/blog">Blog</Bread.Link>
			</Bread.Item>
			<Bread.Separator />
			<Bread.Item>
				<Bread.Page>{data.post.title}</Bread.Page>
			</Bread.Item>
		</Bread.List>
	</Bread.Root>
	<div class="flex flex-col gap-4">
		<h1 class="text-4xl font-bold">{data.post.title}</h1>
		<p class="text-lg text-muted-foreground">{data.post.summary}</p>
		<span class="text-sm text-muted-foreground"
			>{dayjs(new Date(data.post.timestamp * 1000)).format(
				"MMMM D, YYYY",
			)}</span
		>
		<Separator />
	</div>
	{#if data.post.coverImg}
		<img
			class="w-full max-h-120 rounded-lg shadow-md outline outline-border mb-10"
			src={data.post.coverImg}
			alt={data.post.coverAlt || ""}
		/>
	{/if}
	<div class="flex justify-center">
		<Comark
			class="prose dark:prose-invert w-full max-w-full!"
			markdown={data.post.content}
			{components}
			plugins={comarkPlugins}
		/>
	</div>
</div>
