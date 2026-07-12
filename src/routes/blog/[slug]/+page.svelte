<script lang="ts">
	import "./markdown.css";

	import { Separator } from "@uilib/separator";

	import { Comark } from "@comark/svelte";

	import highlight from "@comark/svelte/plugins/highlight";
	import light from "@shikijs/themes/catppuccin-frappe";
	import dark from "@shikijs/themes/catppuccin-mocha";

	import { ProseHeader } from "@components/blog";

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

<div class="flex flex-col px-30 gap-4">
	<h1 class="text-3xl font-bold">{data.post.title}</h1>
	<p class="text-lg text-muted-foreground">{data.post.summary}</p>
	<Separator />
	<div class="flex justify-center">
		<Comark
			class="prose dark:prose-invert w-full max-w-full!"
			markdown={data.post.content}
			{components}
			plugins={comarkPlugins}
		/>
	</div>
</div>
