import { Button } from "../ui/button";

type ButtonProps = Parameters<typeof Button>[0];

export default function AuthButton({ children, ...props }: ButtonProps) {
	return (
		<Button
			variant="outline"
			size="lg"
			className="w-full cursor-pointer rounded-full"
			{...props}
		>
			{children}
		</Button>
	);
}
