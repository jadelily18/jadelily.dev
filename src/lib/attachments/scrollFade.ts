import type { Attachment } from "svelte/attachments";

export function scrollFade(
	size = 48,
	axis: "x" | "y" = "y",
): Attachment<HTMLElement> {
	return (node) => {
		if (
			"ScrollTimeline" in window ||
			CSS.supports("animation-timeline: scroll()")
		)
			return;

		let ticking = false;
		const update = () => {
			const scrollPos = axis === "y" ? node.scrollTop : node.scrollLeft;
			const scrollSize =
				axis === "y" ? node.scrollHeight : node.scrollWidth;
			const clientSize =
				axis === "y" ? node.clientHeight : node.clientWidth;
			const maxScroll = scrollSize - clientSize;

			const leadAmount = Math.min(scrollPos / size, 1);
			const remaining = Math.max(maxScroll - scrollPos, 0);
			const trailAmount =
				maxScroll > 0 ? Math.min(remaining / size, 1) : 0;

			const direction = axis === "y" ? "to bottom" : "to right";
			node.style.maskImage = `linear-gradient(${direction},
				rgba(0,0,0,${1 - leadAmount}) 0,
				rgba(0,0,0,1) ${size}px,
				rgba(0,0,0,1) calc(100% - ${size}px),
				rgba(0,0,0,${1 - trailAmount}) 100%)`;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(update);
				ticking = true;
			}
		};

		requestAnimationFrame(update);

		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(node);

		node.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			node.removeEventListener("scroll", onScroll);
			resizeObserver.disconnect();
		};
	};
}
