import type { GalleryItem } from "$types/art";

const galleryItems: Record<string, GalleryItem> = {
	em_pawlaxy: {
		title: "Em icon",
		description: "The main general-purpose avatar I use for Em!",
		alt: 'Emery, a pink and white dog-fox with her eyes closed and tongue out making a silly face. She is wearing a collar with a heart-shaped pendant that says "Em."',
		src: "/gallery/em_pawlaxy_icon.png",
		attribution: {
			label: "Art by @painic",
			url: "https://vgen.co/painic",
		},
	},
	em_pawlaxy_mr: {
		title: "Em icon (Modrinth variant)",
		description:
			"Em's Modrinth-themed avatar. This is what I use on Modrinth, the Modrinth Discord server, and other Modrinth-related places.",
		alt: 'Emery, a pink and white dog-fox looking into the camera with her head tilted and a Modrinth logo in her mouth. The irises of her eyes are blue and her pupils are pink and heart-shaped. She is wearing a collar with a heart-shaped pendant that says "Em."',
		src: "/gallery/em_pawlaxy_icon_mr.jpeg",
		attribution: {
			label: "Art by @painic",
			url: "https://vgen.co/painic",
		},
	},
	em_sempaksiete: {
		title: "Em banner",
		description:
			"The banner of Em I use where supported (Discord, Bluesky, etc.)",
		alt: "Emery, a pink and white dog-fox laying on clouds. The sky and clouds are very warmly colored. Em is wearing a white sundress.",
		src: "/gallery/em_sempaksiete_banner.png",
		attribution: {
			label: "Art by @sempaksiete",
			url: "https://vgen.co/sempaksiete",
		},
		offset: {
			x: 80,
		},
	},
	remy_merie_icon: {
		title: "Remy icon",
		description: "Remy's avatar.",
		alt: "Remy, a fluffy, gray, orange, and white fox. She looks angry and has a slightly damaged left ear.",
		src: "/gallery/remy_merie_icon.png",
		attribution: {
			label: "Art by @SillyGoaty",
			url: "https://vgen.co/SillyGoaty",
		},
	},
	remy_merie_banner: {
		title: "Remy banner",
		description: "Remy's banner.",
		alt: "Remy, a fluffy, gray, orange, and white fox. She is in her bed, laying on her stomach, listening to music on a laptop. Outside the window is a view of city buildings at dusk. There are posters of various Linkin Park albums on her purple wall. To the left, there is a desk with a desktop computer, a keyboard, and a mouse with a chair in front.",
		src: "/gallery/remy_merie_banner.png",
		attribution: {
			label: "Art by @SillyGoaty",
			url: "https://vgen.co/SillyGoaty",
		},
		offset: {
			x: 65,
		},
	},
} as const;

export { galleryItems };
