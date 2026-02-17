import { cn } from "@/lib/utils";

export default function ShinyButton({
	className,
	children,
	...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={cn(
				"border-primary relative rounded-[7px] border px-5 py-2.5",
				"text-primary  font-semibold tracking-[2px] uppercase",
				"overflow-hidden bg-transparent transition-all duration-200 ease-in",
				"cursor-pointer shadow-[0_0_0_0_transparent]",

				// Hover State
				"hover:bg-primary hover:text-white hover:shadow-[0_0_30px_5px_rgba(78.959,69.779,228.76,0.815)] hover:ease-out",

				// Active State
				"active:shadow-none active:transition-shadow active:duration-200",

				// The "Shine" Effect (Pseudo-element)
				"before:absolute before:block before:h-[86%] before:w-0 before:content-['']",
				"before:top-[7%] before:left-0 before:bg-white before:opacity-0",
				"before:-skew-x-20 before:shadow-[0_0_50px_30px_#fff]",

				// Trigger Animation on Hover
				"hover:before:animate-glow-slide",

				// Allow custom classes to be passed in
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
