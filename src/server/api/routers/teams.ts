import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const teamsRouter = createTRPCRouter({
    getTeams: protectedProcedure.query(async ({ ctx }) => {
        const teams = await ctx.db.team.findMany();
        return teams;
    }),

    getTeamsByTeamID: protectedProcedure.input(z.number()).query(async ( opts ) => {
        const teams = await opts.ctx.db.team.findUnique({
            where: {
                teamID: opts.input
            }
        });

        return teams;
    }),

    getActiveTeams: protectedProcedure.query(async ({ ctx }) => {
        const teams = await ctx.db.team.findMany({
            where: {
                members: {
                    some: {
                        endSem: null,
                        endYear: null
                    },
                }
            },
        });

        return teams;
    }),
})