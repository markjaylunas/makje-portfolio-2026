import { MenuProvider } from "../providers/nav-menu-provider";
import HeaderContainer from "./header-container";
import { NavLogo } from "./header-main";

export default function HeaderAuth() {
	return (
		<MenuProvider>
			<HeaderContainer>
				<nav>
					<div className="flex justify-center items-center h-18 bg-primary/20 px-4 backdrop-blur-md border border-transparent rounded-full">
						<NavLogo />
					</div>
				</nav>
			</HeaderContainer>
		</MenuProvider>
	);
}
