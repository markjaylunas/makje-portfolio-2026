import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "@/components/contact/contact-details";
import ContactForm from "@/components/contact/contact-form";

export const Route = createFileRoute("/_main/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="max-w-(--breakpoint-lg) mx-auto px-4 sm:px-6 mt-32">
			<ContactDetails />
			<ContactForm />
		</main>
	);
}
