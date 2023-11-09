import { Application } from "@/interfaces/Application";
import { InterestedIn } from "@/interfaces/InterestedIn";
import { Interview } from "@/interfaces/Interview";
import { Member } from "@/interfaces/Member";
import { Team } from "@/interfaces/Team";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

export const applicationsRouter = createTRPCRouter({
    getAllRelevantApplications: publicProcedure.query(async ({ ctx }) => {
        const currentTeam = await ctx.db.member.findUnique({
            where: {
                googleToken: ctx.session?.user.id,
            },
            // select: {
            //     memberID: false,
            //     team: {
            //         select: {
            //             teamID: true,
            //         },
            //     },
            // },
        });
        const allApplications: Application[] = await ctx.db.application.findMany({
            where: {
                teams: {
                    some: {
                        teamID: teamID,
                    },
                },
            },
        }) as Application[];
        return allApplications;
    }),

    getConflictApplicants: publicProcedure.input(String).query(async (opts) => {
        const allInterestedIn: InterestedIn[] = await opts.ctx.db.interestedIn.findMany() as InterestedIn[];
        const seen = new Set<number>();
        const conflictedInterests = new Set<number>();

        for (const interest of allInterestedIn) {
            if (seen.has(interest.applicationID)) {
                conflictedInterests.add(interest.applicationID);
            } else {
                seen.add(interest.applicationID);
            }
        };

        const session = useSession();
        const thisGoogleID = session.data?.user.id;
        const thisMember = await opts.ctx.db.member.findFirst({
            where: {
                googleToken: opts.input,
            },
        }) as Member;
        const thisMemberID = thisMember.memberID;

        const relevantConflicts: InterestedIn[] = allInterestedIn.filter((interest:InterestedIn) => {
            conflictedInterests.has(interest.applicationID) &&
            interest.memberID === thisMemberID
        })
        return relevantConflicts;
    }),

    
    getInterviewApplications: publicProcedure.input(String).query(async (opts) => {
        // const session = useSession();
        // const thisGoogleID = session.data?.user.id;
        const thisMember = await opts.ctx.db.member.findFirst({
            where: {
                googleToken: opts.input,
            },
        }) as Member;
        const thisMemberID = thisMember.memberID;

        const allInterviews = await opts.ctx.db.interview.findMany({
            where: {
                interviewerID: thisMemberID,
            },
        }) as Interview[];

        const applicationIDs: number[] = allInterviews.map((interview) => interview.applicationID);
        const interviewApplications: Application[] = await opts.ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: applicationIDs,
                },
            },
        }) as Application[];
        return interviewApplications;
    }),
    
    fakeGetConflicts: publicProcedure.query(async (opts) => {
        const allInterestedIn: InterestedIn[] = await opts.ctx.db.interestedIn.findMany() as InterestedIn[];
        const seen = new Set<number>();
        const conflictedInterests: number[] = [];

        for (const interest of allInterestedIn) {
            if (seen.has(interest.applicationID)) {
                conflictedInterests.push(interest.applicationID);
            } else {
                seen.add(interest.applicationID);
            }
        };
        const conflictApplications = await opts.ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: conflictedInterests
                }
            }
        }) as Application[];
        return conflictApplications;
    }),
    
    fakeGetInterviews: publicProcedure.query(async ({ ctx }) => {
        const allInterviews = await ctx.db.interview.findMany() as Interview[];
        // const applications: Application[] = allInterviews.map(interview => interview.application);
        const applicationIDs: number[] = allInterviews.map(interview => interview.applicationID)
        const applications = await ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: applicationIDs
                }
            }
        }) as Application[];
        return applications;
    }),

    fakeGetInterested: publicProcedure.query(async ({ ctx }) => {
        const allInterested = await ctx.db.interestedIn.findMany();
        const applicationIDs: number[] = allInterested.map(interest => interest.applicationID);
        const applications = await ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: applicationIDs
                }
            }
        }) as Application[];
        return applications;
    }),

    fakeGetUnhandled: publicProcedure.query(async ({ ctx }) => {
        // Interested In
        const allInterestedIn: InterestedIn[] = await ctx.db.interestedIn.findMany() as InterestedIn[];
        const seen = new Set<number>();
        const conflictIDs: number[] = [];
        for (const interest of allInterestedIn) {
            if (seen.has(interest.applicationID)) {
                conflictIDs.push(interest.applicationID);
            } else {
                seen.add(interest.applicationID);
            }
        };

        // Interviews
        const allInterviews = await ctx.db.interview.findMany() as Interview[];
        const interviewIDs: number[] = allInterviews.map(interview => interview.applicationID)

        // Accepted
        const accepted = await ctx.db.application.findMany({
            where: {
                accepted: true,
            }
        }) as Application[];
        const acceptedIDs = accepted.map(application => application.applicationID)

        const allApplications = await ctx.db.application.findMany() as Application[];
        const unhandled = allApplications.filter(application => 
            !conflictIDs.includes(application.applicationID) &&
            !interviewIDs.includes(application.applicationID) &&
            !acceptedIDs.includes(application.applicationID)
        );
        return unhandled;
    }),

    getAccepted: publicProcedure.query( async ({ ctx }) => {
        const allAccepted = await ctx.db.application.findMany({
            where: {
                accepted: true,
            }
        }) as Application[];
        return allAccepted;
    }),

    postAcceptApplication: publicProcedure.input(Number).mutation(async (opts) => {
        const updateApplication = await opts.ctx.db.application.update({
            where: {
                applicationID: opts.input,
            },
            data: {
                accepted: true,
            },
        });
    }),

    postUnAcceptApplication: publicProcedure.input(Number).mutation(async (opts) => {
        const updateApplication = await opts.ctx.db.application.update({
            where: {
                applicationID: opts.input,
            },
            data: {
                accepted: false,
            },
        });
    })

});