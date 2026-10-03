<script lang="ts">
	import { HashIcon, XIcon } from "@lucide/svelte";
	import { Button } from "@uilib/button";
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

	let selectedTags = $derived<string[]>(
		Object.keys(tags).filter((t) => tags[t] === true),
	);

	function clearTags() {
		for (const tag of Object.keys(tags)) {
			tags[tag] = false;
		}
	}
</script>

<Dropdown.Root>
	<Dropdown.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Dropdown.Trigger>
	<Dropdown.Content align="end">
		<Dropdown.Group>
			<Dropdown.Label class="flex w-full items-center justify-between">
				<div class="flex items-center gap-0.5">
					<HashIcon size="12" />
					Tags
				</div>
				<Button
					data-can-clear={selectedTags.length > 0}
					class="cursor-pointer opacity-0 transition-opacity duration-200 data-[can-clear=true]:opacity-100"
					variant="destructive"
					size="xs"
					onclick={clearTags}
				>
					<XIcon />
					Clear
				</Button>
			</Dropdown.Label>
			<div class="flex flex-col gap-1 px-2 pb-2">
				{#each Object.keys(tags) as tag}
					<div
						class="flex w-full items-center gap-2 p-1 *:cursor-pointer not-data-checked:text-muted-foreground"
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
