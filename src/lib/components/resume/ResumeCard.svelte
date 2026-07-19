<script lang="ts">
	import type { ResumeItem } from "$types/resume";
	import { Markdown } from "@components/markdown";

	let { resume }: { resume: ResumeItem } = $props();
</script>

<div
	class="flex flex-col gap-4 p-4 rounded-2xl border border-border shadow-md/5"
>
	<div class="flex gap-4">
		<img
			class="h-16 rounded-md border border-border shadow-md"
			src={resume.image}
			alt={resume.imageAlt}
		/>
		<div class="flex flex-col">
			<span class="text-xs text-muted-foreground">
				{resume.date}
			</span>
			<span class="text-lg font-semibold">{resume.title}</span>
			<span class="text-sm text-muted-foreground">{resume.role}</span>
		</div>
	</div>
	<Markdown class="markdown" markdown={resume.content} />
</div>
