<script lang="ts">
	import * as Drawer from "@uilib/drawer";
	import type { Snippet } from "svelte";

	import { CheckIcon, RotateCcwIcon } from "@lucide/svelte";

	import { scrollFade } from "$lib/attachments";
	import type { SettingsPageId } from "./types";
	import { pages } from ".";
	import { appStore } from "$lib/state/app.svelte";
	import { Button } from "@uilib/button";

	type Props = {
		open?: boolean;
		activePageId?: SettingsPageId;
		trigger: Snippet<[Record<string, unknown>]>;
	};

	let {
		open = $bindable(false),
		activePageId = "general",
		trigger,
	}: Props = $props();

	let activePage = $derived(pages[activePageId]);

	$effect(() => {
		if (open) {
			if (appStore.settings.activePage) {
				activePageId = appStore.settings.activePage;
				appStore.settings.activePage = undefined;
			}
		} else {
			setTimeout(() => (activePageId = "general"), 200);
		}
	});

	let showSavePrompt = $derived(appStore.settings.dirty);
</script>

<Drawer.NestedRoot bind:open dismissible={!showSavePrompt}>
	<Drawer.Trigger>
		{#snippet child({ props })}
			{@render trigger(props)}
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content class="flex max-h-[85vh] flex-col">
		<Drawer.Header class="shrink-0 pb-2">
			<Drawer.Title>Settings</Drawer.Title>
		</Drawer.Header>
		<div class="flex shrink-0 gap-1 px-4 pb-2">
			{#each Object.entries(pages) as [id, page]}
				<Button
					class="flex-1 cursor-pointer"
					variant={id === activePageId ? "secondary" : "ghost"}
					size="sm"
					onclick={() => (activePageId = id as SettingsPageId)}
				>
					<page.icon />
					{page.label}
				</Button>
			{/each}
		</div>
		<div
			class="fade-y flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4"
			{@attach scrollFade(48, "y")}
		>
			<activePage.content />
		</div>
		<div
			data-show={showSavePrompt}
			class="
				mx-4 mb-4 flex shrink-0 items-center justify-between rounded-xl border border-border bg-accent
				px-4 py-2 duration-200 data-[show=false]:invisible data-[show=false]:animate-out data-[show=false]:fade-out-0
				data-[show=false]:zoom-out-95 data-[show=false]:blur-out-sm data-[show=true]:visible
				data-[show=true]:animate-in data-[show=true]:fade-in-0 data-[show=true]:zoom-in-95
			"
		>
			<span>Unsaved changes!</span>
			<div class="flex gap-1 *:cursor-pointer">
				<Button
					aria-label="Reset pending settings"
					variant="ghost"
					size="icon-sm"
					onclick={() => appStore.settings.reset()}
				>
					<RotateCcwIcon />
				</Button>
				<Button size="sm" onclick={() => appStore.settings.commit()}>
					<CheckIcon /> Save
				</Button>
			</div>
		</div>
	</Drawer.Content>
</Drawer.NestedRoot>
