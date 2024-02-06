import BreakLine from '@/components/General/Breakline';
import EditInfoDisplay from '@/components/ProfilePage/EditInfoDisplay';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { getMemberInfo } from '@/views/ProfileView';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const EditProfile = () => {
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
        const memberInfo = getMemberInfo(member);

        return (
            <Layout>
                <div className='flex justify-between items-center'>
                    <h1 className='mr-2'>{member.firstName} {member.lastName}</h1>
                </div>
                <BreakLine/>
                <h2>Member information:</h2>
                <EditInfoDisplay memberInfo={memberInfo} onUpdateInfo={console.log("Edited")}/>
            </Layout>
        );
    }

    return (
        <div>
            Error
        </div>
    )
};

export default EditProfile;
