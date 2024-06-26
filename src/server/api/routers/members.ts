import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod";
import { db } from "@/server/db";
import type { Member, Team, TeamHistory } from "@prisma/client";

export const membersRouter = createTRPCRouter({
    getMembers: protectedProcedure.query(async ({ ctx }) => {
        const members = await ctx.db.member.findMany();
        return members;
    }),

    getMemberById: protectedProcedure.input(z.number()).query(async (opts) => {
        if (!opts.input) {
            throw new Error("Input is missing.");
        }

        const sessionMemeberInfo = opts.ctx.session.user.memberInfo;

        const memberID = opts.input;

        type TeamWithDetails = TeamHistory & { team: Team };
        type MemberWithTeamHistory = Member & { teamHistory: TeamWithDetails[] };

        const removeAdditionalComments = (member: MemberWithTeamHistory): Omit<MemberWithTeamHistory, "additionalComments"> => {
            const { additionalComments, ...rest } = member;
            return rest;
        };

        // Board gets total access
        if (sessionMemeberInfo.teamHistory.find((teamHistory) => teamHistory.priviledges === "BOARD")) {
            const member = await opts.ctx.db.member.findUnique({
                where: { memberID },
                include: {
                    teamHistory: {
                        include: {
                            team: true
                        }
                    }
                }
            });

            if (!member) {
                throw new Error("Member not found");
            }

            return member;

            // If it is own profile, do not show additionalComments
        } else if (sessionMemeberInfo.memberID === memberID) {
            const member = await opts.ctx.db.member.findUnique({
                where: { memberID },
                include: {
                    teamHistory: {
                        include: {
                            team: true
                        }
                    }
                }
            });

            if (!member) {
                throw new Error("Member not found");
            }

            return removeAdditionalComments(member);

            // Rest of the members see limited view
        } else {
            const member = await opts.ctx.db.member.findUnique({
                where: { memberID },
                select: {
                    birthday: true,
                    linkedin: true,
                    orbitMail: true,
                    phoneNumber: true,
                    name: true,
                    yearOfStudy: true,
                    fieldOfStudy: true,
                    teamHistory: {
                        include: {
                            team: true
                        }
                    }
                }
            });

            if (!member) {
                throw new Error("Member not found");
            }

            return member;
        }
    }),


    getMemberByOrbitMail: protectedProcedure.input(z.string()).query(async (opts) => {
        const member = await opts.ctx.db.member.findFirst({
            where: { orbitMail: opts.input },
        });

        return member;
    }),

    getNameByID: protectedProcedure.input(z.number().nullable()).query(async (opts) => {
        if (!opts.input) {
            return;
        }

        const name = await opts.ctx.db.member.findUnique({
            select: { name: true },
            where: { memberID: opts.input },
        });

        return name ? { name: name.name } : null;
    }),

    getNameBySession: protectedProcedure.query(async (opts) => {
        const orbitMail = opts.ctx.session.user.email;

        if (orbitMail) {
            const response = await opts.ctx.db.member.findUnique({
                select: { name: true },
                where: { orbitMail: orbitMail },
            });
            return { name: response ? response.name : 'Me' }; // Return { name: null } if name is not available
        }
    }),

    getTeamAndTLorBoard: protectedProcedure.input(z.number()).query(async (opts) => {
        // Fetch team histories for all active members
        const allMemberInformation = await opts.ctx.db.member.findMany({
            where: {
                activeStatus: true,
                memberID: opts.input,
                teamHistory: {
                    some: {
                        endSem: null,
                        endYear: null,
                        priviledges: { in: ['BOARD', 'LEADER'] } // Check for board or leader
                    }
                }
            },
            include: {
                teamHistory: {
                    where: {
                        endSem: null,
                        endYear: null
                    },
                    include: {
                        team: true
                    }
                }
            }
        });

        // Check if there exists a team history with privileges board or leader
        const hasTLorBoard = allMemberInformation.some(member => {
            return member.teamHistory.some(history => ['BOARD', 'LEADER'].includes(history.priviledges));
        });

        // Extract the teamID of the current team
        const teams = allMemberInformation[0]?.teamHistory.map((teamHistory) => teamHistory.team);

        return { hasTLorBoard, teams };
    }),

    getTeamPageInfo: protectedProcedure.input(z.number().nullable()).query(async (opts) => {

        if (!opts.input) {
            return [];
        }

        // Fetch team histories for all active members
        const allMemberInformation = await opts.ctx.db.member.findMany({
            where: {
                activeStatus: true,
                teamHistory: {
                    some: {
                        teamID: opts.input,
                        endSem: null,
                        endYear: null
                    },
                }
            },
            include: {
                teamHistory: {
                    where: {
                        teamID: opts.input,
                        endSem: null,
                        endYear: null
                    },
                    include: {
                        team: true
                    }
                }
            }
        });

        const mappedMemberInfo = allMemberInformation.map(member => ({
            teamHistory: member.teamHistory,
            memberID: member.memberID,
            name: member.name,
            activeStatus: member.activeStatus,
            orbitMail: member.orbitMail,
        }));

        return mappedMemberInfo;
    }),

    getTeamPageInfoByMemberId: protectedProcedure.input(z.number().nullable()).query(async (opts) => {

        if (!opts.input) {
            return null;
        }

        // Fetch team histories for all active members
        const memberInfo = await opts.ctx.db.member.findUnique({
            where: {
                memberID: opts.input,
                activeStatus: true,
            },
            include: {
                teamHistory: {
                    select: {
                        team: {
                            select: {
                                teamName: true,
                                teamID: true
                            }
                        },
                        cPosition: true,
                        priviledges: true,
                    },
                    where: {
                        endSem: null,
                        endYear: null
                    },
                }
            },
        });

        if (memberInfo) {
            return {
                teamHistory: memberInfo.teamHistory,
                memberID: memberInfo.memberID,
                name: memberInfo.name,
                activeStatus: memberInfo.activeStatus,
                orbitMail: memberInfo.orbitMail
            };
        }

        return null;
    }),

    getAllMemberInfo: protectedProcedure.query(async ({ ctx }) => {

        // Fetch team histories for all active members
        const allMemberInformation = await ctx.db.member.findMany({
            include: {
                teamHistory: {
                    where: {
                        endSem: null,
                        endYear: null
                    },
                    include: {
                        team: true,
                    }
                }
            }
        });

        const mappedMemberInfo = allMemberInformation.map(member => ({
            teamHistory: member.teamHistory,
            memberID: member.memberID,
            name: member.name,
            activeStatus: member.activeStatus,
            orbitMail: member.orbitMail,
        }));

        return mappedMemberInfo;
    }),

    getTeamPageInfoByOrbitMail: protectedProcedure.input(z.string()).query(async (opts) => {

        // Fetch team histories for all active members
        const memberInfo = await opts.ctx.db.member.findMany({
            where: {
                orbitMail: opts.input,
                activeStatus: true,
                teamHistory: {
                    some: {
                        endSem: null,
                        endYear: null
                    },
                }
            },
            include: {
                teamHistory: {
                    where: {
                        endSem: null,
                        endYear: null
                    },
                    include: {
                        team: true
                    }
                }
            }
        });

        return memberInfo;
    }),

    getTeamPageInfoByName: protectedProcedure.input(z.string()).query(async (opts) => {

        // Fetch team histories for all active members
        const memberInfo = await opts.ctx.db.member.findFirst({
            where: {
                name: opts.input,
                activeStatus: true,
                teamHistory: {
                    some: {
                        endSem: null,
                        endYear: null
                    },
                }
            },
            include: {
                teamHistory: {
                    where: {
                        endSem: null,
                        endYear: null
                    },
                    include: {
                        team: true
                    }
                }
            }
        });

        return memberInfo;
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
            if (member.activeStatus) {
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

    getLongestMembers: protectedProcedure.query(async ({ ctx }) => {
        interface LongestMembers {
            name: string;
            memberID: number;
            duration: number;
        }

        const members = await ctx.db.member.findMany();

        const teamHistories = await ctx.db.teamHistory.findMany({
            where: {
                member: {
                    activeStatus: true,
                },
            },
            include: {
                member: true,
            },
        });

        // Function to calculate duration between two dates in years
        const calculateDuration = (startDate: Date, endDate: Date): number => {
            const durationInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
            return durationInMonths / 12;
        };

        // Function to merge overlapping periods
        const mergePeriods = (periods: { startDate: Date; endDate: Date }[]): { startDate: Date; endDate: Date }[] => {
            if (!periods.length) return [];

            periods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

            return periods.reduce((merged, current) => {
                if (current) {
                    const last = merged[merged.length - 1];

                    if (last && current.startDate <= last.endDate) {
                        last.endDate = new Date(Math.max(last.endDate.getTime(), current.endDate.getTime()));
                    } else {
                        merged.push(current);
                    }
                }
                return merged;
            }, [] as { startDate: Date; endDate: Date }[]);
        };

        // Collect all periods for each member
        const memberPeriods: Record<number, { startDate: Date; endDate: Date }[]> = {};

        teamHistories.forEach(history => {
            const { memberID, startYear, startSem, endYear, endSem } = history;

            const startMonth = startSem === 'FALL' ? 9 : 1;
            const endMonth = endSem === 'FALL' ? 12 : (endSem === 'SPRING' ? 5 : new Date().getMonth() + 1);
            const endEffectiveYear = endYear ?? new Date().getFullYear();

            const startDate = new Date(startYear, startMonth - 1);
            const endDate = new Date(endEffectiveYear, endMonth - 1);

            if (!memberPeriods[memberID]) {
                memberPeriods[memberID] = [];
            }

            memberPeriods[memberID]?.push({ startDate, endDate });
        });

        // Calculate the total duration for each member
        const memberDurations: Record<number, number> = {};

        Object.keys(memberPeriods).forEach(memberIDStr => {
            const memberID = Number(memberIDStr);
            const periods = memberPeriods[memberID];
            const mergedPeriods = periods && mergePeriods(periods);
        
            const totalDurationInYears = mergedPeriods?.reduce((acc, period) => {
                const duration = calculateDuration(period.startDate, period.endDate);
                return acc + duration;
            }, 0) ?? 0; // Use nullish coalescing operator to provide a default value if totalDurationInYears is undefined
        
            memberDurations[memberID] = totalDurationInYears;
        });

        // Map member durations to the members array
        const memberDurationList: LongestMembers[] = members.map(member => ({
            name: member.name,
            memberID: member.memberID,
            duration: memberDurations[member.memberID] ?? 0,
        }));

        // Sort members by duration and get the top 10
        const top10Members = memberDurationList
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 10);

        return top10Members;
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
            personalMail: z.string().nullable(),
            linkedin: z.string().nullable(),
            showPhoneNrOnWebsite: z.boolean(),
            birthdayBot: z.boolean(),
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

    toggleMemberActiveStatus: protectedProcedure.input(z.number()).mutation(async (opts) => {

        try {
            // Find the member by memberID
            const foundMember = await db.member.findUnique({
                where: {
                    memberID: opts.input,
                },
            });

            if (foundMember) {
                // Toggle the activeStatus
                const updatedMember = await db.member.update({
                    where: {
                        memberID: opts.input,
                    },
                    data: {
                        activeStatus: !foundMember.activeStatus,
                    },
                });

                return updatedMember;
            }

            // Member not found, handle accordingly
            throw new Error("Member not found.");
        } catch (error) {
            // Handle errors appropriately
            console.error("Error toggling member active status:", error);
            throw new Error("Failed to toggle member active status.");
        }
    }),

})

