import type { Member } from '@prisma/client';
import React from 'react';

interface ProfileDisplayProps {
    selectedMember: Member;
}

interface InfoComponentProps {
    label: string;
    value: string | null; 
    size: 'small' | 'medium' | string;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ label, value, size }) => {
    const boxClasses = {
        small: 'col-span-1',
        medium: 'col-span-2',
    } as { [key in InfoComponentProps['size']]: string };

    return (
        <div className={`bg-secondaryColorTwo p-7 rounded-lg whitespace-normal ${boxClasses[size]}`}>
            <p className="font-bold text-lg mb-2 truncate">{label}</p>
            <p className="mb-2 break-words"> {value || 'N/A'}</p>
        </div>
    );
};

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ selectedMember }) => {
    const memberInfo = [
        { label: 'Name', value: `${selectedMember.firstName} ${selectedMember.lastName}`, size: 'medium' },
        { label: 'Active Status', value: selectedMember.activeStatus ? 'Active' : 'Inactive', size: 'small' },
        { label: 'Field of Study', value: selectedMember.fieldOfStudy, size: 'small' },
        { label: 'Birthday', value: selectedMember.birthday ? selectedMember.birthday.toLocaleDateString() : 'N/A', size: 'small' },
        { label: 'Nationalities', value: selectedMember.nationalities, size: 'small' },
        { label: 'Phone Number', value: selectedMember.phoneNumber, size: 'medium' },
        { label: 'NTNU Mail', value: selectedMember.ntnuMail, size: 'medium' },
        // { label: 'Orbit Mail', value: selectedMember.orbitMail, size: 'small' },
        { label: 'Year of Study', value: selectedMember.yearOfStudy, size: 'small' },
        { label: 'Additional Comments', value: selectedMember.additionalComments, size: 'medium' },
    ];

    return (
        <div className="p-4 min-h-screen flex justify-center items-center">
            <div className="grid justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 wrap">
                {memberInfo.map((info) => (
                    info.value !== "N/A" && 
                    <InfoComponent key={info.label} label={info.label} value={info.value} size={info.size} />
                ))}
            </div>
        </div>
    );
};

export default ProfileDisplay;
