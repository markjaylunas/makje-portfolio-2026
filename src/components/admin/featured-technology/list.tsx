import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { Loading03Icon, Refresh } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Column } from "@/components/common/dnd/column";
import { Item } from "@/components/common/dnd/sortable";
import { TechCardPixel } from "@/components/home/technology/card";
import { Button } from "@/components/ui/button";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";
import { updateTechnologyOrderFn } from "@/data/server/featured-technology.server";
import { queryKey } from "@/lib/query-key";
import type { FeaturedTechnologyWithTechnology } from "@/lib/types";

export default function FeaturedTechnologyCardOrderList() {
	const queryClient = useQueryClient();
	const { data: defaultFeaturedTechnologyList } = useSuspenseQuery(
		getFeaturedTechnologyListOptions(),
	);

	const { mutateAsync: updateFeaturedTechnologyOrder, isPending } = useMutation(
		{
			mutationFn: async (data: FeaturedTechnologyWithTechnology[]) =>
				await updateTechnologyOrderFn({
					data: { featuredTechnologyIdList: data.map((t) => t.id) },
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: queryKey.featuredTechnology.list(),
				});
				toast.success("Technology order updated successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		},
	);

	const form = useForm({
		defaultValues: {
			featuredTechnologyList: defaultFeaturedTechnologyList,
		},
		onSubmit: async ({ value }) => {
			updateFeaturedTechnologyOrder(value.featuredTechnologyList);
		},
	});

	const handleResetList = useCallback(() => {
		form.setFieldValue("featuredTechnologyList", defaultFeaturedTechnologyList);
	}, [defaultFeaturedTechnologyList, form.setFieldValue]);

	useEffect(() => {
		handleResetList();
	}, [handleResetList]);

	if (defaultFeaturedTechnologyList.length === 0) return null;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="w-fit mx-auto"
		>
			<form.Subscribe
				selector={(state) => [
					state.canSubmit,
					state.values.featuredTechnologyList,
				]}
			>
				{([canSubmit, featuredTechnologyList]) => {
					if (!Array.isArray(featuredTechnologyList)) return null;
					const currentOrder = featuredTechnologyList.map((t) => t.order);

					const isOrderChanged = currentOrder.some(
						(order, index) =>
							order !== defaultFeaturedTechnologyList[index].order,
					);

					if (!isOrderChanged) return null;
					return (
						<div className="flex justify-end items-center gap-2">
							<Button variant="outline" size="icon" onClick={handleResetList}>
								<HugeiconsIcon icon={Refresh} />
								<span className="sr-only">Reset Order</span>
							</Button>

							<Button
								type="submit"
								disabled={!canSubmit || isPending || !isOrderChanged}
							>
								{isPending && (
									<HugeiconsIcon
										icon={Loading03Icon}
										className="animate-spin"
									/>
								)}
								Update Order
							</Button>
						</div>
					);
				}}
			</form.Subscribe>

			<form.Field name="featuredTechnologyList">
				{(field) => (
					<DragDropProvider
						onDragOver={(event) => {
							field.handleChange((v) => move(v, event));
						}}
					>
						<ul className="mx-auto max-w-(--breakpoint-sm) grid grid-cols-2 md:grid-cols-4 mt-6 gap-px bg-muted border border-muted">
							{Object.entries(field.state.value).map(
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
				)}
			</form.Field>
		</form>
	);
}
