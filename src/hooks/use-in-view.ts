import { type RefObject, useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(
	options?: IntersectionObserverInit,
	once = true,
): [RefObject<T | null>, boolean] {
	const ref = useRef<T>(null);
	const [isInView, setIsInView] = useState(false);

	const optionsRef = useRef(options);

	useEffect(() => {
		optionsRef.current = options;
	}, [options]);

	useEffect(() => {
		const element = ref.current;

		if (!element || (once && isInView)) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsInView(true);

				if (once) {
					observer.unobserve(element);
				}
			} else {
				if (!once) {
					setIsInView(false);
				}
			}
		}, optionsRef.current);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [once, isInView]);

	return [ref, isInView];
}
