import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import InfoDisplay from "@/components/ProfilePage/InfoDisplay";
import Layout from "@/templates/Layout";
import type { Member } from "@prisma/client";

interface ProfileViewProps {
    member: Member;
    edit: boolean;
    handleRedirect?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ member, edit, handleRedirect }) => {
    return (
        <Layout>
            <div className='md:flex justify-between items-center'>
                <ul>
                    <h1>{member.name}</h1>
                    <div className='text-xl'>{member.orbitMail}</div>
                </ul>
                {edit && (
                    <div className="md:mt-0 mt-4">
                    <Button label={'Edit Information'} onClick={handleRedirect} icon="Settings"/>
                    </div>
                )}
            </div>
            <BreakLine />
            <InfoDisplay member={member}/>
        </Layout>
    );
}

export default ProfileView;
