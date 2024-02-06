import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod";
import { db } from "@/server/db";

export const membersRouter = createTRPCRouter({
    getMembers: publicProcedure.query(async ({ ctx }) => {
        const members = await ctx.db.member.findMany();
        return members;
    }),

    getMemberById: publicProcedure.input(Number).query(async (opts) => {
        if (!opts.input) {
            throw new Error("Input is missing.");
        }

        const member = await opts.ctx.db.member.findUnique({
            where: { memberID: opts.input },
        });

        if (!member) {
            throw new Error("Member not found");
        }

        return member;
    }),

    getMemberByOrbitMail: publicProcedure.input(String).query(async (opts) => {
        const member = await opts.ctx.db.member.findUnique({
            where: { orbitMail: opts.input },
        });
    
        return member;
    }),

    createMember: publicProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            activeStatus: z.boolean(),
            fieldOfStudy: z.string(),
            phoneNumber: z.string(),
            ntnuMail: z.string(),
            orbitMail: z.string(),
            })
        )
        .mutation(async (opts) => {

            const foundMember = await db.member.findUnique({
                where: {
                    orbitMail: opts.input.orbitMail,
                }
            });

            if(!foundMember) {
                const { input } = opts;

                // Create a new user in the database
                const member = await db.member.create({
                    data: input,
                });
    
                return member;
            }
            
            return foundMember;
        }),
})

