import type { Member, Event } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, teamLeadProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@/server/db";

export const eventsRouter = createTRPCRouter({
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany();

    const eventsAndAuthors = [];

    for (const event of events) {
      const author = await ctx.db.member.findUnique({
        where: {
          memberID: event.memberID,
        }
      });

      if (author) {
        const eventWithAuthor = {
          event: event,
          author: author,
        };
        eventsAndAuthors.push(eventWithAuthor);
      }
    }

    return eventsAndAuthors as { event: Event; author: Member }[];
  }),

  createEvent: teamLeadProcedure
    .input(z.object({
      name: z.string(),
      startTime: z.date(),
      description: z.string().nullable(),
      location: z.string(),
      memberID: z.number(),
      type: z.enum(["SOCIAL", "WORK", "PRIORITY", "OTHER"]),
      endTime: z.date(),
    })
    )
    .mutation(async (opts) => {
      const { input } = opts;

      // Create a new teamHistory entry
      const createEvent = await db.event.create({
        data: {
         name: input.name,
         startTime: input.startTime,
         description: input.description,
         location: input.location,
         memberID: input.memberID,
         type: input.type,
         endTime: input.endTime
        },
      });

      return createEvent;
    }),

    deleteEvent: teamLeadProcedure
      .input(z.object({
        eventID: z.number(),
      })
      ).mutation(async (opts) => {
        const { input } = opts;
        
        const deleteEvent = opts.ctx.db.event.delete({
          where: {
            eventID: input.eventID,
          }
        });

        return deleteEvent;
      })
});
