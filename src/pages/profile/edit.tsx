import BreakLine from '@/components/General/Breakline';
import { Loading } from '@/components/General/Loading';
import EditInfoDisplay from '@/components/ProfilePage/EditInfoDisplay';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditProfile = () => {
    const session = useSession();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);

    const getMemberQuery = api.members.getMemberByOrbitMail.useQuery(session.data?.user.email ?? "");
    const newMemberQuery = api.members.createMember.useMutation();

    const mutation = api.members.updateMemberInformation.useMutation();
    const router = useRouter();

    async function handleUpdateInfo(member: Member) {
        try {
            // Perform the mutation and wait for it to complete
            await mutation.mutateAsync(member);

            // Once the mutation is successful, navigate to the profile page
            void router.push("/profile/me");
        } catch (error) {
            // Handle any errors that occur during the mutation
            console.error("Error updating member information:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (session.data?.user.email) {
                try {
                    const response = await getMemberQuery.refetch();
                    if (response.data) {
                        setMember(response.data);
                    } else {
                        const sessionName = session.data.user.name ?? "Unknown";
    
                        const tempMember = {
                            name: sessionName,
                            activeStatus: true,
                            fieldOfStudy: null,
                            ntnuMail: null,
                            orbitMail: session.data.user.email,
                            phoneNumber: null,
                            yearOfStudy: null,
                            birthday: null,
                            nationalities: null,
                            additionalComments: null,
                            slackToken: null,
                            userId: null,
                            personalMail: null
                        };
    
                        await newMemberQuery.mutateAsync(tempMember);
                        const response = await getMemberQuery.refetch();
                        if(response.data) {
                            setMember(response.data);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching member:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        void fetchData();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center">
                    <Loading/>
                </div>
            </Layout>
        );
    }

    if (member) {
        return (
            <Layout>
                <ul>
                    <h1>{member.name}</h1>
                    <div className='text-xl'>{member.orbitMail}</div>
                </ul>
                <BreakLine />
                <EditInfoDisplay member={member} onUpdateInfo={handleUpdateInfo} />
            </Layout>
        );
    }

    return (
        <div>
            Error fetching member from Google login
        </div>
    )
};

export default EditProfile;
