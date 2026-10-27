<script lang="ts">
	import "./layout.css";

	import { ModeWatcher } from "mode-watcher";

	import * as Tooltip from "@uilib/tooltip";

	import { Navbar } from "@components/layout";
	import Footer from "@components/layout/Footer.svelte";

	import { onNavigate } from "$app/navigation";
	import { navigating } from "$app/state";
	import { fade } from "svelte/transition";

	onNavigate((navigation) => {
		// avoid fuckass view transitions when tag filtering in blog
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
			return;
		}

		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let { children } = $props();

	let showLoadingBar = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		if (navigating.to) {
			timeout = setTimeout(() => (showLoadingBar = true), 100);
		} else {
			clearTimeout(timeout);
			showLoadingBar = false;
		}
	});
</script>

<ModeWatcher />
<Tooltip.Provider>
	<main class="flex min-h-screen w-screen flex-col">
		{#if showLoadingBar}
			<div
				transition:fade
				class="absolute top-0 z-9999 h-1 w-full animate-loading-bar bg-lavender-pink-400 dark:bg-lilac-bush-500"
			></div>
		{/if}
		<Navbar />
		<div class="flex w-full grow flex-col items-center">
			<div
				class="flex h-full w-full grow flex-col px-6 py-6 sm:px-20 sm:py-10 md:max-w-200 lg:px-0"
			>
				{@render children()}
			</div>
		</div>
		<Footer />
	</main>
</Tooltip.Provider>
