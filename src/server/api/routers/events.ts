import type { Member, Event } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
});
