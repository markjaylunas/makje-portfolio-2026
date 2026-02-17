import type React from "react";
import type { SVGProps } from "react";
import { GithubIcon } from "@/assets/icons/github";
import { GoogleIcon } from "@/assets/icons/google";
import { LinkedinIcon } from "@/assets/icons/linkedin";
import { cn } from "@/lib/utils";

// Define icon components as functions that return SVG elements

// Define your icon map
export const icons = {
	google: GoogleIcon,
	github: GithubIcon,
	linkedin: LinkedinIcon,
	// Add more icons here following the same pattern
} as const satisfies Record<
	string,
	(props: SVGProps<SVGSVGElement>) => React.ReactElement
>;

export type IconName = keyof typeof icons;

export interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName;
	size?: number | string;
}

export default function Icon({
	name,
	size = 24,
	className,
	...props
}: IconProps) {
	const IconComponent = icons[name];

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found in icon map`);
		return null;
	}

	return (
		<IconComponent
			className={cn("inline-block", className)}
			width={size}
			height={size}
			{...props}
		/>
	);
}
