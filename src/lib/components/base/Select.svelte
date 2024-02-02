<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { ChevronDown } from 'lucide-svelte';

	import type { SelectItem } from '$lib/types/base';

	export let value: any | undefined;
	export let id: string;
	export let align: 'top' | 'bottom' | 'left' | 'right' = 'top';
	export let globalClass: string | undefined = undefined;

	export let items: SelectItem[];

	let popupSettings: PopupSettings = {
		event: 'click',
		target: id,
		placement: align,
		closeQuery: `#${id}`
	};

	let label: string;

	// $: items.forEach((item) => {
	// 	if (value === item.value) {
	// 		label = item.label;
	// 	}
	// });
</script>

<div class="card rounded-lg py-2 px-1.5 {globalClass}" data-popup={id}>
	<ListBox
		rounded="rounded-full"
		active="
			bg-primary-500/35 dark:variant-soft-primary dark:!text-zinc-100
		"
	>
		{#each items as item}
			<ListBoxItem
				class="rounded-lg transition-colors"
				bind:group={value}
				name="medium"
				value={item.value}
			>
				{item.label}
			</ListBoxItem>
		{/each}
	</ListBox>
</div>

<button
	{...$$restProps}
	class="
		btn-icon hover:variant-soft-primary
		hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors
		{$$restProps.class} {globalClass}
	"
	use:popup={popupSettings}
	{id}
>
	<slot name="icon" />
</button>
