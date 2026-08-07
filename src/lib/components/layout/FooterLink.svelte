<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type Props = {
		children?: Snippet;
	} & HTMLAnchorAttributes;

	let {
		children,
		class: className,
		target = "_blank",
		...restProps
	}: Props = $props();
</script>

<a
	class={cn(
		"font-semibold transition-colors duration-100 hover:text-lavender-pink-400 hover:underline dark:hover:text-lilac-bush-500",
		className,
	)}
	{target}
	{...restProps}>{@render children?.()}</a
>
