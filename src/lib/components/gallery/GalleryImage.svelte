<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import type { GalleryItem } from "$types/art";
	import type { ButtonProps } from "@uilib/button";

	type Props = {
		item: GalleryItem;
	} & ButtonProps;

	let { item, onclick }: Props = $props();

	const buttonStyles =
		"transition-[scale,box-shadow] duration-200 scale-100 hover:scale-105 hover:shadow-lg active:scale-100";
</script>

<button
	class={cn(
		"group/attribution relative flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg border border-border",
		buttonStyles,
	)}
	{onclick}
>
	<img
		class="h-full w-full cursor-pointer object-cover"
		style="object-position: {item.offset?.x ?? 50}% {item.offset?.y ?? 50}%"
		src={item.src}
		alt={item.alt}
	/>
</button>
