<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';

	let pageTitle = 'home';

	title.set(pageTitle);
</script>

<MetaTags
	title={pageTitle}
	description="Hi, I'm Jade! I'm a software developer working on lots of cool open source projects!"
	openGraph={{
		title: pageTitle,
		description:
			"Hi, I'm Jade! I'm a software developer working on lots of cool open source projects!"
	}}
/>

<div class="flex flex-col w-full place-items-center place-self-center">
	<div class="flex flex-col text-center gap-2 sm:max-w-[40rem] md:max-w-[30rem]">
		<h1 class="text-5xl font-semibold">
			<span class="text-primary-700 dark:text-primary-500 font-bold">Jade </span>
			Nash
		</h1>
		<hr />
		<p class="text-lg">
			Hello! I'm a web and general software devloper from <span class="font-semibold"
				>Owensboro, KY</span
			>, working on lots of different open source projects. You can find some of these
			<span class="line-through"
				>featured on my
				<a class="link font-semibold" href="/portfolio">portfolio</a></span
			>
			or my GitHub from my <a class="link font-semibold" href="/contact">contact</a> page!
		</p>
	</div>
</div>
