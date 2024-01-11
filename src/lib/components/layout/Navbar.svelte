<script lang="ts">
	import { Menu } from 'lucide-svelte';
</script>

<div class="flex justify-between place-items-center">
	<a class="text-xl font-semibold btn-nav w-auto px-3 hover:bg-zinc-800" href="/">jadelily.dev</a>
	<div class="flex justify-center w-full gap-3">
		<a class="btn-nav w-24" href="/">About</a>
		<a class="btn-nav w-24" href="/social">Socials</a>
		<a class="btn-nav w-24" href="/portfolio">Portfolio</a>
		<a class="btn-nav w-24" href="/blog">Blog</a>
	</div>
	<button class="btn-nav">
		<Menu />
	</button>
</div>
