<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	import { ModeWatcher } from "mode-watcher";

	import { Navbar } from "@components/layout";
	import Footer from "@components/layout/Footer.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<main class="flex flex-col w-screen min-h-screen">
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
