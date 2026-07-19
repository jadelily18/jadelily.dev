<script lang="ts">
	import { ignoreContentWarnings } from "$lib/state/warning.svelte";
	import { OctagonAlertIcon } from "@lucide/svelte";

	import * as AlertDialog from "@uilib/alert-dialog";
	import { Button } from "@uilib/button";
	import { Checkbox } from "@uilib/checkbox";
	import { Label } from "@uilib/label";

	type Props = {
		open?: boolean;
		contentWarning?: string;
	};

	let { open = $bindable(), contentWarning }: Props = $props();

	let hideForever = $state<boolean>(false);

	function acceptWarning() {
		if (hideForever) {
			ignoreContentWarnings.value = true;
		}
		open = false;
	}
</script>

<AlertDialog.Root {open}>
	<AlertDialog.Content class="gap-5">
		<AlertDialog.Header class="place-items-start">
			<AlertDialog.Title
				class="inline-flex items-center gap-2 text-red-700 dark:text-destructive"
			>
				<OctagonAlertIcon />
				Content Warning
			</AlertDialog.Title>
			<AlertDialog.Description class="text-left">
				This blog post contains a content warning - see below.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<div class="flex flex-col gap-4">
			<span
				class="text-red-700 dark:text-destructive bg-red-700/15 dark:bg-destructive/20 rounded-lg outline outline-destructive p-4"
			>
				{contentWarning}
			</span>
			<Label
				data-checked={hideForever}
				class="flex gap-2 items-start p-4 rounded-lg outline outline-border transition-colors duration-100 data-checked:bg-accent"
			>
				<Checkbox
					class="bg-accent shadow-lg"
					bind:checked={hideForever}
				/>
				<div class="flex flex-col gap-1">
					<span>Remember this</span>
					<span class="text-muted-foreground">
						This will permanently ignore content warnings across the
						site.
					</span>
				</div>
			</Label>
		</div>
		<AlertDialog.Footer>
			<Button variant="default" onclick={() => history.back()}
				>Go back</Button
			>
			<AlertDialog.Action
				class="text-red-700 dark:text-destructive not-dark:bg-red-700/15 not-dark:hover:bg-red-600/20 dark:bg-destructive/20"
				variant="destructive"
				onclick={acceptWarning}
			>
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
