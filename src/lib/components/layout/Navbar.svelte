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

	type NavLink = {
		title: string;
		href: string;
		content?: string;
	};

	type NavGroup = {
		title: string;
		children: NavLink[];
	};

	type NavItem = NavLink | NavGroup;

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> &
		NavLink & {
			// top-level links use the animated pill instead of a static background
			pill?: boolean;
		};

	const navItems: NavItem[] = [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Resume",
			href: "/resume",
		},
		{
			title: "Personal",
			children: [
				{
					title: "Blog",
					href: "/blog",
				},
				{
					title: "Gallery",
					href: "/gallery",
				},
			],
		},
	];

	const itemBaseStyles =
		"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 leading-none no-underline transition-colors outline-none select-none";

	const selectedStyles =
		"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:text-primary-foreground focus:hover:bg-primary/80";

	const pillSelectedStyles =
		"text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground";

	function isActive(href: string) {
		const path = page.url.pathname;
		if (href === "/") return path === "/";
		return path === href || path.startsWith(`${href}/`);
	}

	function activeChild(group: NavGroup) {
		return group.children.find((child) => isActive(child.href));
	}
</script>

{#snippet selectedPill()}
	<span
		aria-hidden="true"
		class="absolute inset-0 m-0 rounded-md bg-primary transition-colors group-hover/nav-pill:bg-primary/90"
		style:view-transition-name="nav-pill"
	></span>
{/snippet}

{#snippet pillLabel(title: string, key: string)}
	<span
		class="relative block text-sm leading-none font-medium"
		style:view-transition-name="nav-label-{key}"
		style:view-transition-class="nav-label"
	>
		{title}
	</span>
{/snippet}

{#snippet ListItem({
	title,
	content,
	href,
	pill = false,
	class: className,
	...restProps
}: ListItemProps)}
	{@const selected = isActive(href)}
	<Nav.Link>
		{#snippet child()}
			<a
				{href}
				class={cn(
					"rounded-md px-3 py-2",
					itemBaseStyles,
					className,
					pill && "group/nav-pill relative",
					selected && (pill ? pillSelectedStyles : selectedStyles),
				)}
				{...restProps}
			>
				{#if pill}
					{#if selected}
						{@render selectedPill()}
					{/if}
					{@render pillLabel(title, title.toLowerCase())}
				{:else}
					<span class="text-sm leading-none font-medium">{title}</span
					>
				{/if}
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

{#snippet navGroup(group: NavGroup)}
	{@const selected = activeChild(group)}
	<Nav.Trigger
		class={cn(
			"group/nav-pill relative h-auto cursor-pointer rounded-md px-3 py-2 leading-none hover:bg-accent focus:bg-accent data-open:bg-accent data-open:hover:bg-accent data-open:focus:bg-accent [&>svg]:[view-transition-class:nav-label] [&>svg]:[view-transition-name:nav-chevron]",
			selected && pillSelectedStyles,
		)}
	>
		{#if selected}
			{@render selectedPill()}
		{/if}
		{@render pillLabel(
			selected?.title ?? group.title,
			group.title.toLowerCase(),
		)}
	</Nav.Trigger>
	<Nav.Content class="right-0 left-auto min-w-36">
		<ul class="flex flex-col gap-1">
			{#each group.children as child (child.href)}
				<li>{@render ListItem(child)}</li>
			{/each}
		</ul>
	</Nav.Content>
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

{#snippet mobileNavItem(item: NavLink)}
	<a
		data-selected={isActive(item.href)}
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
									{#each navItems as item (item.title)}
										{#if "children" in item}
											<span
												class="px-4 pt-5 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase"
											>
												{item.title}
											</span>
											{#each item.children as child (child.href)}
												{@render mobileNavItem(child)}
											{/each}
										{:else}
											{@render mobileNavItem(item)}
										{/if}
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
					{#each navItems as item (item.title)}
						<Nav.Item>
							{#if "children" in item}
								{@render navGroup(item)}
							{:else}
								{@render ListItem({ ...item, pill: true })}
							{/if}
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
