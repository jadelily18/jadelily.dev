import type { Component } from "svelte";

const pageIds = ["general", "cookies"] as const;
type SettingsPageId = (typeof pageIds)[number];
type SettingsPageType = {
	label: string;
	content: Component;
	icon: Component;
};

export type { SettingsPageId, SettingsPageType };
