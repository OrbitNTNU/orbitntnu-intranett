import { Member } from "@/interfaces/Member"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const membersRouter = createTRPCRouter({
    getMembers: publicProcedure.query(async ({ ctx }) => {
        const members = await ctx.db.member.findMany() as Member[]
        return members;
    }
    ),

    getMemberById: publicProcedure.input(Number).query(async (opts) => {
        if (!opts.input) {
            throw new Error("Input is missing.");
        }

        const member = await opts.ctx.db.member.findUnique({
            where: { memberID: opts.input },
        }) as Member | null;

        if (!member) {
            throw new Error("Member not found");
        }

        return member;
    })
})

