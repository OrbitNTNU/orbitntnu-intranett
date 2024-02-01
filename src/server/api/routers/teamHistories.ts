import { createTRPCRouter, publicProcedure } from "../trpc";

export const teamHistoriesRouter = createTRPCRouter({
    getTeamHistories: publicProcedure.query (async ({ ctx }) => {
        const teamHistories = await ctx.db.teamHistory.findMany()
        return teamHistories;
        }
    )
})
