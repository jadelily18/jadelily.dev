<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';

	import PortfolioCard from '$lib/components/portfolio/PortfolioCard.svelte';

	let pageTitle = 'portfolio';

	title.set(pageTitle);
</script>

<MetaTags
	title={pageTitle}
	description="Jade Nash's software development & general work portfolio."
	openGraph={{
		title: pageTitle,
		description: "Jade Nash's software development & general work portfolio."
	}}
/>

<div class="flex flex-col w-full md:px-12 my-12 place-items-center place-self-center">
	<div class="flex flex-col w-full max-w-[65rem] place-items-center gap-6">
		<h1 class="text-4xl font-bold">Portfolio</h1>
		<hr class="w-full" />
		<div class="flex flex-col w-full gap-3">
			<PortfolioCard
				projectLink="https://jadelily.dev"
				githubUrl="https://github.com/jadelily18/jadelily.dev"
			>
				<svelte:fragment slot="header">jadelily.dev</svelte:fragment>
				This website! It uses
				<a class="link font-semibold" href="https://kit.svelte.dev">SvelteKit</a>,
				<a class="link font-semibold" href="https://tailwindcss.com">TailwindCSS</a>, and
				<a class="link font-semibold" href="https://www.skeleton.dev">Skeleton UI</a>! As
				you can see, it exists to serve as a central place for my project, blog posts, and
				anything else I decide to put here.
			</PortfolioCard>
			<PortfolioCard
				img="https://cdn.jsdelivr.net/gh/LilydevMC/assets@main/volubind/assets/icon.png"
				imgAlt="VoluBind project icon"
				githubUrl="https://github.com/LilydevMC/VoluBind"
				modrinthUrl="https://modrinth.com/mod/volubind"
			>
				<svelte:fragment slot="header">VoluBind</svelte:fragment>
				A Fabric mod for Minecraft that allows you to control your volume with keybindings! Written
				in Java, using
				<a class="link font-semibold" href="https://modrinth.com/mod/owo-lib">owo-lib</a> for
				its configuration.
			</PortfolioCard>
			<PortfolioCard
				projectLink="https://baldurs.gay"
				githubUrl="https://github.com/BaldursGay/mod-manager"
			>
				<svelte:fragment slot="header">Untitled BG3 Mod Manager</svelte:fragment>
				An unnamed mod manager for Baldur's Gate 3! This is a
				<a class="link font-semibold" href="https://tauri.app/">Tauri</a> app, using
				<a class="link font-semibold" href="https://www.rust-lang.org/">Rust</a>
				for its backend and
				<a class="link font-semibold" href="https://kit.svelte.dev">SvelteKit</a>
				as a frontend with
				<a class="link font-semibold" href="https://tailwindcss.com">TailwindCSS</a> for styling.
			</PortfolioCard>
		</div>
	</div>
</div>
