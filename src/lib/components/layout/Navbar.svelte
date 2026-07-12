<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";

	import { IsMobile } from "$lib/shadcn/hooks/is-mobile.svelte";
	import { cn } from "$lib/shadcn/utils";

	import { EllipsisVerticalIcon } from "@lucide/svelte";

	import { Button } from "@uilib/button";
	import * as Drawer from "@uilib/drawer";
	import * as Dropdown from "@uilib/dropdown-menu";
	import * as Nav from "@uilib/navigation-menu";

	import PawPrint from "$lib/assets/icons/flaticon/pawprint.svg?component";

	import { page } from "$app/state";
	import { ThemeSwitcher } from "@components/app";

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
	<Button variant="ghost" size="icon" {...props}>
		<EllipsisVerticalIcon />
	</Button>
{/snippet}

<div class="sticky top-0 z-10" transition:fade>
	<Nav.Root
		viewport={isMobile.current}
		class="px-2 sm:px-20 2xl:px-80 py-4 max-w-full *:w-full backdrop-blur-sm"
	>
		<Nav.List class="flex justify-between">
			<Nav.Item>
				<Nav.Link>
					{#snippet child()}
						<a
							href="/"
							class={cn(itemBaseStyles, "p-2 rounded-full")}
						>
							<PawPrint width="24" height="24" />
						</a>
					{/snippet}
				</Nav.Link>
			</Nav.Item>
			<div class="flex gap-2 items-center">
				{#each navItems as item}
					<Nav.Item>
						{@render ListItem(item)}
					</Nav.Item>
				{/each}

				{#if isMobile.current}
					<Drawer.Root>
						<Drawer.Trigger>
							{#snippet child({ props })}
								{@render overflowTrigger(props)}
							{/snippet}
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title>Theme</Drawer.Title>
							</Drawer.Header>
							<div class="p-2">
								<ThemeSwitcher />
							</div>
						</Drawer.Content>
					</Drawer.Root>
				{:else}
					<Dropdown.Root>
						<Dropdown.Trigger>
							{#snippet child({ props })}
								{@render overflowTrigger(props)}
							{/snippet}
						</Dropdown.Trigger>
						<Dropdown.Content align="end">
							<Dropdown.Group>
								<Dropdown.Label>Theme</Dropdown.Label>
								<div class="px-2 pb-2">
									<ThemeSwitcher />
								</div>
							</Dropdown.Group>
						</Dropdown.Content>
					</Dropdown.Root>
				{/if}
			</div>
		</Nav.List>
	</Nav.Root>
</div>
