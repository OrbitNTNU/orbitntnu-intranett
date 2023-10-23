import React from 'react';
import { Member } from '@/interfaces/Member';

interface ProfileViewProps {
    session: any; // Replace with the correct type for session
    members: Member[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({ session, members }) => {
    // Construct the expected email format
    const expectedFirstName : String = session?.user.email.split('.')[0].split('-').join(' ');
    const expectedLastName : String = session?.user.email.split('.')[1].split('@')[0]

    // Filter the member based on the expected email format
    const member = members.find( //???
        (m) => m.lastName.toLowerCase() === expectedLastName.toLowerCase() &&
            m.firstName.toLowerCase() === expectedFirstName.toLowerCase()
    );

    return (
        <div className="flex justify-center">
            {session ? (
                member ? (
                    <div>
                        <p>This is your profile:</p>
                        <p>Name: {member.firstName} {member.lastName}</p>
                        <p>Field of Study: {member.fieldOfStudy}</p>
                        <p>Birthday: {member.birthday?.toDateString()}</p>
                        {/* Add more member details here */}
                    </div>
                ) : (
                    <p>Your profile is not found in the data.</p>
                )
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    );
};
