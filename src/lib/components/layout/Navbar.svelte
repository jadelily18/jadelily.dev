<script lang="ts">
	import { Button, Github, Toggle } from '@lilydev/ui';
	import { Menu } from 'lucide-svelte';

	import { slide } from 'svelte/transition';

	import { darkMode } from '$lib/stores/theme';

	let contextMenuOpen: boolean = false;

	let screenHeight: number;
	let screenWidth: number;
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

<div class="grid grid-flow-col {screenWidth >= 960 ? 'grid-cols-3' : 'grid-cols-2'}">
	<Button class="btn text-xl font-semibold px-4 w-min" href="/">jadelily.dev</Button>
	{#if screenWidth >= 960}
		<div class="flex justify-center justify-self-center w-full gap-3">
			<Button class="btn w-28" href="/">About</Button>
			<Button class="btn w-28" href="/social">Socials</Button>
			<Button class="btn w-28" href="/portfolio">Portfolio</Button>
			<Button class="btn w-28" href="/blog">Blog</Button>
		</div>
	{/if}
	<div class="relative justify-self-end">
		<Button
			class="btn"
			on:click={() => (contextMenuOpen = !contextMenuOpen)}
			aria-label="Navigation/Settings"
		>
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
					gap-1.5 z-10
				"
				transition:slide={{ duration: 200 }}
			>
				{#if screenWidth < 960}
					<div class="flex place-items-center gap-2">
						<div class="divider"></div>
						<p class="text-sm font-semibold text-zinc-500 dark:text-zinc-600">
							Navigation
						</p>
						<div class="divider"></div>
					</div>
					<Button class="btn-dropdown !justify-start" href="/">About</Button>
					<Button class="btn-dropdown !justify-start" href="/social">Socials</Button>
					<Button class="btn-dropdown !justify-start" href="/portfolio">Portfolio</Button>
					<Button class="btn-dropdown !justify-start" href="/blog">Blog</Button>
					<div class="flex place-items-center gap-2">
						<div class="divider"></div>
						<p class="text-sm font-semibold text-zinc-500 dark:text-zinc-600">Other</p>
						<div class="divider"></div>
					</div>
				{/if}
				<div class="flex whitespace-nowrap gap-4 my-1.5 {screenWidth < 960 ? 'mx-2' : ''}">
					Dark Mode
					<Toggle id="dark_toggle" class="checked:!bg-[#ea76cb]" bind:value={$darkMode} />
				</div>
				<Button
					class="btn-dropdown !justify-start"
					href="https://github.com/jadelily18/jadelily.dev"
				>
					<Github size="19" />
					Source code
				</Button>
			</ul>
		{/if}
	</div>
</div>
