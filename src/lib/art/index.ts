import type { GalleryItem } from "$types/art";

function getGalleryItems(): GalleryItem[] {
	const files = import.meta.glob("/src/lib/art/data/*.json", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	let items: GalleryItem[] = [];

	for (let path in files) {
		const data: Omit<GalleryItem, "id"> = JSON.parse(files[path]);
		const id = path.split("/").pop()!.replace(".json", "");

		const item: GalleryItem = {
			id,
			...data,
		};

		items.push(item);
	}

	return items.sort((a, b) => a.index - b.index);
}

export { getGalleryItems };
