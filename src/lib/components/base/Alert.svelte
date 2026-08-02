<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import type { AlertType } from "$types/alert";
	import {
		CircleAlertIcon,
		InfoIcon,
		LightbulbIcon,
		OctagonAlertIcon,
		TriangleAlertIcon,
	} from "@lucide/svelte";
	import type { Component, Snippet } from "svelte";

	type Alert = {
		type: AlertType;
		styles: string;
		icon: Component;
	};

	const alerts: Alert[] = [
		{
			type: "note",
			styles: "outline-lavender-pink-600 bg-lavender-pink-200 text-lavender-pink-900 dark:outline-lilac-bush-500 dark:bg-lilac-bush-500/35 dark:text-lilac-bush-400",
			icon: InfoIcon,
		},
		{
			type: "tip",
			styles: "outline-green-800 bg-green-200 text-green-900 dark:outline-green-300/50 dark:bg-green-600/30 dark:text-green-300",
			icon: LightbulbIcon,
		},
		{
			type: "important",
			styles: "outline-ice-cold-600 bg-ice-cold-200 text-ice-cold-700 dark:outline-ice-cold-600 dark:bg-ice-cold-500/45 dark:text-ice-cold-300",
			icon: CircleAlertIcon,
		},
		{
			type: "warning",
			styles: "outline-sandwisp-600 bg-sandwisp-200 text-sandwisp-700 dark:outline-sandwisp-600 dark:bg-sandwisp-500/45 dark:text-sandwisp-300",
			icon: TriangleAlertIcon,
		},
		{
			type: "caution",
			styles: "outline-red-800 bg-red-200 text-red-900 dark:outline-red-800 dark:bg-red-800/45 dark:text-red-400/85",
			icon: OctagonAlertIcon,
		},
	];

	type Props = {
		noIcon?: boolean;
		type: AlertType;
		children?: Snippet;
	};

	let { noIcon = false, type, children }: Props = $props();
</script>

{#each alerts as alert}
	{#if alert.type === type}
		<blockquote
			class={cn(
				"flex items-start gap-3 p-4 w-full rounded-lg border-l-0 outline not-italic font-normal",
				alert.styles,
			)}
		>
			{#if !noIcon}
				<alert.icon class="size-10 sm:size-6 -mt-1 sm:mt-1" />
			{/if}
			<div class="inline">
				{@render children?.()}
			</div>
		</blockquote>
	{/if}
{/each}
