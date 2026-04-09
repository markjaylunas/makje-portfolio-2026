import { type RefObject, useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(
	options?: IntersectionObserverInit,
	once = true,
): [RefObject<T | null>, boolean] {
	const ref = useRef<T>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsInView(true);
				if (once) observer.unobserve(element);
			} else {
				if (!once) setIsInView(false);
			}
		}, options);

		observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, [options, once]);

	return [ref, isInView];
}
