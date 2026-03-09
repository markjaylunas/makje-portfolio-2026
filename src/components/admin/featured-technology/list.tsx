import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type ComponentProps, useState } from "react";
import { Column } from "@/components/common/dnd/column";
import { Item } from "@/components/common/dnd/sortable";
import H2 from "@/components/common/H2";
import { TechCardPixel } from "@/components/home/technology/card";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";

export default function FeaturedTechnologyCardList(
	props: ComponentProps<"section">,
) {
	const { data } = useSuspenseQuery(getFeaturedTechnologyListOptions());

	const [featuredTechnologyList, setFeaturedTechnologyList] = useState(data);

	return (
		<section {...props}>
			<H2 className="text-2xl md:text-3xl">Featured Technologies</H2>

			<DragDropProvider
				onDragOver={(event) => {
					setFeaturedTechnologyList((v) => move(v, event));
				}}
			>
				<ul className="mx-auto max-w-(--breakpoint-sm) grid grid-cols-2 md:grid-cols-4 mt-6 gap-px bg-muted border border-muted">
					{Object.entries(featuredTechnologyList).map(
						([column, { order, id, technology }], index) => (
							<Column key={column} id={column}>
								<Item key={id} id={id} index={index} column={column}>
									<li key={id} className="relative">
										<p className="absolute z-10 top-2 right-2">{order}</p>
										<TechCardPixel
											icon={technology.icon?.url ?? undefined}
											colors={technology.brandColor}
											name={technology.name}
											alt={technology.icon?.altText ?? undefined}
										/>
									</li>
								</Item>
							</Column>
						),
					)}
				</ul>
			</DragDropProvider>
		</section>
	);
}
