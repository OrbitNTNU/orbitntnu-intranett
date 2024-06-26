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

    getActiveTeamNameByID: protectedProcedure.input(z.number().nullable()).query(async ( opts ) => {

        if(!opts.input) {
            return;
        }

        const teamName = await opts.ctx.db.team.findUnique({
            select: {
                teamName: true,
            },
            where: {
                teamID: opts.input,
                members: {
                    some: {
                        endSem: null,
                        endYear: null
                    },
                }
            },
        });

        return teamName;
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