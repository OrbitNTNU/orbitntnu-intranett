import { Loading } from '@/components/General/Loading';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import ProfileView from '@/views/ProfileView';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [member, setMember] = useState<Member>();
    const [loading, setLoading] = useState<boolean>(true);
    
    const session = useSession();

    const query = api.members.getMemberByOrbitMail.useQuery(session.data?.user.email ?? "");

    const router = useRouter();

    const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
    const teamHistories = teamHistoriesData.data ?? [];

    const teamsData = api.teams.getTeams.useQuery();
    const teams = teamsData.data ?? [];

    const handleRedirect = () => {
        void router.push("/profile/edit")
    }   

    useEffect(() => {
        const fetchData = async () => {
            if (session.data?.user.email) {
                try {
                    const response = await query.refetch();
                    if (response.data) {
                        setMember(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching member:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        void fetchData();
    }, [session]);

    if (loading) {
        return (
            <Layout>
                <Loading/>
            </Layout>
        );
    }

    if (member) {
        return (
            <ProfileView member={member} edit={true} teamHistories={teamHistories} teams={teams} handleRedirect={handleRedirect}/>
        );
    }
};

export default Profile;
