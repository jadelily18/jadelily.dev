<script lang="ts">
	import type { Component } from "svelte";

	import { formatPageTitle } from "$lib/utils";

	import * as Avatar from "@uilib/avatar";
	import { Button } from "@uilib/button";
	import * as Tooltip from "@uilib/tooltip";

	import { BrandIcon, GenericIcon, Icon } from "@components/icon";
	import type { AvatarImageLoadingStatus } from "bits-ui";

	import emImage from "$lib/assets/images/art/em-pawlaxy-icon.png";
	import { Attribution } from "@components/image";

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

	// TODO: better alt
	const imgAlt = "Jade's fursona, Em";

	let avatarLoadingStatus = $state<AvatarImageLoadingStatus>("loading");
</script>

<svelte:head>
	<title>{formatPageTitle("Home")}</title>
</svelte:head>

<div class="flex justify-center items-center grow">
	<div
		class="flex flex-col sm:flex-row items-center gap-4 p-4 max-w-74 sm:max-w-120"
	>
		<div class="relative size-28 group/attribution">
			<Avatar.Root
				class="size-28 shadow-md"
				bind:loadingStatus={avatarLoadingStatus}
			>
				<Avatar.Image
					class="absolute w-full h-full animate-fade-in rounded-full"
					src={emImage}
					alt={imgAlt}
				/>
				{#if avatarLoadingStatus !== "loaded"}
					<Avatar.Fallback>
						<Icon
							icon={GenericIcon.PawPrint}
							class="animate-pulse"
						/>
					</Avatar.Fallback>
				{/if}
			</Avatar.Root>

			{#if avatarLoadingStatus === "loaded"}
				<Attribution>
					{#snippet content()}
						<a
							class="text-sm whitespace-nowrap hover:underline"
							href="https://vgen.co/painic"
							target="_blank"
						>
							Drawn by @painic
						</a>
					{/snippet}
				</Attribution>
			{/if}
		</div>
		<div class="flex flex-col items-center sm:items-start">
			<div class="flex items-center gap-2">
				<span class="text-2xl font-semibold">Jade</span>
				<span class="text-sm text-muted-foreground">she/her</span>
			</div>
			<p class="text-sm text-center sm:text-left">
				Hi, I'm Jade! You can find more info about me or my socials
				below!
			</p>
			<div class="flex items-center mt-2 gap-1">
				<Button class="cursor-pointer" variant="outline"
					>About me</Button
				>
				{#each socialLinks as link}
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
									class="cursor-pointer"
									size="icon"
									variant="outline"
									href={link.url}
									target="_blank"
								>
									<Icon icon={link.icon} />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>{link.tooltip}</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{/each}
			</div>
		</div>
	</div>
	<!--  -->
</div>

<!-- <h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
	documentation
</p> -->
