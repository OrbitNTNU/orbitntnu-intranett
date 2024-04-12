import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod";
import { db } from "@/server/db";

export const membersRouter = createTRPCRouter({
    getMembers: protectedProcedure.query(async ({ ctx }) => {
        const members = await ctx.db.member.findMany();
        return members;
    }),

    getMemberById: protectedProcedure.input(z.number()).query(async (opts) => {
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

    getMemberByOrbitMail: protectedProcedure.input(z.string()).query(async (opts) => {
        const member = await opts.ctx.db.member.findFirst({
            where: { orbitMail: opts.input },
        });

        return member;
    }),

    createMember: protectedProcedure
        .input(z.object({
            name: z.string(),
            activeStatus: z.boolean(),
            fieldOfStudy: z.string().nullable(),
            ntnuMail: z.string().nullable(),
            orbitMail: z.string(),
            phoneNumber: z.string().nullable(),
            yearOfStudy: z.number().nullable(),
            birthday: z.date().nullable(),
            nationalities: z.string().nullable(),
            additionalComments: z.string().nullable(),
            personalMail: z.string().nullable(),
        })
        )
        .mutation(async (opts) => {

            const foundMember = await db.member.findUnique({
                where: {
                    orbitMail: opts.input.orbitMail,
                }
            });

            if (!foundMember) {
                const { input } = opts;

                // Create a new user in the database
                const member = await db.member.create({
                    data: input,
                });

                return member;
            }

            return foundMember;
        }),

    updateMemberInformation: protectedProcedure
        .input(z.object({
            name: z.string(),
            activeStatus: z.boolean(),
            fieldOfStudy: z.string().nullable(),
            ntnuMail: z.string().nullable(),
            orbitMail: z.string(),
            phoneNumber: z.string().nullable(),
            yearOfStudy: z.number().nullable(),
            birthday: z.date().nullable(),
            nationalities: z.string().nullable(),
            additionalComments: z.string().nullable(),
            personalMail: z.string().nullable(),
            linkedin: z.string().nullable(),
            showPhoneNrOnWebsite: z.boolean(),
        })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            // Find the member by orbitMail
            const foundMember = await db.member.findUnique({
                where: {
                    orbitMail: input.orbitMail,
                },
            });

            if (foundMember) {
                // Update the existing member information
                const updatedMember = await db.member.update({
                    where: {
                        orbitMail: input.orbitMail,
                    },
                    data: input,
                });

                return updatedMember;
            } 

            // Member not found, return null or handle accordingly
            return null;
        }),
})

