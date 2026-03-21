import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "@/components/contact/contact-details";
import ContactForm from "@/components/contact/contact-form";

export const Route = createFileRoute("/_main/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="relative mx-auto max-w-(--breakpoint-lg) px-4 pt-32 sm:px-6">
			<div className="aurora-midnight-background pointer-events-none absolute inset-0 z-0 h-[90dvh] select-none">
				<h1 className="mt-32 select-none bg-linear-to-b from-white/10 via-white/5 via-30% to-transparent to-90% bg-clip-text text-center text-7xl font-bold uppercase tracking-tight text-transparent md:text-[8rem] lg:text-[10rem]">
					Contact
				</h1>
			</div>

			<div className="relative z-10 mt-32 sm:mt-42 flex flex-col items-center sm:items-start justify-around gap-6 sm:flex-row">
				<ContactDetails />
				<ContactForm />
			</div>
		</main>
	);
}
