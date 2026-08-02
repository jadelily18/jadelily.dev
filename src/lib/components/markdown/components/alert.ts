import type { Component, ComponentProps } from "svelte";
import { alertTypes, type AlertType } from "$types/alert";
import { Alert } from "@components/base";
import { withProps } from "$lib/utils/svelte";

type AlertComponent = Component<Omit<ComponentProps<typeof Alert>, "type">>;

const alerts = Object.fromEntries(
	alertTypes.map((type) => [type, withProps(Alert, { type })]),
) as Record<AlertType, AlertComponent>;

export { alerts };
