<script lang="ts">
	import * as Breadcrumb from "@uilib/breadcrumb";
	import * as Dialog from "@uilib/dialog";
	import * as Sidebar from "@uilib/sidebar";
	import type { Component, Snippet } from "svelte";

	import {
		CookieIcon,
		HeartIcon,
		InfoIcon,
		SettingsIcon,
	} from "@lucide/svelte";

	import { scrollFade } from "$lib/attachments";
	import type { SettingsPageId } from "./types";
	import { pages } from ".";
	import { GenericIcon, Icon } from "@components/icon";

	type Props = {
		open?: boolean;
		activePageId?: SettingsPageId;
		trigger: Snippet;
	};

	let {
		open = $bindable(true),
		activePageId = "general",
		trigger,
	}: Props = $props();

	let activePage = $derived(pages[activePageId]);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{@render trigger()}
	</Dialog.Trigger>
	<Dialog.Content
		class="overflow-hidden p-0 md:max-h-125 md:max-w-175 lg:max-w-200"
		trapFocus={false}
	>
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
