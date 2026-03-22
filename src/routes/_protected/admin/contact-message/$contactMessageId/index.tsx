import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { format } from "date-fns";
import H2 from "@/components/common/H2";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getContactMessageOptions } from "@/data/options/contact-message";
import { adminContactMessageIdRouteParamsSchema } from "@/form-validators/contact";

export const Route = createFileRoute(
	"/_protected/admin/contact-message/$contactMessageId/",
)({
	component: RouteComponent,
	params: adminContactMessageIdRouteParamsSchema,
	loader: async ({ context, params: { contactMessageId } }) => {
		const data = await context.queryClient.ensureQueryData(
			getContactMessageOptions({ contactMessageId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
});

function RouteComponent() {
	const { contactMessageId } = Route.useParams();
	const { data: contactMessage } = useSuspenseQuery(
		getContactMessageOptions({ contactMessageId }),
	);

	if (!contactMessage) return null;

	return (
		<main className="py-12 px-4 max-w-2xl mx-auto flex flex-col gap-6">
			<H2 className="text-center">Contact Message Detail</H2>

			<Card>
				<CardHeader>
					<div className="flex justify-between items-start">
						<div>
							<CardTitle className="text-xl">{contactMessage.name}</CardTitle>
							<CardDescription>{contactMessage.email}</CardDescription>
						</div>
						<div className="text-sm text-muted-foreground text-right border-l-2 pl-4 py-1">
							{format(new Date(contactMessage.createdAt), "PPP p")}
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-muted p-6 rounded-md whitespace-pre-wrap min-h-[150px] text-lg leading-relaxed shadow-inner">
						{contactMessage.message}
					</div>

					{contactMessage.sender && (
						<div className="pt-6 border-t flex flex-col gap-1">
							<p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
								Authenticated User Details
							</p>
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">User ID:</span>
								<code className="text-xs bg-muted px-1.5 py-0.5 rounded border">
									{contactMessage.senderId}
								</code>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
