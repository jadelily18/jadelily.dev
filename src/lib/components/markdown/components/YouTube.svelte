<script lang="ts">
	import { youtubeCookieConsent } from "$lib/state/cookieConsent.svelte";
	import { Button } from "@uilib/button";

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
</script>

<div class="overflow-hidden rounded-lg border border-border md:mx-16">
	{#if youtubeCookieConsent.value}
		<iframe
			class="size-full"
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
				<div class="flex flex-col items-center gap-2 md:max-w-lg">
					<div class="flex flex-col gap-1 text-center">
						<span class="text-lg font-semibold"
							>Accept YouTube cookies?</span
						>
						<span class="text-sm text-muted-foreground"
							>Accepting this will share certain information with
							YouTube/Google; this may include tracking cookies.</span
						>
					</div>
					<div class="flex gap-1 *:cursor-pointer">
						<Button
							size="sm"
							onclick={() => (youtubeCookieConsent.value = true)}
							>Accept</Button
						>
						<Button
							size="sm"
							onclick={() => (youtubeCookieConsent.value = false)}
							>Deny</Button
						>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
