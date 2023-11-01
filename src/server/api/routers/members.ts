import { Member } from "@/interfaces/Member"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const membersRouter = createTRPCRouter({
    getMembers: publicProcedure.query (async ({ ctx }) => {
        const members = await ctx.db.member.findMany() as Member[]
        return members;
        }
    )
})

