import { cn } from "@/lib/utils";

export default function H2(props: React.ComponentProps<"h2">) {
	const { children, className, ...rest } = props;
	return (
		<h2
			{...rest}
			className={cn(
				"text-3xl font-extrabold tracking-tight md:text-5xl",
				className,
			)}
		>
			{children}
		</h2>
	);
}
