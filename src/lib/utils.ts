import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

export const getContrastColor = (hexColor: string) => {
	// Remove the hash if it exists
	const hex = hexColor.replace("#", "");

	// Convert 3-digit hex to 6-digit
	const r = parseInt(
		hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2),
		16,
	);
	const g = parseInt(
		hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4),
		16,
	);
	const b = parseInt(
		hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6),
		16,
	);

	// YIQ equation (Standard for determining perceived brightness)
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;

	return yiq >= 128 ? "text-background" : "text-foreground";
};

export const generateTimestampId = (): string => {
	const now = new Date();

	const datePart = now.toISOString().split("T")[0].replace(/-/g, ""); // 20240520
	const timePart = now.toTimeString().split(" ")[0].replace(/:/g, ""); // 143005
	const ms = now.getMilliseconds().toString().padStart(3, "0");

	// Adding a small random suffix prevents collisions if two IDs are generated in the same millisecond
	const randomSuffix = Math.random().toString(36).substring(2, 5);

	return `${datePart}-${timePart}-${ms}-${randomSuffix}`;
};

export const dateToMonthYear = (date: Date): string => {
	return date.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
};

export const dateToPeriodDisplay = (
	startDate: Date,
	endDate?: Date,
): string => {
	const periodDisplay = `${dateToMonthYear(startDate)} - ${endDate ? dateToMonthYear(endDate) : "Present"}`;
	return periodDisplay;
};

export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
};
