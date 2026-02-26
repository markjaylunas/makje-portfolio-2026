import { createContext, type ReactNode, useContext, useState } from "react";
import useLockBodyScroll from "@/hooks/use-scroll-body-lock";

interface MenuContextType {
	menuOpen: boolean;
	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

interface MenuProviderProps {
	children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const openMenu = () => setMenuOpen(true);
	const closeMenu = () => setMenuOpen(false);
	const toggleMenu = () => setMenuOpen((prev) => !prev);

	useLockBodyScroll(menuOpen);

	return (
		<MenuContext value={{ menuOpen, openMenu, closeMenu, toggleMenu }}>
			{children}
		</MenuContext>
	);
};

export const useMenu = (): MenuContextType => {
	const context = useContext(MenuContext);

	if (!context) {
		throw new Error("useMenu must be used within a MenuProvider");
	}

	return context;
};
