import { createTRPCRouter, protectedProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: protectedProcedure.query (async ({ ctx }) => {
        const teams = await ctx.db.team.findMany();
        return teams;
        }
    )
})