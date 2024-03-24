import { Loading } from '@/components/General/Loading';
import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import ProfileView from '@/views/ProfileView';
import type { Member } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Profile = () => {
    const session = useSession();

    const query = api.members.getMemberByOrbitMail.useQuery(session.data?.user.email ?? "");
    const member = query.data ?? null;

    const router = useRouter();

    const handleRedirect = () => {
        void router.push("/profile/edit")
    }   

    if (!member) {
        // Handle the case where the member is not found
        return (
            <Layout>
                <Loading/>
            </Layout>
        );
    }

    return (
        <ProfileView member={member} edit={true} handleRedirect={handleRedirect} />
    );
};

export default Profile;
