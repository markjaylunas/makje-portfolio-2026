import { useLocation } from "@tanstack/react-router";

export default function CurrentPageTitle() {
	const location = useLocation();
	const path = location.pathname.split("/").pop();
	return (
		<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight capitalize">
			{path}
		</h1>
	);
}
