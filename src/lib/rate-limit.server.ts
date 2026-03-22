import { env } from "cloudflare:workers";

interface RateLimitOptions {
	key: string;
	limit: number;
	windowSeconds: number;
}

export async function rateLimit({
	key,
	limit,
	windowSeconds,
}: RateLimitOptions) {
	if (!env.RATE_LIMITER) {
		console.warn(
			"RATE_LIMITER KV namespace is not bound. Skipping rate limit.",
		);
		return;
	}
	const kvKey = `rate-limit:${key}`;
	const currentCountStr = await env.RATE_LIMITER.get(kvKey);
	const currentCount = currentCountStr
		? Number.parseInt(currentCountStr, 10)
		: 0;

	if (currentCount >= limit) {
		throw new Error("Too many requests. Please try again later.");
	}

	await env.RATE_LIMITER.put(kvKey, (currentCount + 1).toString(), {
		expirationTtl: windowSeconds,
	});
}
