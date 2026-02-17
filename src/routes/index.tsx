import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="w-full min-h-screen flex justify-center items-center bg-background ">
			<Button>Click Me</Button>
			<ThemeToggle />
		</div>
	);
}
