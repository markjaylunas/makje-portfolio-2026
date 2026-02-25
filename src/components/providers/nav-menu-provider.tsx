import { createContext, type ReactNode, useContext, useState } from "react";

interface MenuContextType {
	menuOpen: boolean;
	toggleMenu: () => void;
	setMenuOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

interface MenuProviderProps {
	children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	return (
		<MenuContext value={{ menuOpen, setMenuOpen, toggleMenu }}>
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
