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
	<div class="flex flex-col text-center gap-2">
		<h1 class="text-4xl font-bold">Under construction...</h1>
		<p class="text-lg">Come back later!</p>
	</div>
</div>
