const alertTypes = ["note", "tip", "important", "warning", "caution"] as const;
type AlertType = (typeof alertTypes)[number];

function isAlertType(value: unknown): value is AlertType {
	return (
		typeof value === "string" &&
		(alertTypes as readonly string[]).includes(value)
	);
}

export { alertTypes, isAlertType, type AlertType };
