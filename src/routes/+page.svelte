<script lang="ts">
	import type { Component } from "svelte";

	import { formatPageTitle } from "$lib/utils";

	import * as Avatar from "@uilib/avatar";
	import { Button } from "@uilib/button";
	import * as Tooltip from "@uilib/tooltip";

	import { BrandIcon, GenericIcon, Icon } from "@components/icon";
	import type { AvatarImageLoadingStatus } from "bits-ui";

	import { Attribution } from "@components/image";
	import { Meta } from "@components/app";
	import { cn } from "$lib/shadcn/utils";
	import { getGalleryItem } from "$lib/art";
	import { goto } from "$app/navigation";

	type SocialLink = {
		tooltip: string;
		url: string;
		icon: Component;
	};

	const socialLinks: SocialLink[] = [
		{
			tooltip: "Modrinth",
			url: "https://modrinth.com/@jade",
			icon: BrandIcon.Modrinth,
		},
		{
			tooltip: "GitHub",
			url: "https://github.com/jadelily18",
			icon: BrandIcon.Github,
		},
		{
			tooltip: "BlueSky",
			url: "https://bsky.app/profile/jadelily.dev",
			icon: BrandIcon.Bluesky,
		},
	];

	const avatar = getGalleryItem("em-pawlaxy");

	let avatarLoadingStatus = $state<AvatarImageLoadingStatus>("loading");
</script>

<Meta
	title={formatPageTitle("Home")}
	description="A gay dog on the internet."
	image={avatar.src}
	imageAlt={avatar.alt}
/>

<div class="flex grow items-center justify-center">
	<div
		class="flex max-w-74 flex-col items-center gap-4 p-4 sm:max-w-120 sm:flex-row"
	>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<a
					class="relative inline-block scale-100 cursor-pointer transition-[scale] duration-200 hover:scale-105 active:scale-100"
					href="/gallery#{avatar.id}"
				>
					<Avatar.Root
						class="size-28 overflow-visible duration-200 after:border-none"
						bind:loadingStatus={avatarLoadingStatus}
					>
						<Avatar.Image
							class="absolute size-full rounded-full shadow-md outline outline-border duration-1000
								group-data-[status=loaded]/avatar:animate-in
								group-data-[status=loaded]/avatar:fade-in-0
								group-data-[status=loaded]/avatar:zoom-in-65"
							src={avatar.src}
							alt={avatar.alt}
						/>
						<Avatar.Fallback
							class="absolute inset-0 flex items-center justify-center duration-1000
								group-data-[status=loaded]/avatar:animate-out
								group-data-[status=loaded]/avatar:fade-out-0
								group-data-[status=loaded]/avatar:zoom-out-75"
						>
							<Icon
								icon={GenericIcon.PawPrint}
								class="animate-pulse"
							/>
						</Avatar.Fallback>
					</Avatar.Root>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content>View in gallery</Tooltip.Content>
		</Tooltip.Root>
		<div class="flex flex-col items-center sm:items-start">
			<div class="flex items-center gap-2">
				<span class="text-2xl font-semibold">Jade</span>
				<span class="text-sm text-muted-foreground">she/her</span>
			</div>
			<p class="text-center text-sm sm:text-left">
				Hi, I'm Jade! You can find more info about me or my socials
				below!
			</p>
			<div class="mt-2 flex items-center gap-1">
				<Button
					class="cursor-pointer"
					variant="outline"
					href="/blog/hi-im-jade"
				>
					About me
				</Button>
				{#each socialLinks as link}
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Button
									class="cursor-pointer"
									size="icon"
									variant="outline"
									href={link.url}
									target="_blank"
									{...props}
								>
									<Icon icon={link.icon} />
								</Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>{link.tooltip}</Tooltip.Content>
					</Tooltip.Root>
				{/each}
			</div>
		</div>
	</div>
</div>
