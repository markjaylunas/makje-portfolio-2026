/**
 * Cloudflare Image Resizing Utility
 * This utility helps generate optimized image URLs using Cloudflare's Image Resizing service.
 * It assumes that the images are hosted on a domain proxied by Cloudflare (like media.makje.com).
 */

export interface CloudflareImageOptions {
	width?: number;
	height?: number;
	quality?: number;
	format?: "auto" | "avif" | "webp" | "json";
	fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
	blur?: number;
	sharpen?: number;
	dpr?: number;
	anim?: boolean;
}

/**
 * Transforms a regular image URL into a Cloudflare Image Resizing URL.
 * URL format: https://<domain>/cdn-cgi/image/<options>/<source-url>
 */
export function getOptimizedImageUrl(
	src: string,
	options: CloudflareImageOptions = {},
) {
	if (!src) return src;

	// Only optimize remote URLs, skip local paths if any
	if (!src.startsWith("http")) return src;

	// If it's already a cloudflare optimized URL, don't double-wrap it
	if (src.includes("/cdn-cgi/image/")) return src;

	const {
		width,
		height,
		quality = 80,
		format = "auto",
		fit = "cover",
		dpr = 1,
		...rest
	} = options;

	const params = [
		`quality=${quality}`,
		`format=${format}`,
		`fit=${fit}`,
		`dpr=${dpr}`,
	];

	if (width) params.push(`width=${width}`);
	if (height) params.push(`height=${height}`);

	for (const [key, value] of Object.entries(rest)) {
		if (value !== undefined) {
			params.push(`${key}=${value}`);
		}
	}

	const paramsString = params.join(",");

	// We use the same domain for the resizing endpoint as the source URL if it's our own domain
	// Or we can use the main site domain.
	// Given R2_PUBLIC_URL=https://media.makje.com, we can use that domain for resizing if it's on Cloudflare.
	// Alternatively, we can use relative paths if we know the domain.

	try {
		const url = new URL(src);
		// If the image is on our media domain, we can use the resizing service on it
		// Otherwise, Cloudflare Image Resizing might need configuration to allow other origins.
		return `${url.origin}/cdn-cgi/image/${paramsString}${url.pathname}`;
	} catch {
		return src;
	}
}

/**
 * Predefined optimization variants
 */
export const IMAGE_VARIANTS = {
	THUMBNAIL: {
		width: 150,
		height: 150,
		fit: "cover",
	} as CloudflareImageOptions,
	CARD: { width: 600, height: 400, fit: "cover" } as CloudflareImageOptions,
	HERO: { width: 1200, height: 800, fit: "cover" } as CloudflareImageOptions,
	PREVIEW: {
		width: 800,
		height: 600,
		fit: "contain",
	} as CloudflareImageOptions,
	ICON: { width: 64, height: 64, fit: "cover" } as CloudflareImageOptions,
	FULL: {
		quality: 90,
		format: "auto",
		fit: "scale-down",
	} as CloudflareImageOptions,
	BLUR: {
		width: 10,
		quality: 10,
		blur: 50,
		format: "auto",
	} as CloudflareImageOptions,
} as const;
