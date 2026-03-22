import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import { env } from "@/env";

type ContactMessageEmailProps = {
	name: string;
	senderEmail: string;
	senderId?: string;
	contactMessageId: string;
	message: string;
	createdAt: Date;
};

export default function ContactMessageEmailTemplate({
	name,
	senderEmail,
	senderId,
	contactMessageId,
	message,
	createdAt,
}: ContactMessageEmailProps) {
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		dateStyle: "long",
		timeStyle: "short",
	}).format(createdAt);

	return (
		<Html>
			<Head />
			<Preview>New message from {name} via Portfolio</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={headerSection}>
						<Heading style={h1}>New Contact Message</Heading>
					</Section>

					<Section style={infoSection}>
						<Text style={label}>FROM</Text>
						<Text style={value}>{name}</Text>

						<Text style={label}>EMAIL</Text>
						<Text style={value}>{senderEmail}</Text>

						{senderId && (
							<>
								<Text style={label}>SENDER ID</Text>
								<Text style={value}>{senderId}</Text>
							</>
						)}

						<Hr style={hr} />

						<Text style={label}>MESSAGE</Text>
						<Section style={messageContainer}>
							<Text style={messageText}>{message}</Text>
						</Section>

						<Hr style={hr} />

						<Section style={footer}>
							<Text style={footerText}>
								Sent from your Portfolio contact form on {formattedDate}.
							</Text>
							<Text style={footerId}>Message ID: {contactMessageId}</Text>
							<Link
								href={`${env.SERVER_URL}/admin/contact-message/${contactMessageId}`}
								style={link}
							>
								View message in dashboard
							</Link>
						</Section>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const link = {
	fontSize: "14px",
	color: "#2563eb",
	textDecoration: "underline",
	display: "block",
	marginTop: "12px",
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "580px",
};

const headerSection = {
	padding: "32px",
	backgroundColor: "#f9fafb",
	borderRadius: "8px 8px 0 0",
	border: "1px solid #e5e7eb",
	borderBottom: "none",
};

const infoSection = {
	padding: "32px",
	border: "1px solid #e5e7eb",
	borderRadius: "0 0 8px 8px",
};

const h1 = {
	color: "#111827",
	fontSize: "24px",
	fontWeight: "700",
	lineHeight: "32px",
	margin: "0",
};

const label = {
	color: "#6b7280",
	fontSize: "12px",
	fontWeight: "600",
	textTransform: "uppercase" as const,
	letterSpacing: "0.05em",
	marginBottom: "4px",
};

const value = {
	color: "#111827",
	fontSize: "16px",
	marginTop: "0",
	marginBottom: "24px",
};

const messageContainer = {
	backgroundColor: "#f9fafb",
	padding: "24px",
	borderRadius: "4px",
	marginTop: "12px",
	marginBottom: "24px",
};

const messageText = {
	color: "#374151",
	fontSize: "16px",
	lineHeight: "24px",
	margin: "0",
	whiteSpace: "pre-wrap" as const,
};

const hr = {
	borderColor: "#e5e7eb",
	margin: "32px 0",
};

const footer = {
	textAlign: "center" as const,
};

const footerText = {
	color: "#9ca3af",
	fontSize: "14px",
	lineHeight: "20px",
};

const footerId = {
	color: "#d1d5db",
	fontSize: "12px",
	marginTop: "8px",
};
