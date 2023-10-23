import mockMembers from '@/mockdata/MockMembers';
import Layout from '@/templates/Layout';
import { ProfileView } from '@/views/ProfileView';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
   
  return (
    <Layout>
      <ProfileView session={session} members={mockMembers} />
    </Layout>
  );
};

export default Profile;