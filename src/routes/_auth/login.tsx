import { HeartAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AnonymousButton from "@/components/auth/anon-button";
import OAuthButtons from "@/components/auth/oauth-buttons";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const searchSchema = z.object({
	callbackURL: z.string().optional(),
	isLinkAccount: z.boolean().optional(),
});

export const Route = createFileRoute("/_auth/login")({
	head: () => ({
		meta: [
			{ title: "Login | Makje" },
			{
				name: "description",
				content:
					"Login to enhance your experience and unlock interactive features.",
			},
		],
	}),
	component: RouteComponent,
	validateSearch: searchSchema,
});

function RouteComponent() {
	const { isLinkAccount } = Route.useSearch();

	return (
		<main className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md border-border/50 shadow-xl rounded-lg">
				<CardHeader className="text-center">
					<div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
						<HugeiconsIcon
							icon={HeartAddIcon}
							className="h-6 w-6 text-primary fill-primary/20"
						/>
					</div>
					<CardTitle className="text-2xl font-bold tracking-tight">
						Enhance Your Experience
					</CardTitle>
					<CardDescription className="prose text-balance pt-2">
						Login is{" "}
						<span className="font-bold text-primary">entirely optional</span>.
						You’re free to browse, but signing in unlocks interactive features
						and allows you to support my work.
					</CardDescription>
				</CardHeader>

				<CardContent className="grid gap-6">
					<OAuthButtons />

					{isLinkAccount ? (
						<p className="text-center text-xs font-medium mt-2">
							Choose a provider to link your account
						</p>
					) : (
						<>
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<Badge variant="secondary" className="rounded-full">
										Or stay private
									</Badge>
								</div>
							</div>

							<AnonymousButton />
						</>
					)}

					<CardFooter>
						<p className="text-center text-xs text-muted-foreground mt-2">
							By continuing, you agree to the terms of interactivity. No
							sensitive data is collected.
						</p>
					</CardFooter>
				</CardContent>
			</Card>
		</main>
	);
}
