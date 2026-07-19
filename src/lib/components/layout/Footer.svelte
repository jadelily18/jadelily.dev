<script lang="ts">
	import PawPrint from "$lib/assets/icons/flaticon/pawprint.svg?component";
	import { cn } from "$lib/shadcn/utils";

	const gitBaseUrl = "https://github.com/jadelily18/jadelily.dev";
	const gitSha = __GIT_COMMIT_SHA__.slice(0, 8);
	const gitCommitUrl = `${gitBaseUrl}/tree/${__GIT_COMMIT_SHA__}`;
	const gitLicenseUrl = `${gitBaseUrl}/blob/${__GIT_COMMIT_SHA__}/LICENSE`;

	const linkStyles = "hover:underline font-semibold";
	const linkColorStyles =
		"hover:text-lavender-pink-400 dark:hover:text-lilac-bush-500";
</script>

<div
	class="flex flex-col w-full justify-center items-center py-4 text-muted-foreground text-sm gap-1"
>
	<span class="inline-flex gap-1">
		made with
		<button
			class={cn(
				"active:translate-y-px transition-[transform, colors] duration-100 cursor-pointer",
				linkColorStyles,
			)}
			aria-label="Secret paw button"
		>
			<PawPrint class="size-4" />
		</button>
		by
		<a
			href="https://github.com/jadelily18"
			class={cn(
				"hover:underline transition-colors duration-100",
				linkColorStyles,
			)}
			target="_blank"
		>
			jade
		</a>
	</span>
	<span class="text-xs"
		><a
			href={gitLicenseUrl}
			class={cn(
				"transition-colors duration-100",
				linkStyles,
				linkColorStyles,
			)}
			target="_blank"
		>
			MIT License
		</a>
		—
		<a
			href={gitCommitUrl}
			class={cn(
				"transition-colors duration-100",
				linkStyles,
				linkColorStyles,
			)}
			target="_blank"
		>
			{__GIT_BRANCH__}@{gitSha}
		</a>
	</span>
</div>
