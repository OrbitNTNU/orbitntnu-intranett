import ProfileDisplay from '@/components/ProfilePage/ProfileDisplay';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const Profile = () => {
    const session = useSession();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);

    const query = api.members.getMemberByOrbitMail.useQuery(session.data?.user.email ?? "");

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

    console.log(member);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center">
                    <p>Loading ...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex justify-center">
                {/* Render your member data here */}
                {member ? (
                    <div className="flex justify-center">
                        <ProfileDisplay selectedMember={member} />
                    </div>
                ) : (
                    <p>Member not found</p>
                )}
            </div>
        </Layout>
    );
};

export default Profile;
