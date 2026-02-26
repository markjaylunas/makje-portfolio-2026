import { useEffect } from "react";

const useLockBodyScroll = (lock = false) => {
	useEffect(() => {
		// Only apply the lock if the passed boolean is true
		if (lock) {
			const originalStyle = window.getComputedStyle(document.body).overflow;
			document.body.style.overflow = "hidden";

			// Revert to the original style on cleanup
			return () => {
				document.body.style.overflow = originalStyle;
			};
		}
	}, [lock]);
};

export default useLockBodyScroll;
