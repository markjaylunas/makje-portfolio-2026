export const extractColorsFromSVG = (svgString: string): string[] => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(svgString, "image/svg+xml");

	// Select all elements and potential color attributes
	const elements = doc.querySelectorAll("*");
	const colors = new Set<string>();

	elements.forEach((el) => {
		const attributes = ["fill", "stroke", "stop-color"];
		attributes.forEach((attr) => {
			const value = el.getAttribute(attr);
			if (value && /^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) {
				colors.add(value.toLowerCase());
			}
		});
	});

	return Array.from(colors);
};
