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
});