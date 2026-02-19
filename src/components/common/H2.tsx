export default function H2(props: React.ComponentProps<"h2">) {
	const { children, ...rest } = props;
	return (
		<h2 {...rest} className="text-4xl font-semibold tracking-tight md:text-5xl">
			{children}
		</h2>
	);
}
