<script lang="ts">
	import { youtubeCookieConsent } from "$lib/state/cookieConsent.svelte";
	import { CheckIcon, CookieIcon, XIcon } from "@lucide/svelte";
	import { Button } from "@uilib/button";

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
</script>

<div class="overflow-hidden rounded-lg border border-border md:mx-16">
	{#if youtubeCookieConsent.value}
		<iframe
			class="aspect-video size-full"
			src={`https://www.youtube-nocookie.com/embed/${id}`}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<div
			class="flex aspect-video items-center justify-center bg-accent p-4"
		>
			{#if youtubeCookieConsent.value === false}
				you opted out of yt cookies
			{:else if youtubeCookieConsent.value === undefined}
				<div class="flex flex-col items-center gap-3 md:max-w-lg">
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
							onclick={() => (youtubeCookieConsent.value = true)}
						>
							<CheckIcon />
							Accept</Button
						>
						<Button
							size="sm"
							onclick={() => (youtubeCookieConsent.value = false)}
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
