import { fileURLToPath, URL } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [
		devtools(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({
			// TODO: Enable prerender when build error is fixed
			// Error: Invalid environment variables
			// Tried: build env vars
			// prerender: {
			// 	filter: (route) => {
			// 		return (
			// 			route.path !== "/_protected/*" &&
			// 			route.path !== "/_auth/*" &&
			// 			route.path !== "/admin/*" &&
			// 			route.path !== "/login" &&
			// 			route.path !== "/api/*"
			// 		);
			// 	},
			// 	enabled: true,
			// 	crawlLinks: true,
			// },
			sitemap: {
				enabled: true,
				host: process.env.SERVER_URL,
			},
		}),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
});

export default config;
