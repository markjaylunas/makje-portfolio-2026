import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	subtitle: string;
	title: string;
	description?: string;
	id?: string;
	className?: string;
}

export default function SectionHeader({
	subtitle,
	title,
	description,
	id,
	className,
}: SectionHeaderProps) {
	return (
		<div className={cn("flex flex-col gap-3 mb-16", className)}>
			<span className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase text-chart-2 font-mono">
				{subtitle}
			</span>
			<h2
				id={id}
				className="m-0 text-2xl xs:text-3xl md:text-5xl leading-[1.1]! text-white tracking-tighter"
			>
				{title}
			</h2>
			{description && (
				<p className="text-muted-foreground text-sm md:text-base w-full leading-relaxed mt-1 font-normal opacity-80">
					{description}
				</p>
			)}
		</div>
	);
}
