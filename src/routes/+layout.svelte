<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	import { ModeWatcher } from "mode-watcher";

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
		if (navigating) {
			timeout = setTimeout(() => (showLoadingBar = true), 100);
		} else {
			clearTimeout(timeout);
			showLoadingBar = false;
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<main class="flex flex-col w-screen min-h-screen">
	{#if showLoadingBar}
		<div
			transition:fade
			class="absolute top-0 z-20 h-1 w-full bg-pink-200 animate-loading-bar"
		></div>
	{/if}
	<Navbar />
	<div class="flex flex-col items-center grow w-full">
		<div
			// class="flex justify-center w-full md:w-200 px-4 sm:px-20 2xl:px-80 grow py-2 sm:py-10"
			class="flex flex-col w-full h-full grow px-6 sm:px-20 lg:px-0 md:max-w-200 py-6 sm:py-10"
		>
			{@render children()}
		</div>
	</div>
	<Footer />
</main>
