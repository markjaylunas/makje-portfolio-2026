import logo from "@/assets/svg/makje.svg";
import logoDark from "@/assets/svg/makje-dark.svg";
import { LiquidMetalCanvas } from "@/components/common/liquid-metal";
import { defaultLiquidMetalParams } from "@/components/common/liquid-metal/params";

export default function HeroLogo() {
	return (
		<div className="mt-14 mb-4 sm:my-12 mx-auto size-28 sm:size-56">
			<LiquidMetalCanvas
				imageSrc={logo}
				params={defaultLiquidMetalParams}
				imageSrcPlaceholder={logoDark}
			/>
		</div>
	);
}
