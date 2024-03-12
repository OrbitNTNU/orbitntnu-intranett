// pages/profile/[memberId].js
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import ProfileView from '@/views/ProfileView';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
    const router = useRouter();
    const { memberID } = router.query;

    const selectedMember = api.members.getMemberById.useQuery(Number(memberID));
    const member = selectedMember.data ?? null;

    const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
    const teamHistories = teamHistoriesData.data ?? [];

    const teamsData = api.teams.getTeams.useQuery();
    const teams = teamsData.data ?? [];

    const session = useSession();

    if(member === session.data?.user.member) {
        void router.push("/profile/me");
    }

    if (!member) {
        // Handle the case where the member is not found
        return (
            <Layout>
                <p>Loading ...</p>
            </Layout>
        );
    }

    return (
        <ProfileView member={member} edit={false} teamHistories={teamHistories} teams={teams}/>
    );
};

export default ProfilePage;
