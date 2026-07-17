import { getResumeItems } from "$lib/resume";

export function load() {
	return { resumeItems: getResumeItems() };
}
