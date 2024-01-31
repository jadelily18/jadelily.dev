<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { ChevronDown } from 'lucide-svelte';

	import type { SelectItem } from '$lib/types/base';

	export let value: any | undefined;
	export let placeholder: string;
	export let id: string;
	export let align: 'top' | 'bottom' = 'top';
	export let globalClass: string | undefined = undefined;

	export let items: SelectItem[];

	let popupSettings: PopupSettings = {
		event: 'click',
		target: id,
		placement: align,
		closeQuery: `#${id}`
	};

	let label: string;

	$: items.forEach((item) => {
		if (value === item.value) {
			label = item.label;
		}
	});
</script>

<div class="card rounded-lg py-2 px-1.5 {globalClass}" data-popup={id}>
	<ListBox
		rounded="rounded-full"
		active="
			bg-primary-500/55 dark:variant-filled-primary dark:!text-zinc-100
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
		btn flex flex-row variant-filled dark:bg-surface-700/75 dark:text-zinc-200
		justify-between rounded-lg transition-all dark:shadow-xl
		{$$restProps.class} {globalClass}
	"
	use:popup={popupSettings}
	{id}
>
	<span>{value === undefined ? placeholder : label}</span>
	<ChevronDown size="22" />
</button>
