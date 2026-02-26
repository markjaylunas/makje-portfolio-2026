import { AnonymousIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import AuthButton from "./auth-button";

export default function AnonymousButton() {
	const router = useRouter();
	const search = useSearch({
		from: "/_auth/login",
	});

	const lastMethod = authClient.getLastUsedLoginMethod();
	const handleAnonymousLogin = async () => {
		await authClient.signIn.anonymous({
			fetchOptions: {
				onSuccess: () => {
					router.navigate({
						to: search.callbackURL,
					});
				},
			},
		});
	};
	return (
		<AuthButton
			onClick={handleAnonymousLogin}
			wasLastUsed={lastMethod === "anonymous"}
		>
			<HugeiconsIcon icon={AnonymousIcon} className="mr-2 size-6" />
			Continue as Guest
		</AuthButton>
	);
}
