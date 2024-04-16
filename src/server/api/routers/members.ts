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

    getStudies: protectedProcedure.query(async ({ ctx }) => {
        const members = await ctx.db.member.findMany();

        // Initialize an empty object to hold the study counts
        const studyCounts: Record<string, number> = {};

        // Loop through the members and count the occurrences of each field of study
        members.forEach(member => {
            if (member.activeStatus) {
                const fieldOfStudy = member.fieldOfStudy?.trim() ?? "No Data";
                if (studyCounts[fieldOfStudy]) {
                    studyCounts[fieldOfStudy]++;
                } else {
                    studyCounts[fieldOfStudy] = 1;
                }
            }
        });

        // Convert studyCounts object to an array of key-value pairs
        const studyCountsArray = Object.entries(studyCounts);

        // Sort the studyCountsArray based on the count and then alphabetically if count is the same
        studyCountsArray.sort((a, b) => {
            if (a[0] === "No Data") {
                // If a is "No Data", place it at the end regardless of the count
                return 1;
            } else if (b[0] === "No Data") {
                // If b is "No Data", place it at the end regardless of the count
                return -1;
            } else if (b[1] === a[1]) {
                // If counts are the same, sort alphabetically by field of study
                return a[0].localeCompare(b[0]);
            } else {
                // Otherwise, sort by count in descending order
                return b[1] - a[1];
            }
        });

        // Convert the sorted array back to an object
        const sortedStudyCounts: Record<string, number> = {};
        studyCountsArray.forEach(([fieldOfStudy, count]) => {
            sortedStudyCounts[fieldOfStudy] = count;
        });

        return sortedStudyCounts;
    }),

    getAges: protectedProcedure.query(async ({ ctx }) => {
        interface AgeDistribution {
            age: string;
            count: number;
        }
        
        const members = await ctx.db.member.findMany();
    
        // Initialize an empty object to hold the age counts
        const agesCounts: Record<string, number> = {};
    
        // Function to calculate age based on birthday
        const calculateAge = (birthday: Date | null): string => {
            if (!birthday) return "No Data";
            
            // Get the current date
            const today = new Date();
            
            // Get the birth date
            const birthDate = new Date(birthday);
            
            // Calculate the difference in years
            let age = today.getFullYear() - birthDate.getFullYear();
            
            // Check if the current date is before the birthday this year
            const hasBirthdayPassedThisYear =
                today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
            
            // If the birthday has not passed yet this year, decrement the age
            if (!hasBirthdayPassedThisYear) {
                age--;
            }
            
            return String(age);
        };
    
        // Loop through the members and count the occurrences of each age
        members.forEach(member => {
            if(member.activeStatus) {
                const memberAge = calculateAge(member.birthday);
    
                if (agesCounts[memberAge]) {
                    agesCounts[memberAge]++;
                } else {
                    agesCounts[memberAge] = 1;
                }
            }
        });
    
        // Convert the age counts object into an array of objects
        const ageDistribution: AgeDistribution[] = Object.entries(agesCounts).map(([age, count]) => ({
            age,
            count
        }));
    
        return ageDistribution;
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

