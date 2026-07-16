<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { PaintbrushIcon } from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import { fade } from "svelte/transition";

	type Props = {
		class?: string;
		content: Snippet;
		triggerStyles?: string;
		contentStyles?: string;
	};

	let {
		class: className,
		content,
		triggerStyles,
		contentStyles,
	}: Props = $props();
</script>

<div
	transition:fade
	class={cn(
		"absolute bottom-0 right-0 h-8 w-max flex flex-row-reverse justify-center items-center text-muted-foreground bg-background border border-border shadow-md rounded-full overflow-hidden",
		className,
	)}
>
	<div
		class={cn(
			"w-8 h-8 shrink-0 flex items-center justify-center",
			triggerStyles,
		)}
	>
		<PaintbrushIcon size="18" class="shrink-0" />
	</div>

	<div
		class={cn(
			"grid justify-center items-center group-hover/attribution:pl-2.5 transition-[grid-template-columns] duration-300 grid-cols-[0fr] group-hover/attribution:grid-cols-[1fr]",
			contentStyles,
		)}
	>
		<div class="overflow-hidden">
			{@render content()}
		</div>
	</div>
</div>
