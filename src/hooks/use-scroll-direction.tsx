import { useEffect, useRef, useState } from "react";

export const useScrollDirection = (threshold: number = 100) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

	// 1. Use a Ref for the scroll position to avoid re-triggering the Effect
	const lastScrollY = useRef<number>(0);

	const handleCloseMenu = (): void => setIsShowMenu(false);

	useEffect(() => {
		const updateScrollDirection = (): void => {
			const currentScrollY = window.scrollY;
			const previousScrollY = lastScrollY.current;

			let nextVisible = isVisible;

			if (currentScrollY <= threshold) {
				nextVisible = true;
			} else if (currentScrollY > previousScrollY) {
				// Scrolling Down
				nextVisible = false;
				// Only update Menu state if it's actually open
				setIsShowMenu(false);
			} else if (currentScrollY < previousScrollY) {
				// Scrolling Up
				nextVisible = true;
			}

			// 2. Only update state if the value actually changed
			if (nextVisible !== isVisible) {
				setIsVisible(nextVisible);
			}

			lastScrollY.current = currentScrollY;
		};

		// 3. Passive listener improves scroll performance
		window.addEventListener("scroll", updateScrollDirection, { passive: true });

		return () => window.removeEventListener("scroll", updateScrollDirection);
	}, [isVisible, threshold]); // Effect only restarts when visibility flips

	return { isVisible, isShowMenu, setIsShowMenu, handleCloseMenu };
};
