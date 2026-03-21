import { Edit, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ExperienceItem } from "@/components/home/experience/item";
import { Button, buttonVariants } from "@/components/ui/button";
import { getExperienceListOptions } from "@/data/options/experience";
import { deleteExperienceFn } from "@/data/server/experience.server";
import { queryKey } from "@/lib/query-key";
import { cn } from "@/lib/utils";

export default function ExperienceList() {
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(getExperienceListOptions());

	const { mutateAsync: deleteExperience } = useMutation({
		mutationFn: async (id: string) => {
			await deleteExperienceFn({ data: { experienceId: id } });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.experience.list(),
			});
		},
	});

	const handleDeleteExperience = (id: string) => {
		toast("Deleting experience", {
			description: "Are you sure you want to delete this experience?",
			action: {
				label: "Yes",
				onClick: () => deleteExperience(id),
			},
			closeButton: true,
			duration: 10000,
			cancel: {
				label: "No",
				onClick: () => toast.dismiss(),
			},
		});
	};

	return (
		<ol className="relative ml-3 border-l-2 border-muted mt-16 space-y-16">
			{data.map((exp) => (
				<div key={exp.id} className="relative">
					<div className="absolute z-10 top-0 right-0 flex flex-col justify-end items-end gap-2">
						<Link
							to={`/admin/experience/$experienceId/edit`}
							params={{
								experienceId: exp.id,
							}}
							className={cn(
								"cursor-pointer",
								buttonVariants({
									variant: "secondary",
									size: "sm",
								}),
							)}
						>
							<HugeiconsIcon icon={Edit} />
							Edit
						</Link>
						<Button
							size="sm"
							variant="destructive"
							onClick={() => handleDeleteExperience(exp.id)}
						>
							<HugeiconsIcon icon={Trash} />
							Delete
						</Button>
					</div>
					<ExperienceItem
						title={exp.title}
						company={exp.company}
						description={exp.description || ""}
						period={exp.periodDisplay || ""}
						responsibilities={JSON.parse(exp.responsibilities) || ""}
						technologies={exp.technologies.flatMap((v) => v.technology)}
						logo={exp.logo?.url || undefined}
					/>
				</div>
			))}
		</ol>
	);
}
