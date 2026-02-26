import { AnonymousIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AuthButton from "./auth-button";

export default function AnonymousButton() {
	return (
		<AuthButton>
			<HugeiconsIcon icon={AnonymousIcon} className="mr-2 size-6" />
			Continue as Guest
		</AuthButton>
	);
}
