import type { Member } from '@prisma/client';
import React from 'react';
import MemberInfoDisplay from './MemberInfoDisplay';
import BreakLine from '../General/Breakline';

export const getMemberInfo = (member: Member) => {
    const memberInfo = [
        { label: 'Active Status', value: member.activeStatus ? 'Active' : 'Inactive' },
        { label: 'Field of Study', value: member.fieldOfStudy },
        { label: 'Birthday', value: member.birthday ? member.birthday.toLocaleDateString() : null },
        { label: 'Nationalities', value: member.nationalities },
        { label: 'Phone Number', value: member.phoneNumber },
        { label: 'NTNU Mail', value: member.ntnuMail },
        { label: 'Orbit Mail', value: member.orbitMail },
        { label: 'Year of Study', value: String(member.yearOfStudy)},
    ];

    return memberInfo;
}

interface ProfileDisplayProps {
    selectedMember: Member;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ selectedMember }) => {
    const memberInfo = getMemberInfo(selectedMember);

    return (
        <>
            <h1>{selectedMember.firstName} {selectedMember.lastName}</h1>
            <BreakLine/>
            <h2>Member information:</h2>
            <div className='ml-4'>
                <MemberInfoDisplay memberInfo={memberInfo}/>
            </div>
        </>
    );
};

export default ProfileDisplay;
