<script lang="ts">
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

	function handleClick(e: MouseEvent) {
		e.preventDefault();

		switch (state) {
			case "add":
				onAdd?.();
				break;
			case "remove":
				onRemove?.();
				break;
		}
	}
</script>

<button
	onclick={handleClick}
	class="flex justify-center items-center cursor-pointer gap-0 text-xs bg-foreground text-background rounded-full px-2.5 py-0.5"
	{...restProps}
>
	<HashIcon size="12" />
	{name}
	{#if state === "remove"}
		<XIcon class="ml-1" size="14" />
	{/if}
</button>
