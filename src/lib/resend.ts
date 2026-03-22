import { Resend } from "resend";
import { env } from "@/env";

export const resend = new Resend(env.RESEND_API_KEY);

export const emailConfig = {
	from: `Portfolio <${env.RESEND_FROM}>`,
	to: env.RESEND_TO,
};
