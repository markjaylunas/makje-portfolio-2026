import {
	type CloudflareImageOptions,
	getOptimizedImageUrl,
} from "@/lib/cloudflare-images";
import { cn } from "@/lib/utils";

interface OptimizedImageProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	options?: CloudflareImageOptions;
	className?: string;
}

/**
 * A wrapper around the native img tag that automatically applies Cloudflare Image Resizing
 */
export function OptimizedImage({
	src,
	options,
	className,
	alt,
	...props
}: OptimizedImageProps) {
	const optimizedSrc = getOptimizedImageUrl(src, options);

	return (
		<img
			src={optimizedSrc}
			alt={alt || ""}
			className={cn("max-w-full h-auto", className)}
			loading="lazy"
			{...props}
		/>
	);
}
