import { useSearch } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import Icon from "../common/icon";
import AuthButton from "./auth-button";

export default function OAuthButtons() {
	const search = useSearch({
		from: "/_auth/login",
	});

	const lastMethod = authClient.getLastUsedLoginMethod();

	const wasGoogle = lastMethod === "google";
	const wasGithub = lastMethod === "github";

	const handleOAuthLogin = (provider: "google" | "github") => {
		authClient.signIn.social({ provider, callbackURL: search.callbackURL });
	};

	return (
		<div className="flex flex-col gap-4">
			<AuthButton
				onClick={() => handleOAuthLogin("google")}
				wasLastUsed={wasGoogle}
			>
				<Icon name="google" className="size-6 mr-2" />
				Continue with Google
			</AuthButton>
			<AuthButton
				onClick={() => handleOAuthLogin("github")}
				wasLastUsed={wasGithub}
			>
				<Icon name="github" className="size-6 mr-2" />
				Continue with GitHub
			</AuthButton>
		</div>
	);
}
