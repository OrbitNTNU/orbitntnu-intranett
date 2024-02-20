import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventsRouter = createTRPCRouter({
  getEvents: publicProcedure.query(async ({ ctx }) => {
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
});
