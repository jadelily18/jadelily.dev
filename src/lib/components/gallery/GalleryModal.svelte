<script lang="ts">
	import * as Dialog from "@uilib/dialog";
	import * as Carousel from "@uilib/carousel";
	import type { CarouselAPI } from "@uilib/carousel/context";

	import type { GalleryItem } from "$types/art";
	import { ExternalLinkIcon, XIcon } from "@lucide/svelte";
	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";

	let {
		open = $bindable(false),
		items,
		startIndex = 0,
	}: {
		open?: boolean;
		items: GalleryItem[];
		startIndex?: number;
	} = $props();

	const isMobile = new IsMobile();

	let api = $state<CarouselAPI>();
	// svelte-ignore state_referenced_locally
	let current = $state(startIndex);

	$effect(() => {
		if (open && api) api.scrollTo(startIndex, true);

		if (!api) return;
		const onSelect = () => (current = api!.selectedScrollSnap());
		onSelect();
		api.on("select", onSelect);

		return () => api?.off("select", onSelect);
	});

	const activeItem = $derived(items[current]);
</script>

<Dialog.Root bind:open>
	<Dialog.Overlay
		class="bg-black/40 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50"
	/>
	<Dialog.Content
		showCloseButton={false}
		class="fixed border-none bg-transparent! left-1/2 top-1/2 z-50 justify-between flex h-screen w-screen max-w-max! -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-noneshadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
	>
		<Dialog.Close
			class="absolute right-4 top-4 z-10 rounded-full p-2 backdrop-blur transition border-white/10 bg-black/40 text-white hover:bg-black/60 hover:text-white cursor-pointer"
		>
			<XIcon />
		</Dialog.Close>

		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			opts={{ startIndex, loop: true }}
			class="flex size-full flex-col justify-center items-center"
		>
			<Carousel.Content class="h-full flex-1 ml-0">
				{#each items as item, i (item.src)}
					<Carousel.Item
						class="flex h-full basis-full items-center justify-center pl-0"
					>
						<img
							src={item.src}
							alt={item.alt}
							class="max-h-[65vh] w-auto max-w-full select-none rounded-lg object-contain shadow-lg sm:max-h-[55vh]"
							loading={i === startIndex ? "eager" : "lazy"}
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>

			{#if !isMobile.current}
				<Carousel.Previous
					class="left-4 size-10 border-white/10 bg-black/40 text-white backdrop-blur hover:bg-black/60 hover:text-white"
				/>
				<Carousel.Next
					class="right-4 size-10 border-white/10 bg-black/40 text-white backdrop-blur hover:bg-black/60 hover:text-white"
				/>
			{/if}
		</Carousel.Root>

		<div
			class="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col items-center py-4 px-4 md:max-w-2xl"
		>
			<div class="mx-auto flex max-w-3xl flex-col gap-1 text-center">
				<h2
					class="text-lg font-semibold tracking-tight text-white sm:text-xl"
				>
					{activeItem.title}
				</h2>
				<p class="text-sm leading-relaxed text-white/60 sm:text-base">
					{activeItem.description}
				</p>
			</div>

			<a
				class="inline-flex items-center gap-1 mt-2 mb-4 py-1 px-2.5 rounded-full text-sm transition-colors outline outline-lavender-pink-600 bg-lavender-pink-200 hover:bg-lavender-pink-300/90 text-lavender-pink-900 dark:outline-lilac-bush-500 dark:bg-lilac-bush-500/35 dark:hover:bg-lilac-bush-500/45 dark:text-lilac-bush-400"
				href={activeItem.attribution.url}
				target="_blank"
			>
				{activeItem.attribution.label}
				<ExternalLinkIcon size="14" />
			</a>

			<div class="flex items-center justify-center gap-1.5">
				{#each items as _, i}
					<button
						aria-label={`Go to image ${i + 1}`}
						onclick={() => api?.scrollTo(i)}
						class="h-1.5 rounded-full transition-all {i === current
							? 'w-6 bg-white'
							: 'w-1.5 bg-white/30 hover:bg-white/50'}"
					></button>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
