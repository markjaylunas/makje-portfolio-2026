import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "@/components/contact/contact-details";
import ContactForm from "@/components/contact/contact-form";

export const Route = createFileRoute("/_main/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="max-w-(--breakpoint-lg) mx-auto px-4 sm:px-6 pt-32 min-h-dvh">
			<div className="aurora-midnight-background absolute inset-0 z-0 h-[90dvh]">
				<h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-white/10 via-white/5 via-30% to-90% to-transparent uppercase tracking-tight mt-32">
					Contact
				</h1>
			</div>

			<div className="flex flex-col sm:flex-row gap-6 justify-around items-center">
				<ContactDetails />
				<ContactForm />
			</div>
		</main>
	);
}
