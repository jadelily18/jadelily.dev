<script lang="ts">
	import {
		Comark,
		type ComarkPlugin,
		type ComarkProps,
	} from "@comark/svelte";

	import highlight from "@comark/svelte/plugins/highlight";
	import footnotes from "@comark/svelte/plugins/footnotes";

	import light from "@shikijs/themes/catppuccin-frappe";
	import dark from "@shikijs/themes/catppuccin-mocha";

	import { alerts, headers } from "./components";

	type Props = {
		withCustomAlerts?: boolean;
		withHeaders?: boolean;
		withHighlight?: boolean;
		withFootnotes?: boolean;
		additionalComponents?: Record<string, any>;
		additionalPlugins?: ComarkPlugin[];
	} & ComarkProps;

	let {
		withCustomAlerts = false,
		withHeaders = false,
		withHighlight = false,
		withFootnotes = false,
		additionalComponents = {},
		additionalPlugins = [],
		...restProps
	}: Props = $props();

	const highlightPlugin = highlight({
		themes: { dark: dark, light: light },
	});

	const footnotesPlugin = footnotes({});

	let components = $derived.by<Record<string, any>>(() => {
		let c: Record<string, any> = {};
		if (withHeaders) {
			c = { ...c, ...headers };
		}
		if (withCustomAlerts) {
			c = { ...c, ...alerts };
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
		if (withFootnotes) {
			p.push(footnotesPlugin);
		}
		p.push(...additionalPlugins);
		return p;
	});
</script>

<Comark {components} {plugins} {...restProps} />
