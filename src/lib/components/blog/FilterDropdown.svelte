<script lang="ts">
	import { HashIcon } from "@lucide/svelte";
	import { Checkbox } from "@uilib/checkbox";
	import * as Dropdown from "@uilib/dropdown-menu";
	import { Label } from "@uilib/label";
	import type { Snippet } from "svelte";

	type Props = {
		trigger: Snippet<
			[
				{
					props: Record<string, unknown>;
				},
			]
		>;
		tags: Record<string, boolean>;
		onAddTag?: () => void;
		onRemoveTag?: () => void;
	};

	let { trigger, tags = $bindable() }: Props = $props();
</script>

<Dropdown.Root>
	<Dropdown.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Dropdown.Trigger>
	<Dropdown.Content align="end">
		<Dropdown.Group>
			<Dropdown.Label class="flex items-center gap-0.5">
				<HashIcon size="12" />
				Tags
			</Dropdown.Label>
			<div class="flex flex-col gap-1 px-2 pb-2">
				{#each Object.keys(tags) as tag}
					<div
						class="flex items-center gap-2 w-full p-1 not-data-checked:text-muted-foreground *:cursor-pointer"
						data-checked={tags[tag]}
					>
						<Checkbox
							class="bg-accent"
							id="{tag}-selected"
							checked={tags[tag]}
							onCheckedChange={(c) => (tags[tag] = c)}
						/>
						<Label class="grow" for="{tag}-selected">{tag}</Label>
					</div>
				{/each}
			</div>
		</Dropdown.Group>
	</Dropdown.Content>
</Dropdown.Root>
