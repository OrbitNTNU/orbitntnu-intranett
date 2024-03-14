import { createTRPCRouter, protectedProcedure } from "../trpc";

export const memesRouter = createTRPCRouter({

    getMemes: protectedProcedure.query(async ({ ctx }) => {
        const allMemes = await ctx.db.meme.findMany();
        return allMemes;
    })
})