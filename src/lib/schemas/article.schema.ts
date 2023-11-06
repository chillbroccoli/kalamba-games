import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(256, "Description must be shorter than 256 characters"),
  body: z.string().min(1, "Body is required"),
  tagList: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
