import { Fragment } from "react";
import useImageFilePreviewUrl from "@/hooks/use-image-file-preview-url";

export default function FileImagePreview({
	file,
	children,
}: {
	file: File | string | null | undefined;
	children: (url: string) => React.ReactNode;
}) {
	const url = useImageFilePreviewUrl(file);
	return <Fragment>{children(url || "")}</Fragment>;
}
