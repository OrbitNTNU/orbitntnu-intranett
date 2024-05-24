import { useEffect, useState } from 'react';
import Layout from "@/components/General/Layout";
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/General/Loading';
import type { $Enums, Member, Team, TeamHistory } from '@prisma/client';
import { ContactInfo, SystemInfo, OtherInfo, Links, UnknownInfo } from '@/components/ProfilePage/InfoPortions';
import Icons from '@/components/General/Icons';
import EditInfoDisplay from '@/components/ProfilePage/EditInfoDisplay';

const ProfilePage = () => {
    const router = useRouter();
    const { memberID } = router.query;
    
    const [godMode, setGodMode] = useState<boolean>(false);

    const selectedMember = api.members.getMemberById.useQuery(Number(memberID));
    const member = selectedMember.data ?? null;

    const mutation = api.members.updateMemberInformation.useMutation();

    const session = useSession();

    useEffect(() => {
        if (router.isReady && memberID === "me") {
            void router.push("/profile/" + session.data?.user.memberInfo.memberID);
        }
    }, [memberID, session, router]);

    if (!member || selectedMember.isLoading) {
        // Handle loading state
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    if (selectedMember.isError) {
        // Handle error state
        return (
            <Layout>
                <div>Error occurred while loading data.</div>
            </Layout>
        );
    }

    const semesterOrder = {
        SPRING: 1,
        FALL: 2
    };

    function formatSemester(sem: $Enums.SemType, year: number) {
        const formatSem = sem.toLowerCase().charAt(0).toUpperCase() + sem.toLowerCase().slice(1)
        if (formatSem && year) {
            return `${formatSem} ${year}`;
        }
        return '';
    }

    function formatTeamHistory(teamHistory: TeamHistory) {
        const start = formatSemester(teamHistory.startSem, teamHistory.startYear);
        const end = teamHistory.endSem && teamHistory.endYear ? formatSemester(teamHistory.endSem, teamHistory.endYear) : 'present';

        if (start === end) {
            return start;
        } else if (teamHistory.endSem == null && teamHistory.endYear == null) {
            return `${start} - present`;
        } else {
            return `${start} - ${end}`;
        }
    }

    function formatCurrentPosition(teamHistories: (TeamHistory & { team: Team })[]) {
        const currentPositions = teamHistories.filter((teamHistory) => teamHistory.endSem === null && teamHistory.endYear === null);
    
        if (currentPositions.length === 0) {
            return 'No Active Positions';
        }
    
        return currentPositions.map(position => {
            const start = formatSemester(position.startSem, position.startYear);
            const positionName = position.priviledges === "BOARD" ? position.cPosition : position.priviledges.toLowerCase().charAt(0).toUpperCase() + position.priviledges.toLowerCase().slice(1);
    
            return (
                <div key={position.teamHistoryID} className="flex justify-between">
                    <div>
                        {`${position.team.teamName} - ${positionName}`}
                    </div>
                    <div className="text-gray-500">
                        ({start} - Present)
                    </div>
                </div>
            )
        });
    }

    const currentPositions = member.teamHistory.filter(teamHistory => teamHistory.endSem === null && teamHistory.endYear === null);
    const currentPositionsTitle = currentPositions.length > 1 ? 'Current Positions' : 'Current Position';

    const toggleGodMode = () => {
        setGodMode(!godMode);
        void selectedMember.refetch();
    };
    
    async function handleUpdateInfo(member: Member) {
        try {
            // Perform the mutation and wait for it to complete
            await mutation.mutateAsync(member);
            toggleGodMode();

        } catch (error) {
            // Handle any errors that occur during the mutation
            console.error("Error updating member information:", error);
        }
    }

    return (
        <Layout>
            {!godMode ? (
                <div className='w-full flex flex-col lg:flex-row gap-4'>
                <div className='w-full lg:w-3/5 p-2'>
                    <div className='h-full rounded-2xl p-4 shadow-2xl'>
                        <ul>
                            {member.name && (
                                <li className='m-4 flex justify-center flex flex-row gap-4'>
                                    <h2>{member.name}</h2>
                                    {session.data?.user.memberInfo.teamHistory.some((teamHistory) => teamHistory.priviledges === "BOARD") && (
                                            <button onClick={toggleGodMode}>
                                            <Icons name={'Settings'} />
                                        </button>
                                    )}
                                </li>
                            )}
                            <ContactInfo member={member} />
                            <SystemInfo member={member} />
                            <OtherInfo member={member} />
                            <Links member={member} />
                            <UnknownInfo member={member} />
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col w-full lg:w-2/5 p-2 gap-4'>
                    <div className='rounded-2xl p-4 shadow-2xl'>
                        <ul>
                            <li className='mb-2'>
                                <h3 className='text-lg font-semibold'>{currentPositionsTitle}:</h3>
                            </li>
                            {formatCurrentPosition(member.teamHistory)}
                        </ul>
                    </div>
                    <div className='p-4 rounded-2xl h-full shadow-2xl'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Team History</h2>
                        </div>
                        <ul>
                            {member.teamHistory && member.teamHistory.slice().filter((teamHistory) => teamHistory.endSem !== null && teamHistory.endYear !== null).length > 0 ? (
                                member.teamHistory
                                    .slice() // Create a copy to avoid mutating the original array
                                    .filter((teamHistory) => teamHistory.endSem !== null && teamHistory.endYear !== null)
                                    .sort((a, b) => {
                                        if (a.startYear !== b.startYear) {
                                            return b.startYear - a.startYear;
                                        }
                                        // Sort by semester using the predefined order
                                        return semesterOrder[b.startSem] - semesterOrder[a.startSem];
                                    })
                                    .map((teamHistory, index) => (
                                        <li key={index} className="flex justify-between mb-2 p-2 border-b border-gray-200">
                                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                                <span className='font-medium'>{teamHistory.team.teamName}</span>
                                                <span className='text-gray-500'>{teamHistory.priviledges === "BOARD" ? teamHistory.cPosition : teamHistory.priviledges}</span>
                                            </div>
                                            <span>{formatTeamHistory(teamHistory)}</span>
                                        </li>
                                    ))
                            ) : (
                                <li>
                                    Member has not had any previous positions.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            ) : (
                <EditInfoDisplay member={member} onUpdateInfo={handleUpdateInfo} />
            )}
        </Layout>
    );
};

export default ProfilePage;
