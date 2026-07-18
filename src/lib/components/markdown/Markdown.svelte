<script lang="ts">
	import {
		Comark,
		type ComarkPlugin,
		type ComarkProps,
	} from "@comark/svelte";

	import highlight from "@comark/svelte/plugins/highlight";
	import light from "@shikijs/themes/catppuccin-frappe";
	import dark from "@shikijs/themes/catppuccin-mocha";

	import { ProseHeader } from ".";

	type Props = {
		withHeaders?: boolean;
		withHighlight?: boolean;
		additionalComponents?: Record<string, any>;
		additionalPlugins?: ComarkPlugin[];
	} & ComarkProps;

	let {
		withHeaders = false,
		withHighlight = false,
		additionalComponents = {},
		additionalPlugins = [],
		...restProps
	}: Props = $props();

	const highlightPlugin = highlight({
		themes: { dark: dark, light: light },
	});

	let components = $derived.by<Record<string, any>>(() => {
		let c: Record<string, any> = {};
		if (withHeaders) {
			[1, 2, 3, 4, 5, 6].forEach((level) => {
				c[`ProseH${level}`] = (internals: any, props: any) =>
					ProseHeader(internals, { ...props, tag: `h${level}` });
			});
		}
		return {
			...c,
			...additionalComponents,
		};
	});

	let plugins = $derived.by<ComarkPlugin[]>(() => {
		let p: ComarkPlugin[] = [];
		if (withHighlight) {
			p.push(highlightPlugin);
		}
		p.push(...additionalPlugins);
		return p;
	});
</script>

<Comark {components} {plugins} {...restProps} />
