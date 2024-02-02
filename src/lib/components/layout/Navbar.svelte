<script lang="ts">
	import { Github } from '@lilydev/ui';
	import { Menu } from 'lucide-svelte';

	import { darkMode } from '$lib/stores/theme';
	import { SlideToggle, type PopupSettings, popup } from '@skeletonlabs/skeleton';

	let contextMenuOpen: boolean = false;

	let screenHeight: number;
	let screenWidth: number;

	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'navMenu',
		placement: 'bottom',
		closeQuery: '#navMenu'
	};
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

<div
	class="
		card flex flex-col z-10 px-3 py-4
	"
	data-popup="navMenu"
>
	{#if screenWidth < 960}
		<div class="flex place-items-center gap-2">
			<div class="divider"></div>
			<p class="text-sm font-semibold text-zinc-500 dark:text-zinc-600">Navigation</p>
			<div class="divider"></div>
		</div>
		<ul class="list-nav my-1">
			<li>
				<a class="btn-sm transition-colors" href="/">About</a>
			</li>
			<li>
				<a class="btn-sm transition-colors" href="/contact">Contact</a>
			</li>
			<li>
				<a class="btn-sm transition-colors" href="/portfolio">Portfolio</a>
			</li>
			<li>
				<a class="btn-sm transition-colors" href="/blog">Blog</a>
			</li>
		</ul>
		<div class="flex place-items-center gap-2">
			<div class="divider"></div>
			<p class="text-sm font-semibold text-zinc-500 dark:text-zinc-600">Other</p>
			<div class="divider"></div>
		</div>
	{/if}
	<div
		class="flex justify-center whitespace-nowrap gap-4 my-1.5 {screenWidth < 960 ? 'mx-2' : ''}"
	>
		Dark Mode
		<SlideToggle
			background="bg-surface-200"
			active="bg-primary-500"
			name="dark_toggle"
			bind:checked={$darkMode}
			size="sm"
		/>
	</div>
	<a
		class="btn flex gap-2 hover:bg-primary-500/35 dark:hover:bg-primary-500/20 rounded-lg transition-colors !justify-start"
		href="https://github.com/jadelily18/jadelily.dev"
	>
		<Github size="19" />
		Source code
	</a>
</div>

<div class="grid grid-flow-col {screenWidth >= 960 ? 'grid-cols-3' : 'grid-cols-2'}">
	<a
		class="btn-sm text-xl font-semibold hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors w-min"
		href="/">jadelily.dev</a
	>
	{#if screenWidth >= 960}
		<div class="flex justify-center justify-self-center place-self-center w-full gap-3">
			<a
				class="btn-sm h-min hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors"
				href="/">About</a
			>
			<a
				class="btn-sm h-min hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors"
				href="/contact">Contact</a
			>
			<a
				class="btn-sm h-min hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors"
				href="/portfolio">Portfolio</a
			>
			<a
				class="btn-sm h-min hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors"
				href="/blog">Blog</a
			>
		</div>
	{/if}
	<div class="relative justify-self-end">
		<button
			class="btn-icon hover:variant-soft-primary hover:shadow-sm dark:hover:shadow-none rounded-lg transition-colors"
			on:click={() => (contextMenuOpen = !contextMenuOpen)}
			aria-label="Navigation/Settings"
			id="navMenu"
			use:popup={popupSettings}
		>
			<Menu />
		</button>
	</div>
</div>
