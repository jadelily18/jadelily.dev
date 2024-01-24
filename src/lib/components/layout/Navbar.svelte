<script lang="ts">
	import { Button, Github, Toggle } from '@lilydev/ui';
	import { Menu } from 'lucide-svelte';

	import { slide, fade } from 'svelte/transition';

	import { darkMode } from '$lib/stores/theme';

	let contextMenuOpen: boolean = false;

	let screenHeight: number;
	let screenWidth: number;
</script>

<svelte:window bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

<div class="flex justify-between place-items-center">
	<Button class=" btn text-xl font-semibold w-auto px-3" href="/">jadelily.dev</Button>
	{#if screenWidth >= 960}
		<div class="flex justify-center w-full gap-3" transition:fade>
			<Button class="btn w-24" href="/">About</Button>
			<Button class="btn w-24" href="/social">Socials</Button>
			<Button class="btn w-24" href="/portfolio">Portfolio</Button>
			<Button class="btn w-24" href="/blog">Blog</Button>
		</div>
	{/if}
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
					<Toggle id="dark_toggle" bind:value={$darkMode} />
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
