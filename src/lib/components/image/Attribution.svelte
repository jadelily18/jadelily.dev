<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { BrushIcon } from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
		expanded?: boolean;
		class?: string;
		content: Snippet<[className?: string]>;
		triggerStyles?: string;
		contentStyles?: string;
	} & HTMLAttributes<HTMLDivElement>;

	let {
		expanded = $bindable(false),
		class: className,
		content,
		triggerStyles,
		contentStyles = "text-sm whitespace-nowrap",
		...restProps
	}: Props = $props();

	let container: HTMLDivElement;

	function toggle(e: MouseEvent) {
		e.stopPropagation();
		expanded = !expanded;
	}

	function handleClickOutside(e: MouseEvent) {
		if (expanded && container && !container.contains(e.target as Node)) {
			expanded = false;
		}
	}

	$effect(() => {
		if (expanded) {
			document.addEventListener("click", handleClickOutside);
			return () =>
				document.removeEventListener("click", handleClickOutside);
		}
	});
</script>

<div
	bind:this={container}
	onclick={toggle}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === "Enter" && toggle(e as any)}
	class={cn(
		"group/attribution absolute right-0 bottom-0 flex h-8 w-max cursor-pointer flex-row-reverse items-center justify-center overflow-hidden rounded-full bg-background text-muted-foreground shadow-md ring-1 ring-border backdrop-blur",
		className,
	)}
	{...restProps}
>
	<div class={cn("flex size-8 items-center justify-center", triggerStyles)}>
		<BrushIcon size="18" class="" />
	</div>
	<div
		class={cn(
			"grid grid-cols-[0fr] items-center justify-center transition-[grid-template-columns] duration-300 group-hover/attribution:grid-cols-[1fr] group-hover/attribution:pl-2.5",
			expanded && "grid-cols-[1fr] pl-2.5",
		)}
	>
		<div class="overflow-hidden">
			{@render content(contentStyles)}
		</div>
	</div>
</div>
