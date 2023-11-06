import { Team } from "@/interfaces/Team"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: publicProcedure.query (async ({ ctx }) => {
        const teams = await ctx.db.team.findMany() as Team[]
        return teams;
        }
    )
})