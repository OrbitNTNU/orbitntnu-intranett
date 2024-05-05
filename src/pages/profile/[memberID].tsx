'use client';
import { useEffect } from 'react';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import ProfileView from '@/views/ProfileView';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/General/Loading';
import type { Member } from '@prisma/client';

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

    useEffect(() => {
        if (router.isReady && memberID === session.data?.user.memberInfo?.memberID) {
            void router.push("/profile/me");
        }
    }, [memberID, session, router]);

    if (!member || selectedMember.isLoading || teamHistoriesData.isLoading || teamsData.isLoading) {
        // Handle loading state
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    if (selectedMember.isError || teamHistoriesData.isError || teamsData.isError) {
        // Handle error state
        return (
            <Layout>
                <div>Error occurred while loading data.</div>
            </Layout>
        );
    }

    return (
        <ProfileView member={member as Member} edit={false} teamHistories={teamHistories} teams={teams}/>
    );
};

export default ProfilePage;
