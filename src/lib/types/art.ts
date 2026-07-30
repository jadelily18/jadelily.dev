type GalleryItem = {
	id: string;
	index: number;
	title: string;
	description: string;
	src: string;
	alt: string;
	attribution: {
		label: string;
		url: string;
	};
	/** Image offset for gallery view (x, y) */
	offset?: {
		/** Offset on the x axis (percentage; default 50) */
		x?: number;
		/** Offset on the y axis (percentage; default 50				) */
		y?: number;
	};
};

export type { GalleryItem };
