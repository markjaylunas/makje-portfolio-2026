import { AnonymousIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { authClient } from "@/lib/auth-client";
import AuthButton from "./auth-button";

export default function AnonymousButton() {
	const lastMethod = authClient.getLastUsedLoginMethod();
	return (
		<AuthButton wasLastUsed={lastMethod === "anonymous"}>
			<HugeiconsIcon icon={AnonymousIcon} className="mr-2 size-6" />
			Continue as Guest
		</AuthButton>
	);
}
