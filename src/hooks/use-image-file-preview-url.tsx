import { useEffect, useState } from "react";

export default function useImageFilePreviewUrl(
	logo: File | string | null | undefined,
) {
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!logo) {
			setPreviewUrl(undefined);
			return;
		}

		if (typeof logo === "string") {
			setPreviewUrl(logo);
			return;
		}

		const objectUrl = URL.createObjectURL(logo);
		setPreviewUrl(objectUrl);

		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [logo]);

	return previewUrl;
}
