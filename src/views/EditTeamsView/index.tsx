import MemberInfo from "@/components/General/MemberInfo";
import { api } from "@/utils/api";
import React, { useState } from "react";
import type { MemberInfoData } from "@/interfaces/MemberInfo";
import BreakLine from "@/components/General/Breakline";
import SearchBar from "@/components/General/SearchBar";
import { TeamHistory_cPosition, type Team } from "@prisma/client";

type EditTeamsViewProps = {
    projectManagement?: MemberInfoData[],
    teamLeader: MemberInfoData | null;
    membersInTeam: MemberInfoData[];
    team: Team | undefined;
    onActionTriggered: () => void; // Callback function for triggering parent component rerender
};

const EditTeamsView: React.FC<EditTeamsViewProps> = ({
    teamLeader,
    projectManagement,
    membersInTeam,
    team,
    onActionTriggered
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const teamHistoriesQuery = api.teamHistories.terminateTeamHistory.useMutation();
    const updateMemberQuery = api.members.toggleMemberActiveStatus.useMutation();
    const createTeamHistoriesQuery = api.teamHistories.createTeamHistory.useMutation();

    const allMembersData = api.members.getAllMemberInfo.useQuery();
    const allMembers = allMembersData.data;

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const filteredMembers = allMembers?.filter(member => {
        // Convert searchQuery and member names to lowercase for case-insensitive search
        const searchValue = searchQuery.toLowerCase();
        const fullName = member.name.toLowerCase();

        // Check if the member is already in membersInTeam
        const isInTeam = membersInTeam?.some(teamMember => teamMember.memberID === member.memberID);

        // Return true if the member is not already in membersInTeam and matches the search query
        return !isInTeam && (fullName.includes(searchValue) || member.orbitMail.toLowerCase().includes(searchValue));
    });

    const removeMember = async (memberToRemove: MemberInfoData) => {
        const isSure = window.confirm(`Are you sure you want to remove ${memberToRemove.name} from this team?`);

        if (isSure) {
            const currentTeamHistory = memberToRemove.teamHistory.find((history) =>
                history.team.teamID === Number(team?.teamID)
            );

            if (currentTeamHistory && typeof currentTeamHistory.teamHistoryID === 'number') {
                if (currentTeamHistory.team.teamID === 1) {
                    await teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(currentTeamHistory?.teamHistoryID),
                    });

                    void createTeamHistoriesQuery.mutateAsync({
                        priviledges: "MENTOR",
                        memberID: memberToRemove.memberID,
                        teamID: 18,
                        cPosition: null
                    });

                } else {
                    await teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(currentTeamHistory?.teamHistoryID),
                    });
                    // Function to check if there is any team history entry with the same MemberID where endSem and endYear are both null
                    if (memberToRemove.activeStatus === true && allMembers?.find((member) => member.memberID === memberToRemove.memberID)?.teamHistory.length === 1) {
                        // Update the member to inactive if no active team history entry exists
                        await updateMemberQuery.mutateAsync(memberToRemove.memberID);
                    }
                }

                if (teamHistoriesQuery.isSuccess) {
                    onActionTriggered();
                }
            } else {
                console.error("currentTeamHistory is not of the correct type or not found");
            }
        }
    };

    const addMember = async (memberToAdd: MemberInfoData) => {
        const isSure = window.confirm(`Are you sure you want to add ${memberToAdd.name} to this team?`);
        // If user confirms, call the API to add the member
        if (isSure) {
            if (Number(team?.teamID) === 1) {
                // Prompt the user to select a CPosition
                const optionsString = Object.keys(TeamHistory_cPosition)
                    .filter(option => !option.includes('PM') && !option.includes('PD'))
                    .sort()
                    .join('\n');

                const cPosition = prompt(`Select type C Position for ${memberToAdd.name} from the following options:\n${optionsString}`) as TeamHistory_cPosition;
                // Check if the user has entered a CPosition
                if (Object.keys(TeamHistory_cPosition).includes(cPosition)) {
                    await createTeamHistoriesQuery.mutateAsync({
                        priviledges: "BOARD",
                        memberID: memberToAdd.memberID,
                        teamID: Number(team?.teamID),
                        cPosition: cPosition // Assign the selected CPosition
                    });

                    if (createTeamHistoriesQuery.isSuccess) {
                        onActionTriggered();
                    }
                } else {
                    alert('Please type a C position exactly as shown');
                }
            } else if (Number(team?.teamID) === 17) {
                // Prompt the user to select a CPosition
                const optionsString = Object.keys(TeamHistory_cPosition)
                    .filter(option => (option.includes('PM') && !option.includes('PD')) || option === 'Engineer')
                    .sort()
                    .concat('Engineer') // Append "Engineer"
                    .join('\n');

                const position = prompt(`Select a position for ${memberToAdd.name} from the following options:\n${optionsString}`);
                // Check if the user has entered a CPosition
                if (Object.keys(TeamHistory_cPosition).includes(position as TeamHistory_cPosition)) {
                    await createTeamHistoriesQuery.mutateAsync({
                        priviledges: "BOARD",
                        memberID: memberToAdd.memberID,
                        teamID: Number(team?.teamID),
                        cPosition: position as TeamHistory_cPosition // Assign the selected CPosition
                    });

                    if (createTeamHistoriesQuery.isSuccess) {
                        onActionTriggered();
                    }
                } else if (position === "Engineer") {
                    await createTeamHistoriesQuery.mutateAsync({
                        priviledges: "MEMBER",
                        memberID: memberToAdd.memberID,
                        teamID: Number(team?.teamID),
                        cPosition: null,
                    });

                    if (createTeamHistoriesQuery.isSuccess) {
                        onActionTriggered();
                    }
                }

                else {
                    alert('Please type the position exactly as shown:\n\n' + optionsString);
                }
            } else {
                await createTeamHistoriesQuery.mutateAsync({
                    priviledges: Number(team?.teamID) === 18 ? "MENTOR" : "MEMBER",
                    memberID: memberToAdd.memberID,
                    teamID: Number(team?.teamID),
                    cPosition: null,
                });

                if (createTeamHistoriesQuery.isSuccess) {
                    onActionTriggered();
                }
            }

            if (memberToAdd.activeStatus === false) {
                void updateMemberQuery.mutateAsync(memberToAdd.memberID);
            }
        }
    };

    const addTL = async (currentTeamLeader: MemberInfoData) => {
        // Prompt the user to select a member from the provided array of members
        const selectedMember = window.prompt(`Choose the member you wish to promote as the new team leader:\n${membersInTeam?.map(member => `${member.name}`).join('\n')}`);

        const newTeamLeader = allMembers?.find((member) => member.name === selectedMember);

        // Check if a member is selected and the user confirms the action
        if (newTeamLeader && window.confirm(`Are you sure you want to change the team leader to ${newTeamLeader.name}?`)) {

            const oldTLHistory = currentTeamLeader.teamHistory.find((history) =>
                history?.team.teamID === team?.teamID
            );

            const newTLHistory = newTeamLeader.teamHistory.find((history) =>
                history?.team.teamID === team?.teamID
            );

            try {
                // Perform API call to update the team leader

                // Optional: Update the previous team leader's role to a regular member
                if (currentTeamLeader) {
                    void teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(oldTLHistory?.teamHistoryID),
                    })

                    await teamHistoriesQuery.mutateAsync({
                        teamHistoryID: Number(newTLHistory?.teamHistoryID),
                    })

                    await createTeamHistoriesQuery.mutateAsync({
                        priviledges: "LEADER",
                        memberID: newTeamLeader.memberID,
                        teamID: Number(team?.teamID),
                        cPosition: null,
                    })

                    if (teamHistoriesQuery.isSuccess && createTeamHistoriesQuery.isSuccess) {
                        onActionTriggered();
                    }
                }

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

    return (
        <>
            <h2 className="mb-2">Current members in your team:</h2>
            <div className="flex justify-center flex-wrap">
                {teamLeader && (
                    <MemberInfo
                        isTeamLead={true}
                        memberInfo={teamLeader}
                        icon1="Arrow45Up"
                        icon1Click={() => {
                            void addTL(teamLeader);
                        }}
                    />
                )}
                {projectManagement?.map((projectManager) => (
                    <MemberInfo
                        key={projectManager.memberID}
                        isTeamLead={true}
                        memberInfo={projectManager}
                        icon1="Cross"
                        icon1Click={() => {
                            void removeMember(projectManager);
                        }}                    
                    />
                ))}
                {membersInTeam.map((member) => (
                    // Skip rendering the team leader again
                    !teamLeader || member.memberID !== teamLeader.memberID ? (
                        <MemberInfo
                            key={member.memberID} // Add a unique key prop
                            memberInfo={member}
                            icon1="Cross"
                            icon1Click={() => {
                                void removeMember(member);
                            }}
                        />
                    ) : null // Return null if you don't want to render the member
                ))}
            </div>
            <BreakLine />
            <h2 className="mb-2">Members up for grabs:</h2>
            <SearchBar onChange={handleSearchChange} />
            {/* Display filtered members */}
            {filteredMembers && filteredMembers.length > 0 && (
                <div>
                    <div className="flex flex-wrap justify-center">
                        {filteredMembers.map((member) => (
                            <MemberInfo
                                key={member.memberID} // Add a unique key prop
                                memberInfo={member as MemberInfoData}
                                icon1="AddPerson"
                                icon1Click={() => {
                                    void addMember(member as MemberInfoData);
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTeamsView;