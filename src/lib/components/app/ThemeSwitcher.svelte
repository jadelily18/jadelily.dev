<script lang="ts">
	import { MonitorIcon, MoonIcon, SunIcon } from "@lucide/svelte";
	import { Label } from "@uilib/label";
	import * as RadioGroup from "@uilib/radio-group";
	import { setMode, userPrefersMode } from "mode-watcher";

	type Theme = "system" | "dark" | "light";

	type ItemProps = {
		label: string;
		value: Theme;
	};

	function classFromTheme(theme: Theme): string {
		switch (theme) {
			case "system":
				return "";
			case "dark":
				return "force-dark";
			case "light":
				return "force-light";
		}
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
			data-selected={userPrefersMode.current === props.value}
			class="flex justify-between items-center w-full rounded-lg border border-border p-2 group/radio-item bg-transparent data-[selected=true]:bg-accent transition-colors duration-100"
		>
			<div class={classFromTheme(props.value)}>
				<div
					class="flex flex-col gap-1 w-16 p-2 bg-background rounded-sm border border-border"
				>
					<div
						class="w-[70%] h-2 rounded-full bg-muted-foreground"
					></div>
					<div
						class="w-full h-2 rounded-full bg-muted-foreground/60"
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
	class="flex flex-col w-full gap-1"
	bind:value={userPrefersMode.current}
>
	{@render groupItem({ label: "System", value: "system" })}
	{@render groupItem({ label: "Dark", value: "dark" })}
	{@render groupItem({ label: "Light", value: "light" })}
</RadioGroup.Root>
