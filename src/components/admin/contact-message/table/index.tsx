import { useSuspenseQuery } from "@tanstack/react-query";
import { getContactMessageListOptions } from "@/data/options/contact-message";
import { DataTable } from "../../../common/data-table";
import { columns } from "./columns";

export default function ContactMessageTable() {
	const { data: contactMessageList } = useSuspenseQuery(
		getContactMessageListOptions(),
	);

	return (
		<section className="space-y-4">
			<DataTable columns={columns} data={contactMessageList} />
		</section>
	);
}
