import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const teamHistoriesRouter = createTRPCRouter({
    getTeamHistories: publicProcedure.query(async ({ ctx }) => {
        const teamHistories = await ctx.db.teamHistory.findMany()
        return teamHistories;
    }
    ),

    terminateTeamHistory: publicProcedure
        .input(z.object({
            teamHistoryID: z.number(),
        })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            const foundHistory = await db.teamHistory.findUnique({
                where: {
                    teamHistoryID: input.teamHistoryID,
                }
            });

            // Function to determine the current semester
            function getCurrentSemester() {
                const currentMonth = new Date().getMonth() + 1; // January is month 0
                // Determine the current semester based on the current month
                return currentMonth >= 1 && currentMonth <= 5 ? "SPRING" : "FALL"; // Assuming SPRING is from January to May, and FALL is from September to December
            }

            if (foundHistory) {
                // Update the existing member information
                const updatedTeamHistory = await db.teamHistory.update({
                    where: {
                        teamHistoryID: input.teamHistoryID,
                    },
                    data: {
                        endSem: getCurrentSemester(), // Set endSem to the current semester
                        endYear: new Date().getFullYear(), // Set endYear to the current year
                    },
                });

                return updatedTeamHistory;
            }

            // Member not found, return null or handle accordingly
            return null;
        }),

    createTeamHistory: publicProcedure
        .input(z.object({
            priviledges: z.enum(["MEMBER", "LEADER", "BOARD", "MENTOR"]),
            memberID: z.number(),
            teamID: z.number(),
            cPosition: z.enum(["CEO", "COO", "CTO", "CFO", "CMO", "CIO", "CHRO", "PM_FS1", "PM_FS1_5", "PM_FS2", "PM_BS", "NTNU_REP"]).nullable()
        })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            // Function to determine the current semester
            const getCurrentSemester = () => {
                const currentMonth = new Date().getMonth() + 1; // January is month 0
                // Determine the current semester based on the current month
                return currentMonth >= 1 && currentMonth <= 5 ? "SPRING" : "FALL"; // Assuming SPRING is from January to May, and FALL is from September to December
            }

            // Create a new teamHistory entry
            const createdTeamHistory = await db.teamHistory.create({
                data: {
                    memberID: input.memberID,
                    teamID: input.teamID,
                    startSem: getCurrentSemester(),
                    startYear: new Date().getFullYear(),
                    priviledges: input.priviledges,
                    cPosition: input.cPosition
                },
            });
            return createdTeamHistory;
        }),
})
