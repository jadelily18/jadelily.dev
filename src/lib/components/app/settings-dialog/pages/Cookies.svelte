<script lang="ts">
	import { youtubeCookieConsent } from "$lib/state/cookieConsent.svelte";
	import { RotateCcwIcon } from "@lucide/svelte";
	import { Button } from "@uilib/button";
	import { Label } from "@uilib/label";
	import { Switch } from "@uilib/switch";

	function handleCheckedChange(checked: boolean) {
		youtubeCookieConsent.value = checked;
	}
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
				onCheckedChange={handleCheckedChange}
			/>
		</Label>
		<Button
			class="cursor-pointer"
			variant="link"
			disabled={youtubeCookieConsent.value === undefined}
			onclick={() => (youtubeCookieConsent.value = undefined)}
		>
			<RotateCcwIcon />
		</Button>
	</div>
</div>
