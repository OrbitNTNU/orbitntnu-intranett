import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import InfoDisplay from "@/components/ProfilePage/InfoDisplay";
import Layout from "@/templates/Layout";
import type { Member, Team, TeamHistory } from "@prisma/client";

interface ProfileViewProps {
    member: Member;
    teamHistories: TeamHistory[];
    edit: boolean;
    teams: Team[]
    handleRedirect?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ member, edit, teamHistories, teams, handleRedirect }) => {
    const teamsRecord = teamHistories.filter(teamHistory => teamHistory.memberID === member.memberID);

    // Create an empty array to store the resulting records
    const teamRecords = [];

    // Iterate through each teamHistory in teamsRecord
    for (const teamHistory of teamsRecord) {
        // Find the corresponding team using teamID
        const team = teams.find(team => team.teamID === teamHistory.teamID);

        // If a team is found, construct the record
        if (team) {
            const record = {
                teamName: team.teamName,
                history: teamHistory
            };

            // Push the record into the result array
            teamRecords.push(record);
        }
    }

    return (
        <Layout>
            <div className='md:flex justify-between items-center'>
                <ul>
                    <h1>{member.name}</h1>
                    <div className='text-xl'>{member.orbitMail}</div>
                </ul>
                {edit && (
                    <div className="md:mt-0 mt-4">
                        <Button label={'Edit Information'} onClick={handleRedirect} icon="Settings" />
                    </div>
                )}
            </div>
            <BreakLine />
            <InfoDisplay member={member} teamsRecord={teamRecords} />
        </Layout>
    );
}

export default ProfileView;
