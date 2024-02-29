<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';
	import { Bluesky, Discord, Github, Mastodon, Modrinth, Tooltip } from '@lilydev/ui';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Mail } from 'lucide-svelte';

	let pageTitle = 'socials';

	title.set(pageTitle);

	let popupContentStyle = '';

	const githubPopup: PopupSettings = {
		event: 'hover',
		target: 'githubTooltip',
		placement: 'top'
	};
	const modrinthPopup: PopupSettings = {
		event: 'hover',
		target: 'modrinthTooltip',
		placement: 'top'
	};
	const blueskyPopup: PopupSettings = {
		event: 'hover',
		target: 'blueskyTooltip',
		placement: 'top'
	};
	const mastodonPopup: PopupSettings = {
		event: 'hover',
		target: 'mastodonTooltip',
		placement: 'top'
	};
</script>

<MetaTags
	title={$title}
	description="Jade's social media links."
	openGraph={{
		title: $title,
		description: "Jade's social media links."
	}}
/>

<div class="card p-2 variant-filled-surface rounded-lg shadow-xl" data-popup="githubTooltip">
	<p>GitHub</p>
	<div class="arrow variant-filled-surface"></div>
</div>
<div class="card p-2 variant-filled-surface rounded-lg shadow-xl" data-popup="modrinthTooltip">
	<p>Modrinth</p>
	<div class="arrow variant-filled-surface"></div>
</div>
<div class="card p-2 variant-filled-surface rounded-lg shadow-xl" data-popup="blueskyTooltip">
	<p>Bluesky</p>
	<div class="arrow variant-filled-surface"></div>
</div>
<div class="card p-2 variant-filled-surface rounded-lg shadow-xl" data-popup="mastodonTooltip">
	<p>Mastodon</p>
	<div class="arrow variant-filled-surface"></div>
</div>

<div class="flex flex-col w-full place-items-center place-self-center md:px-12 my-12">
	<div class="flex flex-col place-items-center gap-2">
		<h1 class="text-5xl font-bold">Contact</h1>
		<hr class="w-full" />
		<div class="flex mt-1.5">
			<a
				class="btn-sm flex place-items-center hover:variant-soft-primary rounded-lg gap-2 transition-all"
				href="mailto:jade@lilydev.com"
			>
				<Mail size="24" />
				<span class="text-lg">jade@lilydev.com</span>
			</a>
			<a
				class="btn-sm flex place-items-center hover:variant-soft-primary rounded-lg gap-2 transition-all"
				href="https://discord.com/users/175371646515937281"
			>
				<Discord size="24" />
				<span class="text-lg">jade.gay</span>
			</a>
		</div>
		<!-- <hr class="w-full" /> -->
		<div class="flex gap-1">
			<a
				class="btn-icon btn-icon-lg dark:hover:bg-surface-700"
				href="https://github.com/jadelily18"
				use:popup={githubPopup}
			>
				<Github size="36" />
			</a>
			<a
				class="btn-icon btn-icon-lg dark:hover:bg-surface-700"
				href="https://modrinth.com/user/jade"
				use:popup={modrinthPopup}
			>
				<Modrinth size="36" />
			</a>
			<a
				class="btn-icon btn-icon-lg dark:hover:bg-surface-700"
				href="https://bsky.app/profile/jadelily.dev"
				use:popup={blueskyPopup}
			>
				<Bluesky size="36" />
			</a>
			<a
				class="btn-icon btn-icon-lg dark:hover:bg-surface-700"
				href="https://blobfox.coffee/@jade"
				use:popup={mastodonPopup}
			>
				<Mastodon size="36" />
			</a>
		</div>
	</div>
</div>
