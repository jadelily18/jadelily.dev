<script lang="ts">
	import { HashIcon } from "@lucide/svelte";
	import type { Snippet } from "svelte";

	let {
		tag,
		id,
		children,
	}: {
		tag: string;
		id?: string;
		children?: Snippet;
	} = $props();
</script>

<a
	class="m-0 flex items-center p-0 no-underline hover:underline"
	href="#{id}"
	aria-label="Link to this section"
>
	<svelte:element this={tag} {id} class="group/header relative">
		{#if id}
			<span
				class="absolute hidden h-full translate-x-[-115%] group-hover/header:block"
				aria-hidden="true"
			>
				<HashIcon class="h-full w-auto py-1" aria-hidden="true" />
			</span>
			{@render children?.()}
		{:else}
			{@render children?.()}
		{/if}
	</svelte:element>
</a>
