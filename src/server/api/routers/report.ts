import Groq from "groq-sdk";

import { z } from "zod";
import { env } from "~/env";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const client = new Groq({
  apiKey: env.GROQ_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export const reportRouter = createTRPCRouter({
  createReportIncidentByAi: publicProcedure
    .input(
      z.object({
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await client.chat.completions.create({
        messages: [{ role: "user", content: input.description }],
        model: "llama3-8b-8192",
      });

      return {
        description: response?.choices?.[0]?.message?.content || "",
      };
    }),

  createReportIncident: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await client.chat.completions.create({
        messages: [{ role: "user", content: input.description }],
        model: "llama3-8b-8192",
      });
      console.log("response", JSON.stringify(response));

      return ctx.db.incident.create({
        data: {
          title: input.title,
          description: response?.choices?.[0]?.message?.content || "",
          status: "OPEN",
        },
      });
    }),
});
