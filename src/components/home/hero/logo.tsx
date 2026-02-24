import logo from "@/assets/svg/makje.svg";
import logoDark from "@/assets/svg/makje-dark.svg";
import { LiquidMetalCanvas } from "@/components/common/liquid-metal";
import { defaultLiquidMetalParams } from "@/components/common/liquid-metal/params";

export default function HeroLogo() {
	return (
		<div className="my-12 w-full h-56 aspect-square">
			<LiquidMetalCanvas
				imageSrc={logo}
				params={defaultLiquidMetalParams}
				imageSrcPlaceholder={logoDark}
			/>
		</div>
	);
}
