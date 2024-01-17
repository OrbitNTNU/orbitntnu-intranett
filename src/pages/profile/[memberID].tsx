// pages/profile/[memberId].js
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';

const Profile = () => {
    const router = useRouter();
    const { memberID } = router.query;

    const membersData = api.members.getMembers.useQuery();
    const members = membersData.data || [];

    // Find the selected member based on memberId
    const selectedMember = members.find((member) => member.memberID === Number(memberID)); // Parse memberId as a number

    if (!selectedMember) {
        // Handle the case where the member is not found
        return (
            <Layout>
                <div className="flex justify-center">
                    <p>Member not found.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex justify-center">
                <div>
                    <h1>Your Profile</h1>
                    <p>Name: {selectedMember.firstName} {selectedMember.lastName}</p>
                    <p>Active Status: {selectedMember.activeStatus ? 'Active' : 'Inactive'}</p>
                    {/* Display other member information as needed */}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
