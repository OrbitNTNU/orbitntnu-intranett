import type { Member, TeamHistory } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface InfoDisplayProps {
    member: Member;
    teamsRecord: { teamName: string, history: TeamHistory }[];
    isBoardOrTL: boolean;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ member, teamsRecord, isBoardOrTL }) => {
    const knownData: JSX.Element[] = [];
    const unknownData: JSX.Element[] = [];
    // Separate known and unknown data
    Object.entries(member).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)).forEach(([key, value]) => {
        const renderValueString = renderValue(value, key, isBoardOrTL);
        if (renderValueString !== "excluded") {
            if (renderValueString !== 'unknown') {
                if (key === 'linkedin') {
                    knownData.push(
                        <li key={key} className='flex flex-row mb-4'>
                            <strong>{key}:</strong> <Link target="_blank" className='text-blue-400 ml-2' href={renderValueString}>{renderValueString}</Link>
                        </li>
                    );
                } else {
                    knownData.push(
                        <li key={key} className='flex flex-row mb-4'>
                            <strong>{key}:</strong> <span className='text-blue-400 ml-2'>{renderValueString}</span>
                        </li>
                    );
                }

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
            {knownData.length > 0 && (
                <>
                    <h2>Member information:</h2>
                    <ul className='list-disc mb-4 text-xl'>
                        {knownData}
                    </ul>
                </>
            )}
            {unknownData.length > 0 && (
                <>
                    <h2>Unknown information:</h2>
                    <ul className='list-disc mb-4 text-xl'>
                        {unknownData}
                    </ul>
                </>
            )}
            {teamsRecord.length !== 0 && (
                <>
                    <h2>Team information:</h2>
                    {teamsRecord
                        .sort((recordA, recordB) => {
                            // Extract startYear from each record
                            const startYearA = recordA.history.startYear;
                            const startYearB = recordB.history.startYear;
                            // If startSem is equal, compare startYear
                            return startYearB - startYearA;
                        })
                        .map((record) => (
                            <Link key={record.history.teamHistoryID} href={"/team/" + record.history.teamID}>
                                <ul className='list-disc mb-4 text-xl'>
                                    <span>{record.teamName}</span>,
                                    <span>
                                        {record.history.priviledges === "BOARD"
                                            ? " " + record.history.cPosition
                                            : " " + record.history.priviledges.toLowerCase()}
                                    </span>
                                    <span className='text-blue-400'>{" (" + record.history.startSem.toLowerCase()}</span>
                                    <span className='text-blue-400'>{" " + record.history.startYear}</span>
                                    {record.history.endSem && record.history.endYear ?
                                        (record.history.startSem === record.history.endSem && record.history.startYear === record.history.endYear ? (
                                            <span className='text-blue-400'>{")"}</span>
                                        ) : (
                                            <span className='text-blue-400'>{" - " + record.history.endSem.toLowerCase() + " " + record.history.endYear + ")"}</span>
                                        )
                                        ) : (<span className='text-blue-400'>{" - present)"}</span>)
                                    }
                                </ul>
                            </Link>
                        ))
                    }
                </>
            )}
        </div>
    );

};

const renderValue = (value: string | number | boolean | Date | null, key: string, isBoardOrTL: boolean) => {
    // Exclude rendering for specified properties
    if (!isBoardOrTL && (key === 'memberID'
        || key === 'slackID' || key === 'additionalComments'
        || key === 'orbitMail' || key === 'activeStatus'
        || key === 'showPhoneNrOnWebsite' || key === 'name'
        || key === 'linkedin' || key === 'nationalities'
        || key === 'personalMail' || key === 'birthdayBot')) {
        return 'excluded'; // Or any other value indicating exclusion
    }

    if (isBoardOrTL && (key === 'memberID'
        || key === 'slackID' || key === 'additionalComments'
        || key === 'activeStatus'
        || key === 'name'
        || key === 'nationalities'
    )) {
        return 'excluded'; // Or any other value indicating exclusion
    }

    if (value instanceof Date) {
        return value.toLocaleDateString();
    } else if (key === 'showPhoneNrOnWebsite' || key === 'birthdayBot') {
        return value === null ? 'false' : String(value === true);
    } else {
        return value ?? value === 0 ? value.toString() : 'unknown';
    }
};

export default InfoDisplay;
