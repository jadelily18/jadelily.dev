import { getGalleryItems } from "$lib/art";

export function load() {
	return { galleryItems: getGalleryItems() };
}
