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

<div class="flex flex-col justify-center items-center gap-4 grow">
	<div class="flex flex-col items-center">
		<span class="inline-flex items-center text-4xl font-bold gap-1">
			{#if page.status === 404}
				4<PawPrint class="size-8" />4
			{:else}
				{page.status}
			{/if}
		</span>
		<span class="text-muted-foreground">{page.error?.message}</span>
	</div>
	<Button
		variant="outline"
		class="text-muted-foreground cursor-pointer"
		size="xs"
		onclick={() => history.back()}
	>
		<ChevronLeftIcon />
		Go back
	</Button>
</div>
