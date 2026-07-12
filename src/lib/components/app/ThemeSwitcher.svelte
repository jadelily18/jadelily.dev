<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
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

{#snippet groupItem(props: ItemProps)}
	<Label for="{props.value}-mode">
		<div
			class="flex justify-between items-center w-full rounded-lg border border-border p-2"
		>
			<div class={classFromTheme(props.value)}>
				<div
					class="flex flex-col gap-1 w-16 p-2 bg-background rounded-lg border border-border"
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
				<span>{props.label}</span>
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
