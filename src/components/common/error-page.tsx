import { Home, RefreshCcw } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ErrorComponent, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main>
			<ErrorComponent error={error} />

			<div className="flex gap-4 justify-center items-center mt-4">
				<Link
					className={buttonVariants({ variant: "secondary", size: "lg" })}
					to="/"
				>
					<HugeiconsIcon icon={Home} />
					Go to Home
				</Link>
				<Button onClick={reset} size="lg">
					<HugeiconsIcon icon={RefreshCcw} />
					Reset
				</Button>
			</div>
		</main>
	);
}
