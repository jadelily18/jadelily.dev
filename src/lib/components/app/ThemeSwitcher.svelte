<script lang="ts">
	import { MonitorIcon, MoonIcon, SunIcon } from "@lucide/svelte";
	import { Label } from "@uilib/label";
	import * as RadioGroup from "@uilib/radio-group";
	import { systemPrefersMode, type UserPrefersMode } from "mode-watcher";
	import { appStore } from "$lib/state/app.svelte";

	type Theme = UserPrefersMode["current"];

	type ItemProps = {
		label: string;
		value: Theme;
	};

	function previewStyle(theme: Theme): string {
		const resolved = theme === "system" ? systemPrefersMode.current : theme;
		if (!resolved) return "";
		return `--background: var(--color-background-${resolved});
			--border: var(--color-border-${resolved});
			--muted-foreground: var(--color-muted-foreground-${resolved});`;
	}
</script>

{#snippet itemIcon(theme: Theme, size: number)}
	{#if theme === "system"}
		<MonitorIcon {size} />
	{:else if theme === "dark"}
		<MoonIcon {size} />
	{:else}
		<SunIcon {size} />
	{/if}
{/snippet}

{#snippet groupItem(props: ItemProps)}
	<Label for="{props.value}-mode">
		<div
			data-selected={appStore.settings.pending.general.theme ===
				props.value}
			class="group/radio-item flex w-full items-center justify-between rounded-lg border border-border bg-transparent p-2 transition-colors duration-100 data-[selected=true]:bg-accent"
		>
			<div style={previewStyle(props.value)}>
				<div
					class="flex w-16 flex-col gap-1 rounded-sm border border-border bg-background p-2"
				>
					<div
						class="h-2 w-[70%] rounded-full bg-muted-foreground"
					></div>
					<div
						class="h-2 w-full rounded-full bg-muted-foreground/60"
					></div>
				</div>
			</div>
			<div class="flex gap-2">
				<span
					class="inline-flex items-center gap-1.5 text-muted-foreground group-data-[selected=true]/radio-item:text-foreground"
				>
					{@render itemIcon(props.value, 16)}
					{props.label}
				</span>
				<RadioGroup.Item id="{props.value}-mode" value={props.value} />
			</div>
		</div>
	</Label>
{/snippet}

<RadioGroup.Root
	class="flex w-full flex-col gap-1"
	bind:value={appStore.settings.pending.general.theme}
>
	{@render groupItem({ label: "System", value: "system" })}
	{@render groupItem({ label: "Dark", value: "dark" })}
	{@render groupItem({ label: "Light", value: "light" })}
</RadioGroup.Root>
