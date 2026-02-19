import ReactSVG from "@/assets/svg/react.svg";
import type { Technology } from "@/lib/types";

export const technologies: Technology[] = [
	{
		name: "React",
		url: "https://react.dev/",
		icon: <img src={ReactSVG} alt="react" className="size-10" />,
	},
];
