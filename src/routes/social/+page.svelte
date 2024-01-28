<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';
	import { Bluesky, Github, Mastodon, Modrinth, Tooltip } from '@lilydev/ui';

	let pageTitle = 'socials';

	title.set(pageTitle);
</script>

<MetaTags
	title={$title}
	description="Jade's social media links."
	openGraph={{
		title: $title,
		description: "Jade's social media links."
	}}
/>

<div class="flex flex-col w-full place-items-center place-self-center md:px-12 my-12">
	<div class="flex flex-col place-items-center">
		<h1 class="text-5xl font-bold">Socials</h1>
		<div class="divider mt-3 mb-1"></div>
		<div class="flex">
			<Tooltip tooltip="GitHub" align="top">
				<a
					class="flex p-2.5 rounded-full hover:bg-gray-300 hover:dark:bg-zinc-800 transition-colors duration-200"
					href="https://github.com/jadelily18"
				>
					<Github size="36" />
				</a>
			</Tooltip>
			<Tooltip tooltip="Modrinth" align="top">
				<a
					class="flex p-2.5 rounded-full hover:bg-gray-300 hover:dark:bg-zinc-800 transition-colors duration-200"
					href="https://modrinth.com/user/jade"
				>
					<Modrinth size="36" />
				</a>
			</Tooltip>
			<Tooltip tooltip="Bluesky" align="top">
				<a
					class="flex p-2.5 rounded-full hover:bg-gray-300 hover:dark:bg-zinc-800 transition-colors duration-200"
					href="https://bsky.app/profile/jadelily.dev"
				>
					<Bluesky size="36" />
				</a>
			</Tooltip>
			<Tooltip tooltip="Mastodon" align="top">
				<a
					class="flex p-2.5 rounded-full hover:bg-gray-300 hover:dark:bg-zinc-800 transition-colors duration-200"
					href="https://blobfox.coffee/@jade"
				>
					<Mastodon size="36" />
				</a>
			</Tooltip>
		</div>
	</div>
</div>
