export default function ImagePreview({
	url,
	alt,
}: {
	url: string | undefined;
	alt: string;
}) {
	return (
		<div className="size-24 flex items-center justify-center border rounded bg-muted p-2 overflow-x-hidden">
			{url ? (
				<img src={url} alt={alt} className="w-full h-full object-contain" />
			) : (
				<p className="text-muted-foreground text-[10px] text-center uppercase font-medium">
					No {alt}
				</p>
			)}
		</div>
	);
}
