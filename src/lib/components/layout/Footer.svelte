<script lang="ts">
	import PawPrint from "$lib/assets/icons/flaticon/pawprint.svg?component";

	const gitBaseUrl = "https://github.com/jadelily18/jadelily.dev";
	const gitSha = __GIT_COMMIT_SHA__.slice(0, 8);
	const gitCommitUrl = `${gitBaseUrl}/tree/${__GIT_COMMIT_SHA__}`;
	const gitLicenseUrl = `${gitBaseUrl}/blob/${__GIT_COMMIT_SHA__}/LICENSE`;

	const linkStyles = "hover:underline font-semibold";
</script>

<div
	class="flex flex-col w-full justify-center items-center py-4 text-muted-foreground text-sm gap-1"
>
	<span class="inline-flex gap-1">
		made with
		<button
			class="active:translate-y-px transition-transform duration-100 cursor-pointer"
		>
			<PawPrint class="size-4" />
		</button>
		by
		<a
			href="https://github.com/jadelily18"
			class="hover:underline"
			target="_blank">jade</a
		>
	</span>
	<span class="text-xs"
		><a href={gitLicenseUrl} class={linkStyles} target="_blank"
			>MIT License</a
		>
		—
		<a href={gitCommitUrl} class={linkStyles} target="_blank"
			>{__GIT_BRANCH__}@{gitSha}</a
		></span
	>
</div>
