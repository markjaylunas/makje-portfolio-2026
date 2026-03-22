import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "@/components/contact/contact-details";
import ContactForm from "@/components/contact/contact-form";
import ContentMotion from "@/components/motion/content-motion";

export const Route = createFileRoute("/_main/contact/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="relative mx-auto max-w-(--breakpoint-lg) px-4 pt-32 sm:px-6">
			<ContentMotion>
				<div className="relative z-10 mt-32 sm:mt-42 flex flex-col items-center sm:items-start justify-around gap-12 sm:flex-row mb-24">
					<ContactDetails />
					<ContactForm />
				</div>
			</ContentMotion>
		</main>
	);
}
