import logo from "@/assets/svg/makje.svg";
import MetallicPaint from "../../common/metallic-paint";

export default function HeroLogo() {
	return (
		<div className="my-12">
			<MetallicPaint
				imageSrc={logo}
				// Pattern
				seed={42}
				scale={4}
				patternSharpness={1}
				noiseScale={0.5}
				// Animation
				speed={0.3}
				liquid={0.75}
				mouseAnimation={false}
				// Visual
				brightness={2}
				contrast={0.5}
				refraction={0.01}
				blur={0.015}
				chromaticSpread={2}
				fresnel={1}
				angle={0}
				waveAmplitude={1}
				distortion={1}
				contour={0.2}
				// Colors
				lightColor="#ffffff"
				darkColor="#000000"
				tintColor="#feb3ff"
			/>
		</div>
	);
}
