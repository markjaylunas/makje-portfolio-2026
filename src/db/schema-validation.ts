import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { technology } from "./schema";

export const technologySelectSchema = createSelectSchema(technology);
export const technologyCreateSchema = createInsertSchema(technology);
