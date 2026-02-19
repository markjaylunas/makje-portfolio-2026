export default function H2(props: React.ComponentProps<"h2">) {
	const { children, ...rest } = props;
	return (
		<h2
			{...rest}
			className="text-5xl font-extrabold tracking-tight md:text-5xl"
		>
			{children}
		</h2>
	);
}
