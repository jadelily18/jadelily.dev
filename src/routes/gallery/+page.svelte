<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { formatPageTitle } from "$lib/utils";
	import { Meta } from "@components/app";
	import { GalleryImage, GalleryModal } from "@components/gallery";
	import { TriangleAlertIcon } from "@lucide/svelte";
	import { onMount } from "svelte";

	let { data } = $props();

	onMount(() => {
		const pageHash = window.location.hash.slice(1);
		const index = data.galleryItems.findIndex((i) => i.id === pageHash);
		if (index !== -1) {
			handleModalOpen(index);
		}
	});

	function handleModalOpen(index: number) {
		modalSelectedIndex = index;
		modalOpen = true;
	}

	let modalOpen = $state(false);
	let modalSelectedIndex = $state(0);

	let lightAlertStyles =
		"outline-lavender-pink-600 bg-lavender-pink-200 text-lavender-pink-900";
	let darkAlertStyles =
		"dark:outline-lilac-bush-500 dark:bg-lilac-bush-500/35 dark:text-lilac-bush-400";
</script>

<Meta title={formatPageTitle("Gallery")} />

<GalleryModal
	bind:open={modalOpen}
	items={data.galleryItems}
	startIndex={modalSelectedIndex}
/>

<div class="flex flex-col w-full h-full grow gap-6">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold">Gallery</h1>
		<p class="text-muted-foreground">
			Commissioned works — click any gallery image to view in full screen!
		</p>
	</div>
	<div
		class={cn(
			"flex gap-3 p-4 rounded-lg outline",
			lightAlertStyles,
			darkAlertStyles,
		)}
	>
		<TriangleAlertIcon />
		Do not copy or use any of this art without my explicit permission.
	</div>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
		{#each data.galleryItems as item, i}
			<GalleryImage {item} onclick={() => handleModalOpen(i)} />
		{/each}
	</div>
</div>
