import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    id: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    ingredients: z
      .array(
        z.object({
          title: z.string().optional(),
          items: z.array(
            z.object({
              name: z.string(),
              quantity: z.string().optional(),
              unit: z.string().optional(),
              note: z.string().optional(),
            })
          ),
        })
      )
      .optional(),
    notes: z.array(z.string()).optional(),
    source: z
      .object({
        text: z.string(),
        originalSource: z
          .object({
            name: z.string(),
            url: z.string().url(),
          })
          .optional(),
      })
      .optional(),
    isDraft: z.boolean().optional(),
  }),
});

export const collections = {
  recipes,
};
