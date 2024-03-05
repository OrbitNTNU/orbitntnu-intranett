import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import ProfileView from '@/views/ProfileView';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Profile = () => {
    const session = useSession();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);

    const query = api.members.getMemberByOrbitMail.useQuery(session.data?.user.email ?? "");

    const router = useRouter();

    const handleRedirect = () => {
        void router.push("/profile/edit")
    }   

    console.log(session.data?.user)

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

    useEffect(() => {
        void fetchData();
    }, [session]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center">
                    <p>Loading ...</p>
                </div>
            </Layout>
        );
    }

    if (member) {
        return (
            <ProfileView member={member} edit={true} handleRedirect={handleRedirect}/>
        );
    }

    return (
        <div>
            Error
        </div>
    )
};

export default Profile;
