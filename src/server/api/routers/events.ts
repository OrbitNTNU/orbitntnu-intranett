import type { Event } from "@/interfaces/Event";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventsRouter = createTRPCRouter({
  getEvents: publicProcedure.query(async ({ ctx }) => {
    const events: Event[] = await ctx.db.event.findMany();

    return events;
}),
});
