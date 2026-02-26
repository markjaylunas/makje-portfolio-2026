import {
	LoginIcon,
	LogoutIcon,
	UserSwitchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { InternalLink } from "./nav-expanded";

export default function AuthNavCard() {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const isAnonymous = session?.user.isAnonymous;

	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	const handleLogout = () => {
		if (isAnonymous) return;

		authClient.signOut();
	};
	return (
		<div>
			{user ? (
				<div>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={user.image || ""} />
							<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="text-xs font-medium">{user.name}</span>
							<span className="text-xs text-muted-foreground">
								{user.email}
							</span>
						</div>
					</div>

					{isAnonymous ? (
						<Link
							to="/login"
							onClick={() => {}}
							search={{ callbackURL: pathname, isLinkAccount: true }}
							className={cn(
								buttonVariants({ variant: "outline", size: "sm" }),
								"w-full mt-4 rounded-full cursor-pointer",
							)}
						>
							<HugeiconsIcon icon={UserSwitchIcon} className="size-5 mr-2" />
							Link Account
						</Link>
					) : (
						<Button
							onClick={handleLogout}
							variant="outline"
							size="sm"
							className="w-full mt-4 rounded-full cursor-pointer"
						>
							<HugeiconsIcon icon={LogoutIcon} className="size-5 mr-2" />
							Logout
						</Button>
					)}
				</div>
			) : (
				<InternalLink
					name="Login"
					to="/login"
					hash=""
					description="Login to your account"
					icon={LoginIcon}
					onClick={() => {}}
					callbackURL={pathname}
				/>
			)}
		</div>
	);
}
