import type { ResumeItem } from "$types/resume";
import matter from "gray-matter";

async function getResumeItem(id: string): Promise<ResumeItem | undefined> {
	const items = await getResumeItems();
	return items.find((p) => p.id === id);
}

async function getResumeItems(): Promise<ResumeItem[]> {
	const files = import.meta.glob("/src/lib/resume/data/*.md", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	let resumeItems: ResumeItem[] = [];

	for (let path in files) {
		const { data, content } = matter(files[path]);

		const id = path.split("/").pop()!.replace(".md", "");

		const item = {
			id,
			title: data.title,
			date: data.date,
			role: data.role,
			image: data.image,
			imageAlt: data.imageAlt,
			index: data.index,
			content,
		} satisfies ResumeItem;

		resumeItems.push(item);
	}

	return resumeItems.sort((a, b) => b.index - a.index);
}

export { getResumeItem, getResumeItems };
