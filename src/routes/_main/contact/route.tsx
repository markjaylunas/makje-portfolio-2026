import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative">
			<div className="aurora-midnight-background pointer-events-none absolute inset-0 z-0 h-[90dvh] select-none">
				<h1 className="mt-32 select-none bg-linear-to-b from-white/10 via-white/5 via-30% to-transparent to-90% bg-clip-text text-center text-7xl font-bold uppercase tracking-tight text-transparent md:text-[8rem] lg:text-[10rem]">
					Contact
				</h1>
			</div>

			<Outlet />
		</div>
	);
}
