import type { Member } from '@prisma/client';
import React from 'react';

interface TeamInfoDisplayProps {
    member: Member[];
}

const TeamInfoDisplay: React.FC<TeamInfoDisplayProps> = ({ member }) => {

    console.log(member);
    return null;
    // return (
    //     <>
    //     {memberInfo.map((info) => (
    //         info.value && <InfoDisplay key={info.label} label={info.label} value={info.value} />
    //     ))}
    // </>
    // )
}

export default TeamInfoDisplay;
