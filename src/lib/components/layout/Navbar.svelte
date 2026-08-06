<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";

	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { cn } from "$lib/shadcn/utils";

	import { ChevronRightIcon, MenuIcon, SettingsIcon } from "@lucide/svelte";

	import { Button } from "@uilib/button";
	import * as Drawer from "@uilib/drawer";
	import * as Nav from "@uilib/navigation-menu";

	import { Icon, GenericIcon } from "@components/icon";

	import { SettingsDialog, SettingsDrawer } from "@components/app";

	import { page } from "$app/state";
	import { appStore } from "$lib/state/app.svelte";

	const isMobile = new IsMobile();

	type NavItem = {
		title: string;
		href: string;
		content?: string;
	};

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & NavItem;

	const navItems: NavItem[] = [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Blog",
			href: "/blog",
		},
		{
			title: "Resume",
			href: "/resume",
		},
		{
			title: "Gallery",
			href: "/gallery",
		},
	];

	const itemBaseStyles =
		"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 leading-none no-underline transition-colors outline-none select-none";
</script>

{#snippet ListItem({
	title,
	content,
	href,
	class: className,
	...restProps
}: ListItemProps)}
	<Nav.Link>
		{#snippet child()}
			<a
				{href}
				class={cn(
					"rounded-md px-3 py-2",
					itemBaseStyles,
					className,
					href === page.url.pathname
						? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:text-primary-foreground focus:hover:bg-primary/80"
						: "",
				)}
				{...restProps}
			>
				<span class="text-sm leading-none font-medium">{title}</span>
				{#if content}
					<p
						class="line-clamp-2 text-sm leading-snug text-muted-foreground"
					>
						{content}
					</p>
				{/if}
			</a>
		{/snippet}
	</Nav.Link>
{/snippet}

{#snippet overflowTrigger(props: Record<string, unknown> | undefined)}
	<Button
		class="cursor-pointer"
		variant="ghost"
		size={isMobile.current ? "icon-lg" : "icon"}
		{...props}
	>
		{#if isMobile.current}
			<MenuIcon />
		{:else}
			<SettingsIcon />
		{/if}
	</Button>
{/snippet}

{#snippet mobileNavItem(item: NavItem)}
	<a
		data-selected={item.href === page.url.pathname}
		class="w-full rounded-md px-4 py-2 text-lg text-muted-foreground outline-border active:bg-accent data-[selected=true]:bg-accent data-[selected=true]:font-semibold data-[selected=true]:text-foreground data-[selected=true]:outline"
		href={item.href}
	>
		{item.title}
	</a>
{/snippet}

<div class="sticky top-0 z-10" transition:fade>
	<Nav.Root
		viewport={isMobile.current}
		class="max-w-full px-6 py-4 backdrop-blur-sm *:w-full sm:px-20 2xl:px-80"
	>
		<Nav.List class="flex justify-between">
			<Nav.Item>
				<Nav.Link>
					{#snippet child()}
						<a
							href="/"
							class={cn(itemBaseStyles, "rounded-full p-2")}
						>
							<Icon icon={GenericIcon.PawPrint} />
						</a>
					{/snippet}
				</Nav.Link>
			</Nav.Item>
			<div class="flex items-center gap-2">
				{#if isMobile.current}
					<Drawer.Root direction="right">
						<Drawer.Trigger>
							{#snippet child({ props })}
								{@render overflowTrigger(props)}
							{/snippet}
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title>jadelily.dev</Drawer.Title>
							</Drawer.Header>
							<div class="flex h-full flex-col justify-between">
								<div class="flex flex-col gap-1">
									{#each navItems as item}
										{@render mobileNavItem(item)}
									{/each}
								</div>
								<div class="flex flex-col gap-2 p-2">
									<!-- <Separator class="mb-1" /> -->
									<SettingsDrawer
										bind:open={appStore.settings.open}
									>
										{#snippet trigger(props)}
											<button
												{...props}
												class="flex w-full items-center justify-between rounded-md px-2 py-2 text-lg text-muted-foreground outline-border active:bg-accent"
											>
												<span
													class="inline-flex items-center gap-2"
												>
													<SettingsIcon size="18" />
													Settings
												</span>
												<ChevronRightIcon size="18" />
											</button>
										{/snippet}
									</SettingsDrawer>
								</div>
							</div>
						</Drawer.Content>
					</Drawer.Root>
				{:else}
					{#each navItems as item}
						<Nav.Item>
							{@render ListItem(item)}
						</Nav.Item>
					{/each}
					<SettingsDialog bind:open={appStore.settings.open}>
						{#snippet trigger(props)}
							{@render overflowTrigger(props)}
						{/snippet}
					</SettingsDialog>
				{/if}
			</div>
		</Nav.List>
	</Nav.Root>
</div>
