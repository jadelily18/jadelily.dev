<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { HashIcon, XIcon } from "@lucide/svelte";
	import { Badge, type BadgeVariant } from "@uilib/badge";

	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = {
		name: string;
		state?: "add" | "remove";
		onAdd?: () => void;
		onRemove?: () => void;
	} & HTMLButtonAttributes;

	let {
		name,
		state = $bindable("add"),
		onAdd,
		onRemove,
		...restProps
	}: Props = $props();

	const buttonStyles =
		"transition-colors duration-100 bg-foreground not-disabled:hover:bg-foreground/85";
</script>

<div
	class="inline-flex justify-center items-center overflow-hidden gap-0 text-xs text-background rounded-full"
>
	<button
		onclick={() => onAdd?.()}
		disabled={state === "remove" ? true : false}
		aria-label="Add tag to filter"
		class={cn(
			"flex gap-0 h-full pl-2.5 py-0.5 cursor-pointer disabled:cursor-default",
			buttonStyles,
			state === "add" ? "pr-2.5" : "pr-1",
		)}
		{...restProps}
	>
		<HashIcon size="12" />
		{name}
	</button>
	{#if state === "remove"}
		<button
			onclick={() => onRemove?.()}
			aria-label="Remove tag from filter"
			class={cn(
				"h-full pl-0.5 pr-2.5 py-0.5 cursor-pointer",
				buttonStyles,
			)}
		>
			<XIcon class="ml-1" size="14" />
		</button>
	{/if}
</div>
