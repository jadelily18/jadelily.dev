<script lang="ts">
	import { appStore, openSettingsPage } from "$lib/state/app.svelte";
	import {
		CheckIcon,
		CircleAlertIcon,
		CookieIcon,
		SettingsIcon,
		XIcon,
	} from "@lucide/svelte";
	import { Button } from "@uilib/button";

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
</script>

<div class="overflow-hidden rounded-lg border border-border md:mx-16">
	{#if appStore.settings.cookies.allowYoutubeCookies}
		<iframe
			class="aspect-video size-full"
			src={`https://www.youtube-nocookie.com/embed/${id}`}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<div
			class="flex aspect-video items-center justify-center bg-accent p-4 *:md:max-w-lg"
		>
			{#if appStore.settings.cookies.allowYoutubeCookies === false}
				<div class="flex flex-col items-center gap-3">
					<div
						class="flex w-full flex-col items-center justify-center gap-2"
					>
						<div
							class="inline-flex items-center justify-center gap-2 text-lg font-semibold"
						>
							<CircleAlertIcon class="size-6" />
							Unavailable
						</div>
						<span class="text-center text-sm text-muted-foreground">
							You won't be able to view YouTube videos unless
							enabled.
						</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						onclick={() => openSettingsPage("cookies")}
					>
						<SettingsIcon />
						Manage cookies
					</Button>
				</div>
			{:else if appStore.settings.cookies.allowYoutubeCookies === undefined}
				<div class="flex flex-col items-center gap-3">
					<div class="flex flex-col gap-2 text-center">
						<span
							class="inline-flex items-center justify-center gap-2 text-lg font-semibold"
						>
							<CookieIcon class="size-6" />
							Accept YouTube cookies?
						</span>
						<span class="text-sm text-muted-foreground"
							>Accepting this will share certain information with
							YouTube/Google; this may include tracking cookies.</span
						>
					</div>
					<div class="flex gap-2 *:cursor-pointer">
						<Button
							size="sm"
							onclick={() => (appStore.settings.cookies.allowYoutubeCookies = true)}
						>
							<CheckIcon />
							Accept</Button
						>
						<Button
							size="sm"
							onclick={() => (appStore.settings.cookies.allowYoutubeCookies = false)}
						>
							<XIcon />
							Deny</Button
						>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
