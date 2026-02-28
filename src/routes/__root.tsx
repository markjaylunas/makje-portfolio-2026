import { TanStackDevtools } from "@tanstack/react-devtools";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
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
					"Web Developer, Full Stack Developer, Mark Jay Lunas, TypeScript, React 19, Next.js, PostgreSQL, Supabase, Drizzle ORM, Tailwind CSS, Google Gemini AI, Vercel, Cloudflare, Software Engineer Lipa City, Responsive Design, Enterprise Applications",
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
