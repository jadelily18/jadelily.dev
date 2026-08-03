<script lang="ts">
	import { appStore } from "$lib/state/app.svelte";
	import { RotateCcwIcon } from "@lucide/svelte";
	import { Button } from "@uilib/button";
	import { Label } from "@uilib/label";
	import { Switch } from "@uilib/switch";
</script>

<div class="flex flex-col">
	<div class="flex gap-2">
		<Label class="flex grow cursor-pointer justify-between">
			<div class="flex flex-col gap-1">
				<span>Allow YouTube cookies</span>
				<p class="text-muted-foreground">
					Required for YouTube videos to play.
				</p>
			</div>
			<Switch
				class="cursor-pointer"
				bind:checked={
					() =>
						appStore.settings.pending.cookies.allowYoutubeCookies ??
						false,
					(checked) =>
						(appStore.settings.pending.cookies.allowYoutubeCookies =
							checked)
				}
			/>
		</Label>
		<!-- probably should only be here for debug purposes -->
		<Button
			class="cursor-pointer"
			variant="link"
			disabled={appStore.settings.pending.cookies.allowYoutubeCookies ===
				undefined}
			onclick={() =>
				(appStore.settings.pending.cookies.allowYoutubeCookies =
					undefined)}
		>
			<RotateCcwIcon />
		</Button>
	</div>
</div>
