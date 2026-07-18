<script lang="ts">
	import * as Bread from "@uilib/breadcrumb";
	import { Separator } from "@uilib/separator";

	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";
	import { AspectRatio } from "@uilib/aspect-ratio";

	import { Markdown } from "@components/markdown";
	import { Button } from "@uilib/button";
	import { ChevronUpIcon } from "@lucide/svelte";
	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { fade } from "svelte/transition";

	const isMobile = new IsMobile();

	let scrollY = $state<number | undefined>(undefined);

	let showScrollUp = $derived(scrollY && scrollY > 400);

	let contentElement: HTMLElement;
	let rightOffset = $state(24); // 1.5rem

	function updateOffset() {
		if (!contentElement) return;
		const rect = contentElement.getBoundingClientRect();
		const gap = 72;
		const distanceFromRight = window.innerWidth - rect.right;
		rightOffset = Math.max(24, distanceFromRight - gap);
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	let { data } = $props();

	$effect(() => {
		updateOffset();
		window.addEventListener("resize", updateOffset);
		return () => window.removeEventListener("resize", updateOffset);
	});
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{formatPageTitle("Blog", data.post.title)}</title>
</svelte:head>

{#if showScrollUp}
	<div
		transition:fade={{ duration: 100 }}
		class="fixed bottom-6 md:bottom-8 z-10"
		style="right: {isMobile.current ? '24' : rightOffset}px"
	>
		<Button class="cursor-pointer" size="icon-lg" onclick={scrollToTop}>
			<ChevronUpIcon />
		</Button>
	</div>
{/if}
<div bind:this={contentElement} class="relative flex flex-col gap-8">
	<Bread.Root>
		<Bread.List>
			<Bread.Item>
				<Bread.Link href="/blog">Blog</Bread.Link>
			</Bread.Item>
			<Bread.Separator />
			<Bread.Item>
				<Bread.Page>
					{data.post.title}
				</Bread.Page>
			</Bread.Item>
		</Bread.List>
	</Bread.Root>

	<!--  -->
	<div class="flex flex-col gap-4">
		<h1 class="text-4xl font-bold">{data.post.title}</h1>
		<p class="text-lg text-muted-foreground">{data.post.summary}</p>
		<span class="text-sm text-muted-foreground">
			{dayjs(new Date(data.post.timestamp * 1000)).format("MMMM D, YYYY")}
		</span>
		<Separator />
	</div>
	{#if data.post.coverImg}
		<AspectRatio
			ratio={16 / 9}
			class="rounded-lg shadow-md outline outline-border overflow-hidden md:mx-4"
		>
			<img
				class="w-full h-full object-cover"
				src={data.post.coverImg}
				alt={data.post.coverAlt || ""}
			/>
		</AspectRatio>
	{/if}
	<div class="flex justify-center">
		<Markdown
			class="prose dark:prose-invert w-full max-w-full!"
			markdown={data.post.content}
			withHeaders
			withHighlight
		/>
	</div>
</div>
