import { ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerInput({
	value,
	onChange,
	placeholder,
	...buttonProps
}: Omit<ComponentProps<"button">, "value" | "onChange"> & {
	value?: Date;
	onChange: (value?: Date) => void;
	placeholder?: string;
}) {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant={"outline"}
						data-empty={!value}
						className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
						{...buttonProps}
					>
						{value ? (
							format(value, "PPP")
						) : (
							<span>{placeholder ? placeholder : "Pick a date"}</span>
						)}
						<HugeiconsIcon icon={ChevronDown} data-icon="inline-end" />
					</Button>
				}
			/>

			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					required
					selected={value}
					onSelect={onChange}
					defaultMonth={value}
				/>
			</PopoverContent>
		</Popover>
	);
}
