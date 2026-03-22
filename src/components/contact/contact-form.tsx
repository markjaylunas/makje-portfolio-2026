import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/context";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createContactMessageFn } from "@/data/server/contact-message.server";
import type { InsertContactMessage } from "@/db/types";
import {
	type ContactCreateFormSchema,
	contactCreateFormSchema,
	defaultValues,
} from "@/form-validators/contact/create";
import { queryKey } from "@/lib/query-key";

export default function ContactForm() {
	const queryClient = useQueryClient();

	const { mutate: sendContact, isPending } = useMutation({
		mutationFn: async (value: ContactCreateFormSchema) => {
			const newContactMessage: InsertContactMessage = {
				name: value.name,
				email: value.email,
				message: value.message,
			};
			const result = await createContactMessageFn({ data: newContactMessage });
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.contactMessage.list(),
			});

			toast.success("Message sent successfully!", {
				dismissible: true,
				duration: 10000,
			});
			form.reset();
		},
		onError: (error) => {
			toast.error(error.message || "Something went wrong. Please try again.");
		},
	});

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => sendContact(value),
		validators: {
			onSubmit: contactCreateFormSchema,
		},
	});

	return (
		<Card className="flex-1 mx-auto w-full">
			<CardHeader>
				<CardTitle>Send me a message</CardTitle>
				<CardDescription>
					I typically respond within 24-48 hours.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					{/* Name Field */}
					<form.AppField name="name">
						{(field) => (
							<field.TextField label="Name" placeholder="Your Name" />
						)}
					</form.AppField>

					{/* Email Field */}
					<form.AppField name="email">
						{(field) => (
							<field.TextField
								label="Email"
								placeholder="yourmailaddress@email.com"
							/>
						)}
					</form.AppField>

					{/* Message Field */}
					<form.AppField name="message">
						{(field) => (
							<field.TextareaField
								label="Message"
								placeholder="Write your message here..."
							/>
						)}
					</form.AppField>

					<form.AppForm>
						<form.SubmitButton isPending={isPending} className="w-full">
							Send Message
						</form.SubmitButton>
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	);
}
