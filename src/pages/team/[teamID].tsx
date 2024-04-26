import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import Icons from "@/components/General/Icons";
import { Loading } from "@/components/General/Loading";
import MemberInfo from "@/components/General/MemberInfo";
import type { MemberInfoData } from "@/interfaces/MemberInfo";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import EditTeamsView from "@/views/EditTeamsView";
import { TeamHistory_cPosition, type TeamHistory } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TeamsPage = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const [updateFlag, setUpdateFlag] = useState<boolean>(false); // State variable to trigger rerender

    const router = useRouter();
    const { teamID } = router.query;

    const session = useSession();

    const teamsPageInfoData = api.members.getTeamPageInfo;
    const sessionTeamAndTLorBoard = api.members.getTeamAndTLorBoard;

    const memberInfo = sessionTeamAndTLorBoard.useQuery(session.data?.user.member.memberID ?? 0);
    const sessionMemberData = memberInfo && memberInfo.data;

    const teamMembersInfo = teamsPageInfoData.useQuery(Number(router.isReady && teamID !== "find" ? teamID : sessionMemberData ? sessionMemberData.teamID : 0));

    const membersInTeam = teamMembersInfo && teamMembersInfo.data;
    const teamLeader = membersInTeam?.find((member) => {
        // Check if member has team history
        if (member.teamHistory) {
            // Check if any team history has the privilege "LEADER"
            return member.teamHistory.some((history: TeamHistory) => history.priviledges === "LEADER")
        }
        return false; // Return false if member has no team history
    });
    const team = membersInTeam?.find((member) =>
        member.teamHistory?.some((history) => history.teamID === Number(teamID))
    )?.teamHistory[0]?.team;

    const isSessionLeaderOrBoard = sessionMemberData?.hasTLorBoard;

    useEffect(() => {
        // Effect to handle the rerender when updateFlag changes
    }, [updateFlag]); // Dependency array includes updateFlag
    
    if (teamID == "find") {
        if (sessionMemberData) {
            void router.push("/team/" + sessionMemberData.teamID)
        }
    }

    console.log(Object.values(TeamHistory_cPosition) as string[]);
    
    if (!router.isReady || teamID === "find" || !sessionMemberData) {
        return (
            <Layout>
                <Loading />
            </Layout>
        )
    };

    const handleActionTriggered = () => {
        setUpdateFlag(prevFlag => !prevFlag);
    };
    
    return (
        <Layout>
            {!isSessionLeaderOrBoard ? (
                // Render content when the user is not a leader or board member
                <>
                    <div className='md:flex justify-between items-center'>
                        <ul className='items-center flex flex-row gap-6'>
                            <Link href="/team/teamlist">
                                <Icons name="ArrowLeft_lg" />
                            </Link>
                            <h1>{team?.teamName}</h1>
                        </ul>
                    </div>
                    <BreakLine />
                    <div className="flex justify-center flex-wrap">
                        {/* Render the team leader first */}
                        {teamLeader && (
                            <MemberInfo isTeamLead={true} memberInfo={teamLeader as MemberInfoData} onClick={() => void router.push("/profile/" + teamLeader.memberID)} />
                        )}
                        {membersInTeam?.map((member) => (
                            // Skip rendering the team leader again
                            !teamLeader || member.memberID !== teamLeader.memberID ? (
                                <MemberInfo key={member.memberID} memberInfo={member as MemberInfoData} onClick={() => void router.push("/profile/" + member.memberID)} />
                            ) : null
                        ))}
                    </div>
                </>
            ) : (
                // Render content when the user is a leader or board member
                <>
                    <div className='md:flex justify-between items-center'>
                        <ul className='items-center flex flex-row gap-6'>
                            <Link href="/team/teamlist">
                                <Icons name="ArrowLeft_lg" />
                            </Link>
                            <h1>{team?.teamName}</h1>
                        </ul>
                        <div className="md:mt-0 mt-4">
                            <Button label={edit ? 'Finish Editing' : 'Edit Team'} onClick={() => setEdit(!edit)} icon={edit ? 'Check' : 'Settings'} />
                        </div>
                    </div>
                    <BreakLine />
                    {edit ? (
                        <EditTeamsView
                            teamLeader={teamLeader as MemberInfoData}
                            membersInTeam={membersInTeam as MemberInfoData[]}
                            team={team}
                            onActionTriggered={handleActionTriggered}
                        />
                    ) : (
                        <>
                            <div className="flex justify-center flex-wrap">
                                {/* Render the team leader first */}
                                {teamLeader && (
                                    <MemberInfo isTeamLead={true} memberInfo={teamLeader as MemberInfoData} onClick={() => void router.push("/profile/" + teamLeader.memberID)} />
                                )}
                                {membersInTeam?.map((member) => (
                                    // Skip rendering the team leader again
                                    !teamLeader || member.memberID !== teamLeader.memberID ? (
                                        <MemberInfo key={member.memberID} memberInfo={member as MemberInfoData} onClick={() => void router.push("/profile/" + member.memberID)} />
                                    ) : null
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </Layout>
    );
}

export default TeamsPage;
