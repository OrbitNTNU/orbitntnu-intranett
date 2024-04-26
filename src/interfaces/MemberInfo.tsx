import type { $Enums } from "@prisma/client";

type Team = {
    teamID: number;
    teamName: string;
    group: $Enums.Team_group | null;
};

type TeamHistory = {
    team: Team
    teamHistoryID: number;
    cPosition: $Enums.TeamHistory_cPosition;
    priviledges: $Enums.TeamHistory_priviledges;
    decorativeTitle: string | null;
    // Add other properties here
};

export type MemberInfoData = {
    teamHistory: TeamHistory[];
    memberID: number;
    activeStatus: boolean;
    orbitMail: string;
    name: string;
};
