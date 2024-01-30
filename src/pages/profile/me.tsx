import Layout from '@/templates/Layout';
import { api } from '@/utils/api';
import { useParams } from 'react-router-dom';

const Profile = () => {
    return (
        <Layout>
            <div className="flex justify-center">
                <p>
                    This is your personal page
                </p>
            </div>
        </Layout>
    )
};

export default Profile;
