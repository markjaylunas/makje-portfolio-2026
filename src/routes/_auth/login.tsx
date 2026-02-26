import { createFileRoute } from "@tanstack/react-router";
import AnonymousButton from "@/components/auth/anon-button";
import OAuthButtons from "@/components/auth/oauth-buttons";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<AnonymousButton />
			<OAuthButtons />
		</main>
	);
}
