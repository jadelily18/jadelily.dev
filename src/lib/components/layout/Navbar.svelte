<script lang="ts">
	import { Button, Github, Toggle } from '@lilydev/ui';
	import { Menu } from 'lucide-svelte';

	import { slide } from 'svelte/transition';

	import { darkMode } from '$lib/stores/theme';

	let contextMenuOpen: boolean = false;
</script>

<div class="flex justify-between place-items-center">
	<Button class=" btn text-xl font-semibold w-auto px-3" href="/">jadelily.dev</Button>
	<div class="flex justify-center w-full gap-3">
		<Button class="btn w-24" href="/">About</Button>
		<Button class="btn w-24" href="/social">Socials</Button>
		<Button class="btn w-24" href="/portfolio">Portfolio</Button>
		<Button class="btn w-24" href="/blog">Blog</Button>
	</div>
	<div class="relative">
		<Button class="btn" on:click={() => (contextMenuOpen = !contextMenuOpen)}>
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
						btn flex justify-center place-items-center gap-2
						py-1 px-2 rounded-md transition-colors
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
