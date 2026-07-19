<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";

	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { cn } from "$lib/shadcn/utils";

	import { MenuIcon, SettingsIcon } from "@lucide/svelte";

	import { Button } from "@uilib/button";
	import * as Drawer from "@uilib/drawer";
	import * as Dropdown from "@uilib/dropdown-menu";
	import * as Nav from "@uilib/navigation-menu";

	import { Icon, GenericIcon } from "@components/icon";

	import { ThemeSwitcher } from "@components/app";
	import { ContentWarningSwitch } from "@components/blog";

	import { page } from "$app/state";
	import { Separator } from "@uilib/separator";

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
			title: "Art",
			href: "/art",
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
					"py-2 px-3 rounded-md",
					itemBaseStyles,
					className,
					href === page.url.pathname
						? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:hover:bg-primary/80 focus:text-primary-foreground"
						: "",
				)}
				{...restProps}
			>
				<span class="text-sm leading-none font-medium">{title}</span>
				{#if content}
					<p
						class="text-muted-foreground line-clamp-2 text-sm leading-snug"
					>
						{content}
					</p>
				{/if}
			</a>
		{/snippet}
	</Nav.Link>
{/snippet}

{#snippet overflowTrigger(props: Record<string, unknown>)}
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
		class="w-full py-2 px-4 text-lg data-[selected=true]:font-semibold rounded-md text-muted-foreground outline-border data-[selected=true]:outline data-[selected=true]:bg-accent data-[selected=true]:text-foreground active:bg-accent"
		href={item.href}
	>
		{item.title}
	</a>
{/snippet}

<div class="sticky top-0 z-10" transition:fade>
	<Nav.Root
		viewport={isMobile.current}
		class="px-6 sm:px-20 2xl:px-80 py-4 max-w-full *:w-full backdrop-blur-sm"
	>
		<Nav.List class="flex justify-between">
			<Nav.Item>
				<Nav.Link>
					{#snippet child()}
						<a
							href="/"
							class={cn(itemBaseStyles, "p-2 rounded-full")}
						>
							<Icon icon={GenericIcon.PawPrint} />
						</a>
					{/snippet}
				</Nav.Link>
			</Nav.Item>
			<div class="flex gap-2 items-center">
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
							<div class="flex flex-col h-full justify-between">
								<div class="flex flex-col gap-1">
									{#each navItems as item}
										{@render mobileNavItem(item)}
									{/each}
								</div>
								<div class="flex flex-col p-2 gap-2">
									<span
										class="inline-flex items-center gap-2 text-muted-foreground"
									>
										<SettingsIcon size="16" />
										Settings
									</span>
									<Separator class="mb-2" />
									<div class="flex flex-col gap-2">
										<ContentWarningSwitch
											label="Ignore content warnings"
										/>
									</div>
									<div class="flex flex-col gap-2">
										<span class="text-muted-foreground">
											Theme
										</span>
										<ThemeSwitcher />
									</div>
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
					<Dropdown.Root>
						<Dropdown.Trigger>
							{#snippet child({ props })}
								{@render overflowTrigger(props)}
							{/snippet}
						</Dropdown.Trigger>
						<Dropdown.Content align="end" class="w-60 mt-2 pb-2">
							<Dropdown.Group>
								<Dropdown.Label>Theme</Dropdown.Label>
								<div class="px-2 pb-2">
									<ThemeSwitcher />
								</div>
							</Dropdown.Group>
							<Dropdown.Group>
								<Dropdown.Label>
									Content Warnings
								</Dropdown.Label>
								<ContentWarningSwitch class="pl-4" />
							</Dropdown.Group>
						</Dropdown.Content>
					</Dropdown.Root>
				{/if}
			</div>
		</Nav.List>
	</Nav.Root>
</div>
