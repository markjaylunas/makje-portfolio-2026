import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/context";
import { Card, CardContent } from "@/components/ui/card";
import {
	type ContactCreateFormSchema,
	contactCreateFormSchema,
	defaultValues,
} from "@/form-validators/contact/create";

export default function ContactForm() {
	const { mutate: sendContact, isPending } = useMutation({
		mutationFn: async (value: ContactCreateFormSchema) => {
			alert(JSON.stringify(value));
		},
		onSuccess: () => {
			toast.success("Message sent successfully!");
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
							<field.TextField label="Name" placeholder="Juan Dela Cruz" />
						)}
					</form.AppField>

					{/* Email Field */}
					<form.AppField name="email">
						{(field) => (
							<field.TextField
								label="Email"
								placeholder="juandelacruz@makje.com"
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
