import { TanStackDevtools } from "@tanstack/react-devtools";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Makje | Mark Jay Lunas",
			},
			{
				name: "description",
				content:
					"Portfolio of Mark Jay Lunas, a web developer. Next-gen web development for ambitious goals.",
			},
			{
				name: "keywords",
				content:
					"Web Developer, Full Stack, Mark Jay Lunas, Makje, TypeScript, React, Next.js, TanStack Start, TanStack Query, Drizzle ORM, Tailwind CSS, PostgreSQL, Supabase, Cloudflare Workers, Cloudflare R2, Google Gemini AI integration, Software Engineer Philippines, Web Developer Lipa City, Enterprise Web Solutions, Scalable Architecture",
			},
			// Open Graph
			{ property: "og:title", content: "Makje | Mark Jay Lunas" },
			{
				property: "og:description",
				content:
					"Portfolio of Mark Jay Lunas, a web developer. Next-gen web development for ambitious goals.",
			},
			{
				property: "og:image",
				content: `${process.env.SERVER_URL}/og-image.png`,
			},
			{ property: "og:type", content: "website" },
			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Makje | Mark Jay Lunas" },
			{
				name: "twitter:description",
				content:
					"Portfolio of Mark Jay Lunas, a web developer. Next-gen web development for ambitious goals.",
			},
			{
				name: "twitter:image",
				content: `${process.env.SERVER_URL}/twitter-image.png`,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { queryClient } = Route.useRouteContext();
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="relative">
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							{
								name: "Tanstack Query",
								render: <ReactQueryDevtoolsPanel />,
							},
						]}
					/>
				</QueryClientProvider>

				<Scripts />
			</body>
		</html>
	);
}
