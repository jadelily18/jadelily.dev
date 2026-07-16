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

	let { data } = $props();
</script>

<svelte:head>
	<title>{formatPageTitle("Blog")}</title>
</svelte:head>

<div class="flex flex-col w-full h-full grow gap-6">
	<h1 class="text-4xl font-bold">Work</h1>
	<div
		class="flex flex-wrap md:flex-nowrap w-full *:h-50 rounded-2xl border-border border overflow-hidden divide-sidebar-border"
	>
		<div
			class="flex justify-center items-center w-full min-w-80 bg-accent dark:bg-accent/75"
		>
			<div class="flex gap-2">
				<img
					class="z-10 rounded-xl outline outline-border outline-r-black outline-r-2 shadow-2xl"
					width="72"
					src={modrinthImg}
					alt="Modrinth logo"
				/>
				<img
					class="rounded-xl border border-border"
					width="72"
					src={sparkImg}
					alt="Spark Universe logo"
				/>
			</div>
			<!-- <CameraOffIcon /> -->
		</div>
		<div class="flex flex-col w-full gap-1 p-4">
			<h2 class="text-2xl font-bold hover:underline">
				Modrinth (+ Spark Universe)
			</h2>
			<span class="text-muted-foreground grow"
				>I've worked at Modrinth since</span
			>
			<div class="flex items-center justify-between">
				<span class="text-muted-foreground text-sm"
					>{dayjs(new Date("march 27 2025")).format(
						"MMM D, YYYY",
					)}</span
				>
				<!-- <div class="flex gap-1">
					{#each data.posts[0].tags as tag}
						<Tag name={tag} />
					{/each}
				</div> -->
			</div>
		</div>
	</div>
	<Separator />
	<div>things</div>
</div>
