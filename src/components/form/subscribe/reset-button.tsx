import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { useFormContext } from "../context";

type ResetButtonProps = {
	isPending: boolean;
} & ComponentProps<"button"> & {
		children: React.ReactNode;
		buttonProps?: VariantProps<typeof buttonVariants>;
	};

export default function ResetButton({
	isPending,
	children,
	buttonProps,
	className,
	...props
}: ResetButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => [state.isSubmitting, state.isDirty]}>
			{([isSubmitting, isDirty]) => (
				<Button
					type="reset"
					disabled={isSubmitting || isPending || !isDirty}
					variant="outline"
					onClick={() => form.reset()}
					{...props}
					{...buttonProps}
					className={className}
				>
					{children}
				</Button>
			)}
		</form.Subscribe>
	);
}
