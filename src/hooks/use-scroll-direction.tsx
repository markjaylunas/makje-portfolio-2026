import { useEffect, useState } from "react";

/**
 * @param threshold - The number of pixels to scroll before the hide logic kicks in.
 * @returns boolean - true if the header should be visible, false if hidden.
 */
export const useScrollDirection = (threshold: number = 100): boolean => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [lastScrollY, setLastScrollY] = useState<number>(0);

	useEffect(() => {
		const updateScrollDirection = (): void => {
			const currentScrollY = window.scrollY;

			// Logic:
			// 1. Show if we're near the top
			// 2. Hide if scrolling down past threshold
			// 3. Show if scrolling up
			if (currentScrollY <= threshold) {
				setIsVisible(true);
			} else if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else if (currentScrollY < lastScrollY) {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", updateScrollDirection);

		return () => {
			window.removeEventListener("scroll", updateScrollDirection);
		};
	}, [lastScrollY, threshold]);

	return isVisible;
};
