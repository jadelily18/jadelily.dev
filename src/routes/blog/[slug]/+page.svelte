<script lang="ts">
	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";
	import { AspectRatio } from "@uilib/aspect-ratio";

	import { Markdown } from "@components/markdown";
	import { ArrowUpIcon } from "@lucide/svelte";
	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { fade } from "svelte/transition";

	import * as Avatar from "@uilib/avatar";
	import * as Bread from "@uilib/breadcrumb";
	import { Button } from "@uilib/button";
	import { Separator } from "@uilib/separator";
	import * as Tooltip from "@uilib/tooltip";

	import { Meta } from "@components/app";
	import { Attribution } from "@components/image";
	import { cn } from "$lib/shadcn/utils";

	import emImg from "$lib/assets/images/art/em-pawlaxy-icon.png";
	import { ContentWarningDialog } from "@components/blog";
	import { ignoreContentWarnings } from "$lib/state/warning.svelte";

	const isMobile = new IsMobile();

	let scrollY = $state<number | undefined>(undefined);

	let showScrollUp = $derived(scrollY && scrollY > 400);

	let contentElement = $state<HTMLElement | undefined>(undefined);
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

	let showContentWarning = $state<boolean>(true);

	$effect(() => {
		updateOffset();
		window.addEventListener("resize", updateOffset);
		return () => window.removeEventListener("resize", updateOffset);
	});
</script>

<svelte:window bind:scrollY />

<Meta
	title={formatPageTitle("Blog", data.post.title)}
	titleMeta={data.post.title}
	type="article.content"
	author="Jade"
	description={data.post.summary}
	image={data.post.coverImg}
	publishedTime={dayjs(new Date(data.post.timestamp * 1000)).toISOString()}
/>

{#if !ignoreContentWarnings.value && data.post.contentWarning && showContentWarning}
	<ContentWarningDialog
		bind:open={showContentWarning}
		contentWarning={data.post.contentWarning}
	/>
{:else}
	{#if showScrollUp}
		<div
			transition:fade={{ duration: 100 }}
			class="fixed bottom-6 md:bottom-8 z-10"
			style="right: {isMobile.current ? '24' : rightOffset}px"
		>
			<Button
				class="cursor-pointer"
				size="icon-lg"
				onclick={scrollToTop}
				aria-label="Scroll to top"
			>
				<ArrowUpIcon />
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
			<p
				class="inline-flex items-center gap-1 text-sm text-muted-foreground"
			>
				<Avatar.Root class="size-6 mr-0.5">
					<Avatar.Image src={emImg} />
					<Avatar.Fallback>J</Avatar.Fallback>
				</Avatar.Root>
				jade •
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<span {...props}>
								Published
								<time
									datetime={dayjs(
										data.post.timestamp * 1000,
									).format("YYYY-MM-DD")}
								>
									{dayjs(data.post.timestamp * 1000).format(
										"MMM D, YYYY",
									)}
								</time>
							</span>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>
						{dayjs(data.post.timestamp * 1000).format(
							"MMM D, YYYY, h:mm a",
						)}
					</Tooltip.Content>
				</Tooltip.Root>
			</p>
			<Separator />
		</div>
		{#if data.post.coverImg}
			<AspectRatio
				ratio={16 / 9}
				class="rounded-lg shadow-md outline outline-border overflow-hidden md:mx-4 group/attribution"
			>
				{#if data.post.attribution}
					<Attribution expanded class="z-10 right-2 bottom-2">
						{#snippet content(contentStyles)}
							{#if data.post.attributionLink}
								<a
									class={cn("hover:underline", contentStyles)}
									href={data.post.attributionLink}
									target="_blank"
								>
									{data.post.attribution}
								</a>
							{:else}
								<span class={contentStyles}>
									{data.post.attribution}
								</span>
							{/if}
						{/snippet}
					</Attribution>
				{/if}
				<img
					class="w-full h-full object-cover"
					src={data.post.coverImg}
					alt={data.post.coverAlt || ""}
				/>
			</AspectRatio>
		{/if}
		<article class="flex justify-center">
			<Markdown
				class="prose dark:prose-invert w-full max-w-full!"
				markdown={data.post.content}
				withHeaders
				withHighlight
				withFootnotes
			/>
		</article>
	</div>
{/if}
