import type { AppAndTeams } from "@/pages/applications";
import { teamLeadProcedure, createTRPCRouter} from "@/server/api/trpc";
import { TeamHistory_priviledges, type Application, type ApplyForTeam, type Interview} from "@prisma/client";
import { z } from "zod";

export const applicationsRouter = createTRPCRouter({


    /**
     * GETTER METHODS
     */

    getUnhandledApps: teamLeadProcedure.query(async ({ ctx }) => {

        // find client member
        const clientMail = ctx.session?.user.email;
        const clientMember = clientMail ? await ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;

        // find client teamHistory
        const clientTeamHistory = clientMember ? await ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
            }
        }) : null;

        if (clientTeamHistory == null) {
            return [];
        }

        // find all relevant applications
        const allApplications: Application[] = clientTeamHistory ? await ctx.db.application.findMany({
            where: {
                accepted: false,
                teams: {
                    some: {
                        teamID: clientTeamHistory.teamID,
                        interested: true,
                    },
                },
            },
        }) : [];

        const interviews = await ctx.db.interview.findMany();
        const interviewAppIDs = interviews.map(int => int.applicationID);

        // find all applyForTeam for prioritation
        const allApplyForTeam = await ctx.db.applyForTeam.findMany();

        const appsAndTeams: AppAndTeams[] = [];

        // find teams priority
        for (const app of allApplications) {
            if (!interviewAppIDs.includes(app.applicationID)) {
                // Applicant is not taken in for interview
                const teams = allApplyForTeam.filter(appTeam => appTeam.applicationID == app.applicationID);
                const sortedTeams: ApplyForTeam[] = teams.sort((a,b) => (a.priority - b.priority));
                const appAndTeam: AppAndTeams = {applicant: app, teams: sortedTeams}; 
                appsAndTeams.push(appAndTeam);
            }
        }

        return appsAndTeams;
    }),

    
    getInterviewApps: teamLeadProcedure.query(async ({ ctx }) => {

        // Find client member
        const clientMail = ctx.session?.user.email;
        const clientMember = clientMail ? await ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;

        if (clientMember == undefined) {
            return [];
        }

        // find client teamHistory
        const clientTeamHistory = clientMember ? await ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
                priviledges: TeamHistory_priviledges.LEADER,
            }
        }) : null;

        if (clientTeamHistory == null) {
            return [];
        }

        // Find relevant interviews
        const interviews = await ctx.db.interview.findMany({
            where: {
                interviewerID: clientMember.memberID,
            }
        });

        // Find interview applicants
        const interviewApps: Application[] = await ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: interviews.map(interview => (interview.applicationID)),
                },
                accepted: false,
            }
        })

        // find all applyForTeam for prioritation
        const allApplyForTeam = await ctx.db.applyForTeam.findMany();

        const appsAndTeams: AppAndTeams[] = [];

        // find teams priority
        for (const app of interviewApps) {
            const teams = allApplyForTeam.filter(appTeam => appTeam.applicationID == app.applicationID);
            // Only add if not dismissed by client
            for (const applyForTeam of teams) {
                if (applyForTeam.teamID == clientTeamHistory.teamID && applyForTeam.interested == true) {
                    const sortedTeams: ApplyForTeam[] = teams.sort((a,b) => (a.priority - b.priority));
                    const appAndTeam: AppAndTeams = {applicant: app, teams: sortedTeams}; 
                    appsAndTeams.push(appAndTeam);
                }
            }
        };
        
        // return appsAndTeams;
        return appsAndTeams;
    }),
    

    getAccepted: teamLeadProcedure.query( async ({ ctx }) => {
        const clientMember = ctx.session.user.member;
        
        const clientTeamHistory = clientMember ? await ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
            }
        }): null;

        if (clientTeamHistory == null) return [];

        const applications = await ctx.db.application.findMany({
            where: {
                accepted: true,
                teams: {
                    some: {
                        teamID: clientTeamHistory.teamID,
                    }
                }
            }
        });

        if (applications == null || applications.length == 0) return [];

        // find all applyForTeam for prioritation
        const allApplyForTeam = await ctx.db.applyForTeam.findMany();
        
        const appsAndTeams: AppAndTeams[] = [];
        
        // find teams priority
        for (const app of applications) {
            const teams = allApplyForTeam.filter(appTeam => appTeam.applicationID == app.applicationID);
            const sortedTeams: ApplyForTeam[] = teams.sort((a,b) => (a.priority - b.priority));
            const appAndTeam: AppAndTeams = {applicant: app, teams: sortedTeams}; 
            appsAndTeams.push(appAndTeam);
        }

        const acceptedByClient: AppAndTeams[] = [];

        for (const appTeam of appsAndTeams) {
            for (const team of appTeam.teams) {
                if (team.teamID == clientTeamHistory.teamID) {
                    acceptedByClient.push(appTeam);
                    break;
                } else if (team.interested == true) {
                    break;
                }
            }
        }

        return acceptedByClient;
    }),


    getDismissed: teamLeadProcedure.query( async ({ ctx }) => {
        
        // find client member
        const clientMail = ctx.session?.user.email;
        const clientMember = clientMail ? await ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;
        
        // find client teamHistory
        const clientTeamHistory = clientMember ? await ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
                priviledges: TeamHistory_priviledges.LEADER,
            }
        }) : null;
        
        if (clientTeamHistory == null) return [];
        
        const allDismissedApplyForTeam = await ctx.db.applyForTeam.findMany({
            where: {
                teamID: clientTeamHistory.teamID,
                interested: false,
            }
        });
        
        const allDismissedApplicants = await ctx.db.application.findMany({
            where: {
                applicationID: {
                    in: allDismissedApplyForTeam.map(applyForTeam => (applyForTeam.applicationID))
                }
            }
        })
        
        // find all applyForTeam for prioritation
        const allApplyForTeam = await ctx.db.applyForTeam.findMany();
        
        const appsAndTeams: AppAndTeams[] = [];
        
        // find teams priority
        for (const app of allDismissedApplicants) {
            const teams = allApplyForTeam.filter(appTeam => appTeam.applicationID == app.applicationID);
            const sortedTeams: ApplyForTeam[] = teams.sort((a,b) => (a.priority - b.priority));
            const appAndTeam: AppAndTeams = {applicant: app, teams: sortedTeams}; 
            appsAndTeams.push(appAndTeam);
        }
        
        return appsAndTeams;
    }),

    
    findInterview: teamLeadProcedure.input(z.object ({appID: z.number()})).query(async (opts) => {
        const interview = await opts.ctx.db.interview.findUnique({
            where: {
                applicationID: opts.input.appID,
            }
        })!;
        return interview;
    }),


    teamIDAndNames: teamLeadProcedure.query(async ({ ctx }) => {
        const allTeams = await ctx.db.team.findMany();
        return allTeams;
    }),


    clientTeamID: teamLeadProcedure.query(async ({ ctx }) => {
        // find client member
        const clientMail = ctx.session?.user.email;
        const clientMember = clientMail ? await ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;

        // find client teamHistory
        const clientTeamHistory = clientMember ? await ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
                priviledges: TeamHistory_priviledges.LEADER,
            }
        }) : null;

        return clientTeamHistory?.teamID;
    }),


    /**
     * MUTATION METHODS
     */


    postInterview: teamLeadProcedure.input(z.object ({appID: z.number()})).mutation(async (opts) => {

        const allInterviews = await opts.ctx.db.interview.findMany();
        for (const int of allInterviews) {
            if (int.applicationID == opts.input.appID) {
                return "Det finnes allerede et intervju for denne applicanten.";
            }
        }

        const clientMail = opts.ctx.session?.user.email;
        const clientMember = clientMail ? await opts.ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            },
        }) : null;

        if (clientMember == null) {
            return "Finner ikke medlemmet";
        };

        const newInterview: Interview = {
            interviewerID: clientMember.memberID,
            applicationID: opts.input.appID,
            room: "null",
            time: new Date(),
        };

        const interview = await opts.ctx.db.interview.create({
            data: newInterview,
        });
        return interview;
    }),


    postAcceptApplication: teamLeadProcedure.input(z.object ({appID: z.number()})).mutation(async (opts) => {

        // client info
        const clientMember = opts.ctx.session.user.member;
        const clientTeamHistory = await opts.ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
            }
        });
        if (clientTeamHistory == null) return false;

        // check if client is applicants current first priority
        // I.e., check if client is allowed to accept applicant
        const applyForTeams = await opts.ctx.db.applyForTeam.findMany({
            where: {
                applicationID: opts.input.appID,
            }
        });
        const sortedApplyForTeams = applyForTeams.sort((a,b) => (a.priority - b.priority))
        for (const team of sortedApplyForTeams) {
            if (team.teamID == clientTeamHistory.teamID && team.interested) {
                break;
            } else if (team.interested) {
                return false;
            }
        }

        // Accept applicant
        await opts.ctx.db.application.update({
            where: {
                applicationID: opts.input.appID,
            },
            data: {
                accepted: true,
            },
        });
        return true;
    }),


    dismiss: teamLeadProcedure
        .input(z.object ({appID: z.number()}))
        .mutation(async (opts) => {

        // find client member
        const clientMail = opts.ctx.session?.user.email;
        const clientMember = clientMail ? await opts.ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;

        // find client teamHistory
        const clientTeamHistory = clientMember ? await opts.ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
            }
        }) : null;

        if (clientTeamHistory == null) return false;

        await opts.ctx.db.applyForTeam.update({
            where: {
                applicationID_teamID: {
                    applicationID: opts.input.appID,
                    teamID: clientTeamHistory.teamID,
                }
            },
            data: {
                interested: false,
            }
        });

        const allInterestedTeams = await opts.ctx.db.applyForTeam.findMany({
            where: {
                applicationID: opts.input.appID,
                interested: true,
            }
        });

        if (!Array.isArray(allInterestedTeams) || allInterestedTeams.length == 0) {
            // Applicant is not wanted by any teams
            await opts.ctx.db.application.update({
                where: {
                    applicationID: opts.input.appID,
                },
                data: {
                    rejectTime: new Date(),
                },
            });
        };

        return true;
    }),


    /**
     * ALL METHODS UNDER HERE ARE TEMPORARY
     * 
     * THEY EXIST TO MAKE TESTING EASIER
    */


    deleteInterview: teamLeadProcedure.input(z.object ({appID: z.number()})).mutation(async (opts) => {
        const delInterview = opts.ctx.db.interview.delete({
            where: {
                applicationID: opts.input.appID,
            }
        });
        return delInterview;
    }),


    unAccept: teamLeadProcedure
        .input(z.object ({appID: z.number()}))
        .mutation(async (opts) => {
        
        await opts.ctx.db.application.update({
            where: {
                applicationID: opts.input.appID,
            },
            data: {
                accepted: false,
            }
        });
    }),


    unDismiss: teamLeadProcedure
        .input(z.object ({appID: z.number()}))
        .mutation(async (opts) => {

        // find client member
        const clientMail = opts.ctx.session?.user.email;
        const clientMember = clientMail ? await opts.ctx.db.member.findUnique({
            where: {
                orbitMail: clientMail,
            }
        }) : null;

        // find client teamHistory
        const clientTeamHistory = clientMember ? await opts.ctx.db.teamHistory.findFirst({
            where: {
                memberID: clientMember.memberID,
                endSem: null,
                priviledges: TeamHistory_priviledges.LEADER,
            }
        }) : null;

        if (clientTeamHistory == null) return false;

        await opts.ctx.db.applyForTeam.update({
            where: {
                applicationID_teamID: {
                    applicationID: opts.input.appID,
                    teamID: clientTeamHistory.teamID,
                }
            },
            data: {
                interested: true,
            }
        });

        return true;
    }),
});