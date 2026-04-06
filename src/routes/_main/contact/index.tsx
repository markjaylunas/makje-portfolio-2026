import { createFileRoute } from "@tanstack/react-router";
import ContactDetails from "@/components/contact/contact-details";
import ContactForm from "@/components/contact/contact-form";
import ContentMotion from "@/components/motion/content-motion";

export const Route = createFileRoute("/_main/contact/")({
	head: () => ({
		meta: [
			{ title: "Contact | Makje" },
			{
				name: "description",
				content:
					"Get in touch with Mark Jay Lunas. Feel free to send a message.",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="relative min-h-screen pt-16 sm:pt-42">
			<div className="dark-dot-matrix-background absolute inset-0 h-full z-0" />
			<ContentMotion>
				<div className="relative z-10 flex flex-col items-center sm:items-start justify-around gap-12 sm:flex-row mb-24 mx-auto max-w-5xl min-h-dvh px-4 py-36">
					<ContactDetails />
					<ContactForm />
				</div>
			</ContentMotion>
		</main>
	);
}
