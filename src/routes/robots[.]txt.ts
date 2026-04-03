// src/routes/robots[.]txt.ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: async () => {
				const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /admin/

Sitemap: ${process.env.SERVER_URL}/sitemap.xml`.trim();

				return new Response(robots, {
					headers: {
						"Content-Type": "text/plain",
					},
				});
			},
		},
	},
});
