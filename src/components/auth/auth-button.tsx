import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type ButtonProps = Parameters<typeof Button>[0];

export default function AuthButton({
	children,
	wasLastUsed,
	...props
}: ButtonProps & { wasLastUsed?: boolean }) {
	return (
		<div>
			{wasLastUsed && <Badge className="rounded-full">Last Used</Badge>}
			<Button
				variant="outline"
				size="lg"
				className="w-full cursor-pointer rounded-full"
				{...props}
			>
				{children}
			</Button>
		</div>
	);
}
