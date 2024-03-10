import type { Member } from '@prisma/client';
import React from 'react';

interface InfoDisplayProps {
    member: Member;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ member }) => {
    const knownData: JSX.Element[] = [];
    const unknownData: JSX.Element[] = [];
    // Separate known and unknown data
    Object.entries(member).forEach(([key, value]) => {
        const renderValueString = renderValue(value, key);
        if (renderValueString !== "excluded") {
            if (renderValueString !== 'unknown') {
                knownData.push(
                    <li key={key} className='flex flex-row mb-4'>
                        <strong>{key}:</strong> <span className='text-blue-400 ml-2'>{renderValueString}</span>
                    </li>
                );
            } else {
                unknownData.push(
                    <li key={key} className='flex flex-row mb-4'>
                        <strong>{key}:</strong> <span className='text-red-400 ml-2'>{renderValueString}</span>
                    </li>
                );
            }
        }
    });

    return (
        <div>
            <h2>Member information:</h2>
            <ul className='list-disc mb-4 text-xl'>
                {knownData}
            </ul>
            {unknownData.length !== 0 && ( // Use logical AND operator to check if unknownData is not null or undefined
                <>
                    <h2>Unknown information:</h2>
                    <ul className='list-disc mb-4 text-xl'>
                        {unknownData}
                    </ul>
                </>
            )}
        </div>
    );
    
};

const renderValue = (value: string | number | boolean | Date | null, key: string) => {
    // Exclude rendering for specified properties
    if (key === 'memberID' || key === 'userId' || key === 'slackID' || key === 'orbitMail' || key === 'activeStatus') {
        return 'excluded'; // Or any other value indicating exclusion
    }

    if (value instanceof Date) {
        return value.toLocaleDateString(); // or any other format you prefer
    } else {
        return value ?? value === 0 ? value.toString() : 'unknown';
    }
};

export default InfoDisplay;
