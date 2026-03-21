import z from "zod";

export const contactCreateFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactCreateFormSchema = z.infer<typeof contactCreateFormSchema>;

export const defaultValues: ContactCreateFormSchema = {
	name: "",
	email: "",
	message: "",
};
