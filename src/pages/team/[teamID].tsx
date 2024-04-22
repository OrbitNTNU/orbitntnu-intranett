import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import Icons from "@/components/General/Icons";
import { Loading } from "@/components/General/Loading";
import MemberInfo from "@/components/General/MemberInfo";
import SearchBar from "@/components/General/SearchBar";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { type Team, type TeamHistory, type Member, TeamHistory_cPosition } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TeamsPage = () => {
    const membersData = api.members.getMembers.useQuery();
    const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
    const teamsData = api.teams.getTeams.useQuery();

    const router = useRouter();
    const { teamID } = router.query;

    const session = useSession();

    const [edit, setEdit] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [membersInTeam, setMembersInTeam] = useState<Member[]>([]);
    const [currentTL, setCurrentTL] = useState<Member>();

    const [teams, setTeams] = useState<Team[]>([]);
    const [teamHistories, setTeamHistories] = useState<TeamHistory[]>([]);
    const [members, setMembers] = useState<Member[]>([]);

    const teamHistoriesQuery = api.teamHistories.terminateTeamHistory.useMutation();
    const updateMemberQuery = api.members.updateMemberInformation.useMutation();

    const createTeamHistoriesQuery = api.teamHistories.createTeamHistory.useMutation();

    useEffect(() => {
        // Ensure that all necessary data is available before proceeding
        if (membersData.data && teamHistoriesData.data && teamsData.data && router.query.teamID) {
            const members: Member[] = membersData.data ?? [];
            const teamHistories: TeamHistory[] = teamHistoriesData.data ?? [];
            const teams: Team[] = teamsData.data ?? [];

            setMembers(members);
            setTeamHistories(teamHistories);
            setTeams(teams);

            const { teamID } = router.query;
    
            // Find teamHistories associated with the current teamID and active members
            const teamHistoriesFromUrl = teamHistories.filter(history => {
                return history.teamID === Number(teamID) && history.endSem === null && history.endYear === null;
            });
    
            // Extract the memberIDs from these teamHistories
            const memberTeamHistories = teamHistoriesFromUrl.map(history => history.memberID);
    
            // Filter members based on their presence in memberTeamHistories
            const filteredMembers = members.filter(member => memberTeamHistories.includes(member.memberID));
    
            // Update membersInTeam state with the filtered members
            setMembersInTeam(filteredMembers);
    
            // Find the team leader among the members
            const teamLeader = filteredMembers.find(member => {
                const teamHistory = teamHistoriesFromUrl.find(history => history.memberID === member.memberID);
                return teamHistory && teamHistory.priviledges === "LEADER";
            });
    
            setCurrentTL(teamLeader);
        }
    }, [router.query.teamID, router.query, membersData.data, teamHistoriesData.data, teamsData.data]);
    

    const removeMember = (memberToRemove: Member) => {
        const isSure = window.confirm(`Are you sure you want to remove ${memberToRemove.name} from this team?`);

        if (isSure) {
            setMembersInTeam(prevMembers => prevMembers.filter(member => member.memberID !== memberToRemove.memberID));

            const currentTeamHistory: TeamHistory | undefined = teamHistories.find((history): history is TeamHistory =>
                history?.memberID === memberToRemove.memberID &&
                history?.endSem === null &&
                history?.endYear === null &&
                history?.teamID === Number(teamID)
            );

            if (currentTeamHistory && typeof currentTeamHistory.teamHistoryID === 'number') {
                void teamHistoriesQuery.mutateAsync({
                    teamHistoryID: Number(currentTeamHistory?.teamHistoryID),
                });
            } else {
                console.error("currentTeamHistory is not of the correct type or not found");
            }

            const allTeamHistoriesForMember: TeamHistory[] | undefined = teamHistories.filter((history): history is TeamHistory =>
                history?.memberID === memberToRemove.memberID &&
                history?.endSem === null &&
                history?.endYear === null
            );

            // Function to check if there is any team history entry with the same MemberID where endSem and endYear are both null
            const isMemberActive = allTeamHistoriesForMember?.length > 1;

            if (!isMemberActive) {
                // Update the member to inactive if no active team history entry exists
                void updateMemberQuery.mutateAsync({
                    ...memberToRemove,
                    activeStatus: false
                });
            }
        }
    };

    const addMember = (memberToAdd: Member) => {
        const isSure = window.confirm(`Are you sure you want to add ${memberToAdd.name} to this team?`);
        // If user confirms, call the API to add the member
        if (isSure) {
            setMembersInTeam(prevMembers => [...prevMembers, memberToAdd]);
            if (Number(teamID) === 1) {
                // Prompt the user to select a CPosition
                const optionsString = Object.keys(TeamHistory_cPosition).join('\n');
                const cPosition = prompt(`Select type C Position for ${memberToAdd.name} from the following options:\n${optionsString}`) as TeamHistory_cPosition;
                // Check if the user has entered a CPosition
                if (Object.keys(TeamHistory_cPosition).includes(cPosition)) {
                    void createTeamHistoriesQuery.mutateAsync({
                        priviledges: "BOARD",
                        memberID: memberToAdd.memberID,
                        teamID: Number(teamID),
                        cPosition: cPosition // Assign the selected CPosition
                    });

                    void updateMemberQuery.mutateAsync({
                        ...memberToAdd,
                        activeStatus: true
                    });
                } else {
                    prompt('Please type a C position exactly as shown');
                }
            } else {
                void createTeamHistoriesQuery.mutateAsync({
                    priviledges: Number(teamID) === 18 ? "MENTOR" : "MEMBER",
                    memberID: memberToAdd.memberID,
                    teamID: Number(teamID),
                    cPosition: null,
                })

                void updateMemberQuery.mutateAsync({
                    ...memberToAdd,
                    activeStatus: true
                });

                void membersData.refetch();
            }
        }
    };

    const addTL = (membersInTeam: Member[], currentTeamLeader: Member) => {
        // Prompt the user to select a member from the provided array of members
        const selectedMember = window.prompt(`Choose the member you wish to promote as the new team leader:\n${membersInTeam.map(member => `${member.name}`).join('\n')}`);

        // Find the selected member object from the array based on the user's input
        const newTeamLeader = members.find(member => `${member.name}` === selectedMember);

        // Check if a member is selected and the user confirms the action
        if (newTeamLeader && window.confirm(`Are you sure you want to change the team leader to ${newTeamLeader.name}?`)) {
            // Prompt the user to select a member from the provided array of members
            setCurrentTL(newTeamLeader);
            removeMember(currentTeamLeader);

            const oldTLHistory: TeamHistory | undefined = teamHistories.find((history): history is TeamHistory =>
                history?.memberID === currentTeamLeader.memberID &&
                history?.endSem === null &&
                history?.endYear === null &&
                history?.teamID === Number(teamID)
            );

            const newTLHistory: TeamHistory | undefined = teamHistories.find((history): history is TeamHistory =>
                history?.memberID === newTeamLeader.memberID &&
                history?.endSem === null &&
                history?.endYear === null &&
                history?.teamID === Number(teamID)
            );

            try {
                // Perform API call to update the team leader

                // Optional: Update the previous team leader's role to a regular member
                if (currentTeamLeader) {

                    void teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(oldTLHistory?.teamHistoryID),
                    })

                    void teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(newTLHistory?.teamHistoryID),
                    })

                    void createTeamHistoriesQuery.mutateAsync({
                        priviledges: "LEADER",
                        memberID: newTeamLeader.memberID,
                        teamID: Number(teamID),
                        cPosition: null,
                    })
                }
                void router.push("/team/" + String(teamID));

                // Notify the user about the successful update
                alert(`Successfully updated the team leader to ${newTeamLeader.name}`);
            } catch (error) {
                console.error('Error occurred while updating the team leader:', error);
                alert('Failed to update the team leader. Please try again later.');
            }
        } else {
            // Handle if the user cancels or provides invalid input
            alert('Operation canceled or invalid selection.');
        }
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const filteredMembers = members.filter(member => {
        // Convert searchQuery and member names to lowercase for case-insensitive search
        const searchValue = searchQuery.toLowerCase();
        const fullName = member.name.toLowerCase();

        // Check if the member is already in membersInTeam
        const isInTeam = membersInTeam.some(teamMember => teamMember.memberID === member.memberID);

        // Return true if the member is not already in membersInTeam and matches the search query
        return !isInTeam && (fullName.includes(searchValue) || member.orbitMail.toLowerCase().includes(searchValue));
    });

    if (teamID == "find") {
        const sessionMember = members.find(member => member.orbitMail === session.data?.user.email);

        if (sessionMember) {
            const sessionMemberID = sessionMember.memberID;
            const teamHistoriesFromSession = teamHistories.filter(history => {
                return history.memberID === sessionMemberID && history.endSem === null && history.endYear === null;
            });

            void router.push("/team/" + teamHistoriesFromSession[0]?.teamID)
        }
    }

    if (!router.isReady || teamID === "find") {
        return (
            <Layout>
                <Loading />
            </Layout>
        )
    };

    const sessionMember = session.data?.user.member;

    if (sessionMember) {
        const isLeaderOrBoard = teamHistories.find((history): history is TeamHistory =>
            history?.memberID === sessionMember.memberID &&
            history?.endSem === null &&
            history?.endYear === null &&
            history?.teamID === Number(teamID)
        )?.priviledges === "LEADER"
            || teamHistories.find((history): history is TeamHistory =>
                history?.memberID === sessionMember.memberID &&
                history?.endSem === null &&
                history?.endYear === null &&
                history?.teamID === 1) !== undefined;

        return (
            <Layout>
                {!isLeaderOrBoard ? (
                    // Render content when the user is not a leader or board member
                    <>
                        <div className='md:flex justify-between items-center'>
                            <ul className='items-center flex flex-row gap-6'>
                                <Link href="/team/teamlist">
                                    <Icons name="ArrowLeft_lg" />
                                </Link>
                                <h1>{teamID && teams.find((team) => team.teamID === Number(teamID))?.teamName}</h1>
                            </ul>
                        </div>
                        <BreakLine />
                        <div className="flex justify-center flex-wrap">
                            {/* Render the team leader first */}
                            {currentTL && (
                                <MemberInfo isTeamLead={true} member={currentTL} teams={teams} teamHistories={teamHistories} onClick={() => void router.push("/profile/" + currentTL.memberID)} />
                            )}
                            {membersInTeam.map((member) => (
                                // Skip rendering the team leader again
                                !currentTL || member.memberID !== currentTL.memberID ? (
                                    <MemberInfo key={member.memberID} member={member} teams={teams} teamHistories={teamHistories} onClick={() => void router.push("/profile/" + member.memberID)} />
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
                                <h1>{teamID && teams.find((team) => team.teamID === Number(teamID))?.teamName}</h1>
                            </ul>
                            <div className="md:mt-0 mt-4">
                                <Button label={edit ? 'Finish Editing' : 'Edit Team'} onClick={() => setEdit(!edit)} icon={edit ? 'Check' : 'Settings'} />
                            </div>
                        </div>
                        <BreakLine />
                        {edit ? (
                            // Render content when not in edit mode
                            <>
                                <h2 className="mb-2">Current members in your team:</h2>
                                <div className="flex justify-center flex-wrap">
                                    {currentTL && (
                                        <MemberInfo
                                            isTeamLead={true}
                                            member={currentTL}
                                            teams={teams}
                                            teamHistories={teamHistories}
                                            icon1="Arrow45Up"
                                            icon1Click={() => {
                                                addTL(membersInTeam, currentTL);
                                            }}
                                        />
                                    )}
                                    {membersInTeam.map((member) => (
                                        // Skip rendering the team leader again
                                        !currentTL || member.memberID !== currentTL.memberID ? (
                                            <MemberInfo
                                                key={member.memberID} // Add a unique key prop
                                                member={member}
                                                teams={teams}
                                                teamHistories={teamHistories}
                                                icon1="Cross"
                                                icon1Click={() => {
                                                    removeMember(member);
                                                }}
                                            />
                                        ) : null // Return null if you don't want to render the member
                                    ))}
                                </div>
                                <BreakLine />
                                <h2 className="mb-2">Members up for grabs:</h2>
                                <SearchBar onChange={handleSearchChange} />
                                {/* Display filtered members */}
                                {filteredMembers.length > 0 && (
                                    <div>
                                        <div className="flex flex-wrap justify-center">
                                            {filteredMembers.map((member) => (
                                                <MemberInfo
                                                    key={member.memberID} // Add a unique key prop
                                                    member={member}
                                                    teams={teams}
                                                    teamHistories={teamHistories}
                                                    icon1="AddPerson"
                                                    icon1Click={() => {
                                                        addMember(member);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-center flex-wrap">
                                    {/* Render the team leader first */}
                                    {currentTL && (
                                        <MemberInfo isTeamLead={true} member={currentTL} teams={teams} teamHistories={teamHistories} onClick={() => void router.push("/profile/" + currentTL.memberID)} />
                                    )}
                                    {membersInTeam.map((member) => (
                                        // Skip rendering the team leader again
                                        !currentTL || member.memberID !== currentTL.memberID ? (
                                            <MemberInfo key={member.memberID} member={member} teams={teams} teamHistories={teamHistories} onClick={() => void router.push("/profile/" + member.memberID)} />
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
}

export default TeamsPage;