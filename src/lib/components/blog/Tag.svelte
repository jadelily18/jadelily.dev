<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { HashIcon, XIcon } from "@lucide/svelte";

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

	function handleClick() {
		switch (state) {
			case "add":
				onAdd?.();
				break;
			case "remove":
				onRemove?.();
				break;
		}
	}

	const lightButtonStyles =
		"outline-lavender-pink-600 bg-lavender-pink-200 hover:bg-lavender-pink-300/75 text-lavender-pink-900";
	const darkButtonStyles =
		"dark:outline-lilac-bush-500 dark:bg-lilac-bush-500/35 dark:hover:bg-lilac-bush-500/45 dark:text-lilac-bush-400";
</script>

<button
	onclick={handleClick}
	aria-label={state === "add"
		? "Add tag to filter"
		: "Remove tag from filter"}
	class={cn(
		"inline-flex items-center gap-0 px-2.5 py-0.5 h-5 text-xs cursor-pointer disabled:cursor-default text-nowrap rounded-full transition-colors duration-100 outline",
		lightButtonStyles,
		darkButtonStyles,
		state === "add" ? "pr-2.5" : "pr-1.5",
	)}
	{...restProps}
>
	<HashIcon size="12" />
	{name}
	{#if state === "remove"}
		<XIcon class="ml-1" size="14" />
	{/if}
</button>
