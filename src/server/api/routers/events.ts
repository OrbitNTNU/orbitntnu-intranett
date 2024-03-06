import { z } from "zod";
import { createTRPCRouter, protectedProcedure, teamLeadProcedure } from "../trpc";

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

    return eventsAndAuthors;
  }),

  createEvents: teamLeadProcedure
});
