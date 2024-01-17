<script lang="ts">
	import { Button, Github, Toggle } from '@lilydev/ui';
	import { Menu } from 'lucide-svelte';

	import { slide } from 'svelte/transition';

	import { darkMode } from '$lib/stores/theme';

	let contextMenuOpen: boolean = true;

	let buttonStyles =
		'shadow-none dark:shadow-none bg-transparent dark:bg-transparent hover:bg-gray-300 hover:dark:bg-zinc-800';
</script>

<div class="flex justify-between place-items-center">
	<Button class="text-xl font-semibold btn-nav w-auto px-3 {buttonStyles}" href="/"
		>jadelily.dev</Button
	>
	<div class="flex justify-center w-full gap-3">
		<Button class="w-24 {buttonStyles}" href="/">About</Button>
		<Button class="w-24 {buttonStyles}" href="/social">Socials</Button>
		<Button class="w-24 {buttonStyles}" href="/portfolio">Portfolio</Button>
		<Button class="w-24 {buttonStyles}" href="/blog">Blog</Button>
	</div>
	<div class="relative">
		<Button class={buttonStyles} on:click={() => (contextMenuOpen = !contextMenuOpen)}>
			<Menu />
		</Button>
		{#if contextMenuOpen}
			<ul
				class="
					flex flex-col absolute
					top-[110%] right-0 py-4 px-5 rounded-lg
					border border-zinc-400 dark:border-zinc-700
					bg-gray-200 dark:bg-zinc-900
					transition-colors duration-500
					gap-1.5
				"
				transition:slide={{ duration: 200 }}
			>
				<div class="flex whitespace-nowrap gap-4 mb-1.5">
					Dark Mode
					<Toggle id="dark_toggle" bind:value={$darkMode} />
				</div>
				<div
					class="w-full border-t border-zinc-400 dark:border-zinc-600 transition-colors duration-500"
				></div>
				<a
					class="
						flex justify-center place-items-center gap-2 py-1 px-2 rounded-md
						transition-colors {buttonStyles}
					"
					href="https://github.com/jadelily18/jadelily.dev"
				>
					<Github size="19" />
					Source code
				</a>
			</ul>
		{/if}
	</div>
</div>
