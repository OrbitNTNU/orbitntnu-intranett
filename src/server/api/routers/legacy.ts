import { type MemberAndHistory } from "@/pages/legacy";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const legacyRouter = createTRPCRouter({
    getAllMembersAndTeamHistories: protectedProcedure.query(async ({ ctx }) => {
        const legacyMembers = await ctx.db.member.findMany();

        const membersAndTeamHistories: MemberAndHistory[] = [];

        for (const member of legacyMembers) {
            const teams = await ctx.db.teamHistory.findMany({
                where: {
                    memberID: member.memberID,
                },
            });
            membersAndTeamHistories.push({member: member, teamHistories: teams});
        }

        return membersAndTeamHistories;
    })
})