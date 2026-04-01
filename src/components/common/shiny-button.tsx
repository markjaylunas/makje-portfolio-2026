import { cn } from "@/lib/utils";

interface ShinyButtonProps<T extends React.ElementType> {
	as?: T;
	children: React.ReactNode;
	className?: string;
}

type Props<T extends React.ElementType> = ShinyButtonProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof ShinyButtonProps<T>>;

export default function ShinyButton<T extends React.ElementType = "button">({
	as,
	className,
	children,
	...rest
}: Props<T>) {
	const Component = as || "button";

	return (
		<Component
			className={cn(
				"border-chart-2 relative inline-flex items-center justify-center rounded-full border px-5 py-2.5",
				"text-chart-2 tracking-widest uppercase text-sm",
				"overflow-hidden bg-transparent transition-all duration-200 ease-in",
				"cursor-pointer shadow-[0_0_0_0_transparent]",
				"hover:bg-chart-2 hover:text-white hover:shadow-[0_0_30px_5px_rgba(0,166,244,0.815)] hover:ease-out",
				"before:absolute before:block before:h-[86%] before:w-0 before:content-['']",
				"before:top-[7%] before:left-0 before:bg-white before:opacity-0",
				"before:-skew-x-20 before:shadow-[0_0_50px_30px_#fff]",
				"hover:before:animate-glow-slide",
				className,
			)}
			{...rest}
		>
			{children}
		</Component>
	);
}
