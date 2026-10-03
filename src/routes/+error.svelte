<script lang="ts">
	import { page } from "$app/state";
	import { formatPageTitle } from "$lib/utils";

	import PawPrint from "$lib/assets/icons/flaticon/pawprint.svg?component";
	import { Button } from "@uilib/button";
	import { ChevronLeftIcon } from "@lucide/svelte";
</script>

<svelte:head>
	<title>{formatPageTitle(`Error ${page.status}`, page.error?.message)}</title
	>
</svelte:head>

<div class="flex grow flex-col items-center justify-center gap-4">
	<div class="flex flex-col items-center">
		<span
			class="inline-flex items-center gap-1 text-4xl font-bold"
			aria-label="404 error"
		>
			{#if page.status === 404}
				4<PawPrint class="size-8" aria-hidden="true" />4
			{:else}
				{page.status}
			{/if}
		</span>
		<span class="text-muted-foreground">{page.error?.message}</span>
	</div>
	<Button
		variant="outline"
		class="cursor-pointer text-muted-foreground"
		size="xs"
		onclick={() => history.back()}
	>
		<ChevronLeftIcon />
		Go back
	</Button>
</div>
