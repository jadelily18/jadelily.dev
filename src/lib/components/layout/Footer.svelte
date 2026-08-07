<script lang="ts">
	import { GenericIcon, Icon } from "@components/icon";
	import FooterLink from "./FooterLink.svelte";

	const gitBaseUrl = "https://github.com/jadelily18/jadelily.dev";
	const gitSha = __GIT_COMMIT_SHA__.slice(0, 8);
	const gitBranchUrl = `${gitBaseUrl}/tree/${__GIT_BRANCH__}`;
	const gitCommitUrl = `${gitBaseUrl}/tree/${__GIT_COMMIT_SHA__}`;
	const gitLicenseUrl = `${gitBaseUrl}/blob/${__GIT_COMMIT_SHA__}/LICENSE`;
</script>

<div
	class="flex w-full flex-col items-center justify-center gap-1 py-4 text-sm text-muted-foreground"
>
	<span class="inline-flex gap-1">
		made with
		<button
			class="transition-[transform, colors] cursor-pointer duration-100 hover:text-lavender-pink-400 active:translate-y-px dark:hover:text-lilac-bush-500"
			aria-label="Secret paw button"
		>
			<Icon icon={GenericIcon.PawPrint} size="16" />
		</button>
		by
		<FooterLink href="https://github.com/jadelily18">jade</FooterLink>
	</span>
	<span class="text-xs">
		<FooterLink href={gitLicenseUrl}>MIT License</FooterLink>
		—
		<span class="inline-flex font-semibold">
			<FooterLink href={gitBranchUrl}>
				{__GIT_BRANCH__}
			</FooterLink>
			@
			<FooterLink href={gitCommitUrl}>
				{gitSha}
			</FooterLink>
		</span>
	</span>
</div>
