import { createFileRoute } from "@tanstack/react-router";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export const Route = createFileRoute("/api/health")({
	server: {
		handlers: {
			GET: async () => {
				try {
					// Perform a lightweight query to verify DB responsiveness
					// This works for SQLite/D1 used in your schema
					await db.run(sql`SELECT 1`);

					return new Response(
						JSON.stringify({
							status: "ok",
							database: "connected",
							timestamp: new Date().toISOString(),
						}),
						{
							status: 200,
							headers: { "Content-Type": "application/json" },
						},
					)
				} catch (error: unknown) {
					const errorMessage =
						error instanceof Error ? error.message : "Unknown error";

					return new Response(
						JSON.stringify({
							status: "error",
							database: "unreachable",
							error: errorMessage,
						}),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					)
				}
			},
		},
	},
});
