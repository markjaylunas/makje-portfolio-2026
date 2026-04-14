import { createFileRoute } from "@tanstack/react-router";
import { selectProjectList } from "@/data/query/project.server";

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: async () => {
				const projects = await selectProjectList({});

				const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.SERVER_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${process.env.SERVER_URL}/contact</loc>
    <changefreq>monthly</changefreq>
  </url>
  ${projects
		.map(
			(project) => `
  <url>
    <loc>${process.env.SERVER_URL}/project/${project.id}</loc>
    <lastmod>${(project.updatedAt ? new Date(project.updatedAt) : new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
		)
		.join("")}
</urlset>`.trim();

				return new Response(sitemap, {
					headers: {
						"Content-Type": "application/xml",
					},
				});
			},
		},
	},
});
