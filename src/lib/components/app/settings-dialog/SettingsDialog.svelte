<script lang="ts">
	import * as Breadcrumb from "@uilib/breadcrumb";
	import * as Dialog from "@uilib/dialog";
	import * as Sidebar from "@uilib/sidebar";
	import type { Component, Snippet } from "svelte";

	import {
		CheckIcon,
		CookieIcon,
		HeartIcon,
		InfoIcon,
		RotateCcwIcon,
		SettingsIcon,
	} from "@lucide/svelte";

	import { scrollFade } from "$lib/attachments";
	import type { SettingsPageId } from "./types";
	import { pages } from ".";
	import { GenericIcon, Icon } from "@components/icon";
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

<Dialog.Root
	bind:open
	onOpenChange={(next) => {
		if (!next && appStore.settings.dirty) open = true;
	}}
>
	<Dialog.Trigger>
		{#snippet child({ props })}
			{@render trigger(props)}
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content
		class="overflow-hidden p-0 md:max-h-125 md:max-w-175 lg:max-w-200"
		trapFocus={false}
	>
		<div
			data-show={showSavePrompt}
			class="
				absolute right-0 bottom-0 left-0 z-10 m-4 flex items-center justify-between rounded-xl border border-border bg-accent
				px-4 py-2 shadow-xl duration-200 data-[show=false]:invisible data-[show=false]:animate-out data-[show=false]:fade-out-0
				data-[show=false]:zoom-out-95 data-[show=false]:blur-out-sm data-[show=true]:visible
				data-[show=true]:animate-in data-[show=true]:fade-in-0 data-[show=true]:zoom-in-95
			"
		>
			<span>You have unsaved changes!</span>
			<div class="flex gap-1 *:cursor-pointer">
				<Button
					variant="outline"
					size="sm"
					onclick={() => appStore.settings.reset()}
				>
					<RotateCcwIcon /> Reset
				</Button>
				<Button size="sm" onclick={() => appStore.settings.commit()}>
					<CheckIcon /> Save
				</Button>
			</div>
		</div>
		<Icon
			class="absolute bottom-6 left-6 size-6 text-muted"
			icon={GenericIcon.PawPrint}
			aria-hidden="true"
		/>
		<Dialog.Title class="sr-only">Settings</Dialog.Title>
		<Dialog.Description class="sr-only">
			Customize user settings.
		</Dialog.Description>
		<Sidebar.Provider class="items-start">
			<Sidebar.Root collapsible="none" class="hidden md:flex">
				<Sidebar.Content class="flex h-full flex-col pt-2 pl-2">
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each Object.entries(pages) as [id, page]}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											class="cursor-pointer data-[active=false]:text-muted-foreground"
											isActive={id === activePageId}
											onclick={() =>
												(activePageId =
													id as SettingsPageId)}
										>
											{#snippet child({ props })}
												<span {...props}>
													<page.icon />
													<span>{page.label}</span>
												</span>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<main class="flex h-120 flex-1 flex-col overflow-hidden">
				<header
					class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
				>
					<div class="flex items-center gap-2 px-4">
						<Breadcrumb.Root>
							<Breadcrumb.List>
								<Breadcrumb.Item
									class="hidden items-center gap-1 md:inline-flex"
								>
									<SettingsIcon class="size-4" />
									Settings
								</Breadcrumb.Item>
								<Breadcrumb.Separator class="hidden md:block" />
								<Breadcrumb.Item>
									<Breadcrumb.Page
										>{activePage!.label}</Breadcrumb.Page
									>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb.Root>
					</div>
				</header>
				<div
					class="fade-y flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0"
					{@attach scrollFade(48, "y")}
				>
					<activePage.content />
				</div>
			</main>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
