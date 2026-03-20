import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { useFormContext } from "../context";

type SubmitButtonProps = {
	isPending: boolean;
} & ComponentProps<"button"> & {
		children: React.ReactNode;
		buttonProps?: VariantProps<typeof buttonVariants>;
	};

export default function SubmitButton({
	isPending,
	children,
	buttonProps,
	className,
	...props
}: SubmitButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, isSubmitting]) => (
				<Button
					type="submit"
					disabled={!canSubmit || isSubmitting || isPending}
					{...props}
					{...buttonProps}
					className={className}
				>
					{(isSubmitting || isPending) && (
						<HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
					)}
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}
