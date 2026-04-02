import {
	LoginIcon,
	LogoutIcon,
	UserShield01Icon,
	UserSwitchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { queryKey } from "@/lib/query-key";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { InternalLink } from "./nav-expanded";

export default function AuthNavCard() {
	const queryClient = useQueryClient();
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const isAnonymous = session?.user.isAnonymous;
	const isAdmin = session?.user.role === "admin";

	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	const invalidate = async () => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: queryKey.featuredProject.root,
				exact: false,
			}),
			queryClient.invalidateQueries({
				queryKey: queryKey.project.root,
				exact: false,
			}),
			queryClient.invalidateQueries({ queryKey: queryKey.session }),
		]);
	};

	const handleLogout = async () => {
		if (isAnonymous) return;
		invalidate();
		authClient.signOut();
	};
	return (
		<div>
			{user ? (
				<div className="space-y-2">
					{isAdmin && (
						<InternalLink
							name="Admin"
							to="/admin"
							hash=""
							description="Admin Dashboard"
							icon={UserShield01Icon}
							onClick={() => {}}
							activeOptions={{ exact: true }}
						/>
					)}
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage src={user.image || ""} />
							<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<span className="text-xs font-medium truncate">{user.name}</span>
							<span className="text-xs text-muted-foreground truncate">
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
					onClick={() => invalidate()}
					callbackURL={pathname}
					activeOptions={{ exact: true }}
				/>
			)}
		</div>
	);
}
