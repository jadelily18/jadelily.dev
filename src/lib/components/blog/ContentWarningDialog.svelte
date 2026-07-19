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
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title
				class="inline-flex items-center gap-2 text-red-700 dark:text-destructive"
			>
				<OctagonAlertIcon />
				Content Warning
			</AlertDialog.Title>
			<AlertDialog.Description>
				This blog post contains a content warning - see below.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<div class="flex flex-col gap-4">
			<span
				class="text-red-700 dark:text-destructive bg-red-700/10 dark:bg-destructive/20 rounded-lg outline outline-destructive p-4"
			>
				{contentWarning}
			</span>
			<Label
				class="flex gap-2 items-start p-4 rounded-lg outline outline-border "
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
				class="text-red-700 dark:text-destructive"
				variant="destructive"
				onclick={acceptWarning}
			>
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
