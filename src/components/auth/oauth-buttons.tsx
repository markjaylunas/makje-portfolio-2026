import { authClient } from "@/lib/auth-client";
import Icon from "../common/icon";
import AuthButton from "./auth-button";

export default function OAuthButtons() {
	const lastMethod = authClient.getLastUsedLoginMethod();

	const wasGoogle = lastMethod === "google";
	const wasGithub = lastMethod === "github";

	return (
		<div className="flex flex-col gap-2">
			<AuthButton onClick={() => {}} wasLastUsed={wasGoogle}>
				<Icon name="google" className="size-6 mr-2" />
				Continue with Google
			</AuthButton>
			<AuthButton onClick={() => {}} wasLastUsed={wasGithub}>
				<Icon name="github" className="size-6 mr-2" />
				Continue with GitHub
			</AuthButton>
		</div>
	);
}
