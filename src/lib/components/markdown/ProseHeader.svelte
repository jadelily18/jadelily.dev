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
	class="flex items-center no-underline hover:underline m-0 p-0"
	href="#{id}"
	aria-label="Link to this section"
>
	<svelte:element this={tag} {id} class="group relative">
		{#if id}
			<span
				class="hidden group-hover:block absolute translate-x-[-115%] h-full"
				aria-hidden="true"
			>
				<HashIcon class="h-full w-auto py-1" />
			</span>
			{@render children?.()}
		{:else}
			{@render children?.()}
		{/if}
	</svelte:element>
</a>
