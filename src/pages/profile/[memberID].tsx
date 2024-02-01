// pages/profile/[memberId].js
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import ProfileDisplay from '@/components/ProfilePage/ProfileDisplay';

const ProfilePage = () => {
    const router = useRouter();
    const { memberID } = router.query;
    
    const selectedMember = api.members.getMemberById.useQuery(Number(memberID));
    const member = selectedMember.data ?? null;

    if (!member) {
        // Handle the case where the member is not found
        return (
            <Layout>
                <div className="flex justify-center">
                    <p>Loading ...</p>
                </div>
            </Layout>
        );
    }

    return (
        <div className="flex justify-center">
            <ProfileDisplay selectedMember={member}/>
        </div>
    );
};

export default ProfilePage;
