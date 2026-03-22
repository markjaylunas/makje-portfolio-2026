import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,
		context: {
			queryClient: new QueryClient({
				defaultOptions: { queries: { staleTime: Infinity } },
			}),
		},
		defaultViewTransition: true,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingMs: 250,
		defaultPendingMinMs: 500,
		defaultPendingComponent: () => <div />,
		defaultHashScrollIntoView: { behavior: "smooth" },
		defaultNotFoundComponent: () => {
			return <p>This page doesn't exist!</p>;
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
