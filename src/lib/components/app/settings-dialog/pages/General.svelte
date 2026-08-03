<script lang="ts">
	import { appStore } from "$lib/state/app.svelte";
	import { ThemeSwitcher } from "@components/app";
	import { RotateCcwIcon } from "@lucide/svelte";
	import { Button } from "@uilib/button";
	import { Label } from "@uilib/label";
	import { Switch } from "@uilib/switch";
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<Label>Theme</Label>
		<ThemeSwitcher />
	</div>
	<div class="flex items-center gap-2">
		<Label class="flex grow cursor-pointer justify-between">
			<div class="flex flex-col gap-1">
				<span>Ignore content warnings</span>
				<p class="text-muted-foreground">
					Does not display a content warning before certain blog
					posts.
				</p>
			</div>
			<Switch
				class="cursor-pointer"
				bind:checked={
					appStore.settings.pending.general.ignoreContentWarnings
				}
			/>
		</Label>
		<Button
			class="cursor-pointer"
			variant="link"
			disabled={appStore.settings.pending.general
				.ignoreContentWarnings === false}
			onclick={() =>
				(appStore.settings.pending.general.ignoreContentWarnings = false)}
		>
			<RotateCcwIcon />
		</Button>
	</div>
</div>
