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
		"relative flex flex-col gap-2 w-full h-full rounded-lg overflow-hidden border border-border group/attribution",
		buttonStyles,
	)}
	{onclick}
>
	<img
		class="w-full h-full cursor-pointer object-cover"
		style="object-position: {item.offset?.x ?? 50}% {item.offset?.y ?? 50}%"
		src={item.src}
		alt={item.alt}
	/>
</button>
