<script lang="ts">
	import { formatPageTitle } from "$lib/utils";
	import { Comark } from "@comark/svelte";
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

	const alertMarkdown = `
		**Warning** — this is **commissioned work!**  
		**Do not copy** or **use** any of this art for **anything** without explicit permission.
	`;
</script>

<Meta
	title={formatPageTitle("Gallery")}
	description="Jade's commissioned art."
/>

<GalleryModal
	bind:open={modalOpen}
	items={data.galleryItems}
	startIndex={modalSelectedIndex}
/>

<div class="flex h-full w-full grow flex-col gap-6">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold">Gallery</h1>
		<p class="text-muted-foreground">
			Commissioned works — click any gallery image to view in full screen!
		</p>
	</div>
	<Alert type="caution">
		<Comark markdown={alertMarkdown} />
	</Alert>
	<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
		{#each data.galleryItems as item, i}
			<GalleryImage {item} onclick={() => handleModalOpen(i)} />
		{/each}
	</div>
</div>
