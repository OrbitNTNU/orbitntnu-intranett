import BreakLine from "@/components/General/Breakline";
import { Loading } from "@/components/General/Loading";
import Layout from "@/components/General/Layout";
import { api } from "@/utils/api";
import type { Team } from "@prisma/client";
import Link from "next/link";

const TeamListPage = () => {
    const { data: teamsData, isLoading: isTeamsLoading } = api.teams.getActiveTeams.useQuery();

    const groupedTeams: Record<string, Team[]> = teamsData
        ? teamsData
            .reduce((acc: Record<string, Team[]>, team) => {
                const groupKey: string = team.group ? String(team.group) : "OTHER";
                if (!acc[groupKey]) {
                    acc[groupKey] = [];
                }
                acc[groupKey]?.push(team);
                return acc;
            }, {})
        : {};

    // Sort the keys alphabetically and then reduce them into a new object with sorted keys
    const sortedGroupedTeams: Record<string, Team[]> = Object.keys(groupedTeams)
        .sort()
        .reduce((sortedAcc: Record<string, Team[]>, key) => {
            // Replace underscores with spaces in the key
            const teamKey = key.replace(/_/g, ' ').replace(/AND/g, '&');
            const sortedTeams = groupedTeams[key]?.sort((a, b) => a.teamName.localeCompare(b.teamName));
            if (sortedTeams) {
                sortedAcc[teamKey] = sortedTeams;
            }
            return sortedAcc;
        }, {});

    // Move the "OTHER" group to the end of the record
    if (sortedGroupedTeams.OTHER) {
        const otherGroup = sortedGroupedTeams.OTHER;
        delete sortedGroupedTeams.OTHER;
        sortedGroupedTeams.OTHER = otherGroup;
    }

    return (
        <Layout>
            <div className='items-center flex flex-row gap-6'>
                <h1>Current Teams in Orbit</h1>
            </div>
            <BreakLine />
            <div>
                {(isTeamsLoading) ? (
                    <Loading />
                ) : (
                    Object.entries(sortedGroupedTeams).map(([group, teams]) => (
                        <div key={group}>
                            <h2 className="ml-4 mt-8">{group}</h2>
                            {teams.map((team) => (
                                <Link href={`/team/${team.teamID}`} key={team.teamID}>
                                    <div className="bg-blue-600 hover:bg-blue-800 gap-6 p-6 m-4 rounded-md">
                                        <h2>{team.teamName}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
};

export default TeamListPage;
