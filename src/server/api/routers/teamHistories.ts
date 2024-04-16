import { z } from "zod";
import { createTRPCRouter, protectedProcedure, teamLeadProcedure } from "../trpc";
import { db } from "@/server/db";
import { SemType, type Team, type TeamHistory } from "@prisma/client";

export const teamHistoriesRouter = createTRPCRouter({
    getTeamHistories: protectedProcedure.query(async ({ ctx }) => {
        const teamHistories = await ctx.db.teamHistory.findMany()
        return teamHistories;
    }),

    terminateTeamHistory: teamLeadProcedure
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

    createTeamHistory: teamLeadProcedure
        .input(z.object({
            priviledges: z.enum(["MEMBER", "LEADER", "BOARD", "MENTOR"]),
            memberID: z.number(),
            teamID: z.number(),
            cPosition: z.enum(["CEO", "COO", "CTO", "CFO", "CMO", "CIO", "CHRO", "PM_FS1", "PM_FS1_5", "PM_FS2", "PM_BS", "NTNU_REP" ,"PM_SS", "DCEO", "PM_SS", "DCEO"]).nullable()
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

    getCurrentHistoriesInTeams: protectedProcedure.query(async ({ ctx }) => {
        type TeamWithHistories = Team & { teamHistories: TeamHistory[] };

        // Fetch all teams and team histories
        const allTeams = await ctx.db.team.findMany();
        const allTeamHistories = await ctx.db.teamHistory.findMany();

        // Create a map of team histories indexed by teamID
        const teamHistoriesMap: Record<number, TeamHistory[]> = allTeamHistories.reduce((acc: Record<number, TeamHistory[]>, teamHistory) => {
            const teamID: number = teamHistory.teamID;
            acc[teamID] = acc[teamID] ?? [];
            if (teamHistory.endSem === null && teamHistory.endYear === null) {
                acc[teamID]?.push(teamHistory);
            }
            return acc;
        }, {});

        // Join teams with their corresponding team histories
        const teamsWithTeamHistories: TeamWithHistories[] = allTeams.map((team: Team) => ({
            ...team,
            teamHistories: teamHistoriesMap[team.teamID] ?? [],
        }));

        // Filter out teams without current team histories
        const filteredTeamsWithTeamHistories = teamsWithTeamHistories.filter(team => team.teamHistories.length > 0);

        return filteredTeamsWithTeamHistories;
    }),

    getTeamsFromSem: protectedProcedure.query(async ({ ctx }) => {
        // Fetch all team histories
        const allTeamHistories = await ctx.db.teamHistory.findMany();
        const allTeams = await ctx.db.team.findMany();

        // Create a map of team histories indexed by Sem_year
        const teamHistoriesOverTime: Record<string, Team[]> = allTeamHistories.reduce((acc: Record<string, Team[]>, teamHistory) => {
            // Generate a key for the team history based on start and end year and semester
            let year = teamHistory.startYear;
            while (year <= (teamHistory.endYear ?? new Date().getFullYear())) {
                const identifiedTeam = allTeams.find((team) => team.teamID === teamHistory.teamID)!;

                if (year === teamHistory.startYear && teamHistory.startSem === SemType.FALL) {
                    const semYearKey = `${year}_${SemType.FALL}`;
                    acc[semYearKey] = [...(acc[semYearKey] ?? []), identifiedTeam];

                } else if (year === teamHistory.endYear && teamHistory.endSem === SemType.SPRING) {
                    const semYearKey = `${year}_${SemType.SPRING}`;
                    acc[semYearKey] = [...(acc[semYearKey] ?? []), identifiedTeam];
                } else if (year === new Date().getFullYear()) {
                    const currentMonth = new Date().getMonth() + 1; // January is month 0
                    const currentSem = currentMonth >= 1 && currentMonth <= 5 ? SemType.SPRING : SemType.FALL;

                    if (currentSem === SemType.FALL) {
                        const semYearKey1 = `${year}_${SemType.FALL}`;
                        const semYearKey2 = `${year}_${SemType.SPRING}`;
                        acc[semYearKey1] = [...(acc[semYearKey1] ?? []), identifiedTeam];
                        acc[semYearKey2] = [...(acc[semYearKey2] ?? []), identifiedTeam];
                    } else {
                        const semYearKey = `${year}_${SemType.SPRING}`;
                        acc[semYearKey] = [...(acc[semYearKey] ?? []), identifiedTeam];
                    }
                } else {
                    const semYearKey1 = `${year}_${SemType.FALL}`;
                    const semYearKey2 = `${year}_${SemType.SPRING}`;
                    acc[semYearKey1] = [...(acc[semYearKey1] ?? []), identifiedTeam];
                    acc[semYearKey2] = [...(acc[semYearKey2] ?? []), identifiedTeam];
                }
                // Move to the next year
                year++;
            }
            return acc;
        }, {});

        return teamHistoriesOverTime;
    }),

})