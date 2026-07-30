<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { formatPageTitle } from "$lib/utils";
	import { Meta } from "@components/app";
	import { GalleryImage, GalleryModal } from "@components/gallery";

	let { data } = $props();

	function handleGalleryItemClick(index: number) {
		console.log("clicked");
		modalSelectedIndex = index;
		modalOpen = true;
	}

	let modalOpen = $state(false);
	let modalSelectedIndex = $state(0);
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
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		{#each data.galleryItems as item, i}
			<GalleryImage {item} onclick={() => handleGalleryItemClick(i)} />
		{/each}
	</div>
</div>
