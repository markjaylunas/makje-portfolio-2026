import logo from "@/assets/svg/makje.svg";
import logoDark from "@/assets/svg/makje-dark.svg";
import { LiquidMetalCanvas } from "@/components/common/liquid-metal";
import { defaultLiquidMetalParams } from "@/components/common/liquid-metal/params";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroLogo() {
	const isMobile = useIsMobile();

	return (
		<div className="mt-14 mb-4 sm:my-12 mx-auto size-28 sm:size-56">
			{isMobile ? (
				<img
					src={logoDark}
					alt="Makje logo"
					className="h-full w-full object-contain"
				/>
			) : (
				<LiquidMetalCanvas
					imageSrc={logo}
					params={defaultLiquidMetalParams}
					imageSrcPlaceholder={logoDark}
				/>
			)}
		</div>
	);
}
