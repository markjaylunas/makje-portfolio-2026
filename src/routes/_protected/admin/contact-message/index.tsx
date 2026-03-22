import { createFileRoute } from "@tanstack/react-router";
import ContactMessageTable from "@/components/admin/contact-message/table";
import H2 from "@/components/common/H2";
import { getContactMessageListOptions } from "@/data/options/contact-message";
import { searchSchema } from "@/form-validators/contact";

export const Route = createFileRoute("/_protected/admin/contact-message/")({
	component: RouteComponent,
	loaderDeps: ({ search }) => ({
		query: search.query,
	}),
	validateSearch: searchSchema,
	loader: async ({ context }) => {
		return await context.queryClient.ensureQueryData(
			getContactMessageListOptions(),
		);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4">
			<H2 className="text-xl md:text-2xl text-center">Contact Messages</H2>

			<ContactMessageTable />
		</main>
	);
}
