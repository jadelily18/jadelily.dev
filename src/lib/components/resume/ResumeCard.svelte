<script lang="ts">
	import type { ResumeItem } from "$types/resume";
	import { Markdown } from "@components/markdown";

	let { resume }: { resume: ResumeItem } = $props();
</script>

<div
	class="flex flex-col gap-4 rounded-2xl border border-border p-4 shadow-md/5"
>
	<div class="flex gap-4">
		<div class="relative h-16 w-36 *:h-16 *:w-16">
			<img
				class="absolute left-0 z-20 rounded-md shadow-[8px_0px_10px_-2px_rgba(0,0,0,0.4)] outline outline-border"
				src={resume.image}
				alt={resume.imageAlt}
			/>
			<img
				class="absolute left-10 z-10 rounded-md shadow-[8px_0px_10px_-2px_rgba(0,0,0,0.4)] outline outline-border"
				src="/brand/spark_universe.webp"
				alt="spark universe logo"
			/>
			<img
				class="absolute left-20 rounded-md shadow-md outline outline-border"
				src="/brand/modrinth_pride.png"
				alt="modrinth pride badge"
			/>
		</div>
		<div class="flex flex-col">
			<span class="text-xs text-muted-foreground">
				August 2023–January 2024 • March 2025–Current
			</span>
			<span class="text-lg font-semibold">Modrinth / Spark Universe</span>
			<span class="text-sm text-muted-foreground">
				Content Moderation & Community Team
			</span>
		</div>
	</div>
	<Markdown class="markdown" markdown={resume.content} />
</div>
