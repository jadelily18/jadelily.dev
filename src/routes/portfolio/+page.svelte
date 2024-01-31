<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';

	let pageTitle = 'portfolio';

	title.set(pageTitle);
</script>

<MetaTags
	title={pageTitle}
	description="Jade Nash's software development portfolio."
	openGraph={{
		title: pageTitle,
		description: "Jade Nash's software development portfolio."
	}}
/>

<div class="flex flex-col w-full place-items-center place-self-center">
	<div class="flex flex-col text-center gap-2">
		<h1 class="text-4xl font-bold">Under construction...</h1>
		<p class="text-lg">Come back later!</p>
	</div>
</div>
