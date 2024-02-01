import React from 'react';

interface InfoDisplayProps {
    label: string;
    value: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ label, value }) => {
    if (value) {
        return (
            <ul className='list-disc mb-4'>
                <li><strong>{label}: </strong>{value}</li>
            </ul>
        );
    }

    return null; // Return null if value is falsy
};


type MemberInfo = {
    label: string;
    value: string | null; // Adjust the types based on actual data types
};

interface MemberInfoDisplayProps {
    memberInfo: MemberInfo[];
}

const MemberInfoDisplay: React.FC<MemberInfoDisplayProps> = ({ memberInfo }) => (
    <>
        {memberInfo.map((info) => (
            info.value && <InfoDisplay key={info.label} label={info.label} value={info.value} />
        ))}
    </>
);

export default MemberInfoDisplay;
