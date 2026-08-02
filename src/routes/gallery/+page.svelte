<script lang="ts">
	import { formatPageTitle } from "$lib/utils";
	import { Meta } from "@components/app";
	import { Alert } from "@components/base";
	import { GalleryImage, GalleryModal } from "@components/gallery";
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
	<Alert type="caution">
		Do not copy or use any of this art without my explicit permission.
	</Alert>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
		{#each data.galleryItems as item, i}
			<GalleryImage {item} onclick={() => handleModalOpen(i)} />
		{/each}
	</div>
</div>
