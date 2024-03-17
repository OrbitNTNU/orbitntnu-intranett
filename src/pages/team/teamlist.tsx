import BreakLine from "@/components/General/Breakline";
import Icons from "@/components/General/Icons";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import type { Team } from "@prisma/client";
import Link from "next/link";

const TeamListPage = () => {
    const teamsData = api.teams.getTeams.useQuery();
    const teams: Team[] = teamsData.data ?? [];

    return (
        <Layout>
            <div className='items-center flex flex-row gap-6'>
                <Link href="/">
                    <Icons name="ArrowLeft_lg" />
                </Link>
                <h1>Current Teams in Orbit</h1>
            </div>
            <BreakLine />
            <div>
                {teams.map((team) => (
                    <Link href={"/team/" + team.teamID} key={team.teamID}>
                        <div className="bg-blue-600 hover:bg-blue-800 gap-6 p-6 m-4 rounded-md">
                            <h2>{team.teamName}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default TeamListPage;
