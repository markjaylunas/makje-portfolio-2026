import { queryOptions } from "@tanstack/react-query";
import type {
	GetContactMessageFnSchema,
	GetContactMessageListFnSchema,
} from "@/form-validators/contact";
import { queryKey } from "@/lib/query-key";
import {
	getContactMessageFn,
	getContactMessageListFn,
} from "../server/contact-message.server";

export const getContactMessageListOptions = (
	params: GetContactMessageListFnSchema,
) =>
	queryOptions({
		queryKey: queryKey.contactMessage.list(params),
		queryFn: () => getContactMessageListFn(),
	});

export const getContactMessageOptions = (params: GetContactMessageFnSchema) =>
	queryOptions({
		queryKey: queryKey.contactMessage.item(params.contactMessageId),
		queryFn: () => getContactMessageFn({ data: params }),
	});
