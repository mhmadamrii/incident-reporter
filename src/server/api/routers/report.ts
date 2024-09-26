import Groq from "groq-sdk";

import { IncidentStatus, IncidentType } from "@prisma/client";
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
        status: z.nativeEnum(IncidentStatus),
        type: z.nativeEnum(IncidentType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.incident.create({
        data: {
          company: input.title,
          type: input.type,
          description: input.description,
          status: input.status,
        },
      });
    }),

  editIncidentStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.nativeEnum(IncidentStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.incident.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  getReportedIncidents: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      console.log("input", input);
      return ctx.db.incident.findMany({
        where: {
          company: {
            contains: input.search,
            mode: "insensitive",
          },
        },
      });
    }),
});
