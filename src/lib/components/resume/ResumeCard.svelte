<script lang="ts">
	import {
		CameraOffIcon,
		FileIcon,
		HashIcon,
		StarIcon,
	} from "@lucide/svelte";

	import * as Empty from "@uilib/empty";
	import { Separator } from "@uilib/separator";
	import { cn } from "$lib/shadcn/utils";

	import { Tag } from "@components/blog";
	import type { Post } from "$types/blog";

	import dayjs from "dayjs";
	import { formatPageTitle } from "$lib/utils";

	import modrinthImg from "$lib/assets/images/brand/modrinth_discord.webp";
	import sparkImg from "$lib/assets/images/brand/spark_icon_TEMP.png";

	import modrinthSparkImg from "$lib/assets/images/brand/modrinth_joins_spark.webp";
	import type { ResumeItem } from "$types/resume";
	import { Comark } from "@comark/svelte";

	let { resume }: { resume: ResumeItem } = $props();
</script>

<div
	class="flex flex-col gap-4 p-4 rounded-lg border border-border shadow-md/5"
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
	<Comark class="markdown" markdown={resume.content} />
</div>
