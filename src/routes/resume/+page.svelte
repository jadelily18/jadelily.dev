<script lang="ts">
	import { formatPageTitle } from "$lib/utils";
	import { Meta } from "@components/app";

	import { ResumeCard } from "@components/resume";
	import { Skeleton } from "@uilib/skeleton";

	let { data } = $props();
</script>

<Meta title={formatPageTitle("Resume")} />

<div class="flex flex-col w-full h-full grow gap-6">
	<h1 class="text-4xl font-bold">Resume</h1>
	<div class="grid grid-cols-1 gap-2">
		{#await data.resumeItems}
			<div
				class="flex flex-col gap-4 p-4 rounded-lg border border-border"
			>
				<div class="flex items-center gap-4">
					<Skeleton class="size-16 rounded-lg" />
					<div class="flex flex-col gap-1">
						<Skeleton class="h-2.5 w-30" />
						<Skeleton class="h-6 w-24" />
						<Skeleton class="h-4 w-48" />
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<Skeleton class="h-5 w-[90%]" />
					<Skeleton class="h-5 w-[64%]" />
					<Skeleton class="h-5 w-[80%]" />
				</div>
				<div class="flex flex-col gap-2">
					<Skeleton class="h-5 w-[96%]" />
					<Skeleton class="h-5 w-[76%]" />
				</div>
			</div>
		{:then resumeItems}
			{#each resumeItems as resume}
				<ResumeCard {resume} />
			{/each}
		{/await}
	</div>
	<!-- <div
		class="flex flex-wrap md:flex-nowrap w-full *:h-50 rounded-2xl border-border border overflow-hidden divide-sidebar-border"
	>
		<img
			class="flex justify-center items-center w-full min-w-80 bg-accent dark:bg-accent/75 object-cover"
			src={modrinthSparkImg}
			alt="modrinth and spark universe logos"
		/>
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
			</div>
		</div>
	</div> -->
	<!-- <Separator />
	<div>things</div> -->
</div>
