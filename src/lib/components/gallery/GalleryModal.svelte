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
		class="fixed inset-0 isolate z-50 bg-black/40 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
	/>
	<Dialog.Content
		showCloseButton={false}
		class="rounded-noneshadow-2xl fixed top-1/2 left-1/2 z-50 flex h-screen w-screen max-w-max! -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-hidden border-none bg-transparent! outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
	>
		<Dialog.Close
			class="absolute top-4 right-4 z-10 cursor-pointer rounded-full border-white/10 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60 hover:text-white"
		>
			<XIcon />
		</Dialog.Close>

		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			opts={{ startIndex, loop: true }}
			class="flex size-full flex-col items-center justify-center"
		>
			<Carousel.Content class="ml-0 h-full flex-1">
				{#each items as item, i (item.src)}
					<Carousel.Item
						class="flex h-full basis-full items-center justify-center pl-0"
					>
						<img
							src={item.src}
							alt={item.alt}
							class="max-h-[65vh] w-auto max-w-[calc(100vw-4rem)] rounded-lg object-contain shadow-lg select-none sm:max-h-[55vh]"
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
			class="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 flex-col items-center px-4 py-4 md:max-w-2xl"
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
				class="mt-2 mb-4 inline-flex items-center gap-1 rounded-full bg-lavender-pink-200 px-2.5 py-1 text-sm text-lavender-pink-900 outline outline-lavender-pink-600 transition-colors hover:bg-lavender-pink-300/90 dark:bg-lilac-bush-500/35 dark:text-lilac-bush-400 dark:outline-lilac-bush-500 dark:hover:bg-lilac-bush-500/45"
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
						class="h-1.5 cursor-pointer rounded-full transition-all hover:bg-lavender-pink-300 dark:hover:bg-lilac-bush-400 {i ===
						current
							? 'w-6 bg-white'
							: 'w-1.5 bg-white/30 hover:bg-white/50'}"
					></button>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
