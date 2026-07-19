<script lang="ts">
	import { cn } from "$lib/shadcn/utils";
	import { ignoreContentWarnings } from "$lib/state/warning.svelte";
	import { Label } from "@uilib/label";
	import { Switch } from "@uilib/switch";

	type Props = {
		label?: string;
		class?: string;
	};

	let { label = "Ignore warnings", class: className }: Props = $props();
</script>

<div
	data-checked={ignoreContentWarnings.value}
	class={cn("inline-flex pb-4 gap-2 group/content-warning", className)}
>
	<Switch id="ignore-warnings" bind:checked={ignoreContentWarnings.value} />
	<Label
		for="ignore-warnings"
		class="transition-colors duration-100 text-muted-foreground group-data-[checked=true]/content-warning:text-foreground"
	>
		{label}
	</Label>
</div>
