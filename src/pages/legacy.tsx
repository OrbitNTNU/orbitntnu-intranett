import React, { useEffect, useState } from "react";
import BreakLine from "@/components/General/Breakline";
import Layout from "@/components/General/Layout";
import { api } from "@/utils/api";
import { SemType, type Member, type TeamHistory, TeamHistory_priviledges } from "@prisma/client";
import Link from "next/link";
import { Loading } from "@/components/General/Loading";

export interface MemberAndHistory {
    member: Member,
    teamHistories: TeamHistory[],
};

const Legacy = () => {

    // Find current year and semester
    const thisDate = new Date();
    const thisYear: number = thisDate.getFullYear();
    const thisSem: SemType = thisDate.getMonth() <= 5 ? SemType.SPRING : SemType.FALL;
    
    const availableSemesters: string[] = [SemType.SPRING, SemType.FALL];
    const availableYears: number[] = [];
    
    for (let year = 2019; year <= thisYear; year++) {
        availableYears.push(year);
    }

    // Get all teams
    const allTeams = "All teams";
    const teamNamesData = api.applications.teamIDAndNames.useQuery().data;
    const teamNames: Record<number, string> = {};
    if (teamNamesData !== undefined) {
        for (const teamName of teamNamesData) {
            teamNames[teamName.teamID] = teamName.teamName;
        };
    };

    // Get all members
    const allMembers = api.legacy.getAllMembersAndTeamHistories.useQuery().data;

    const [selectedMembers, setSelectedMembers] = useState<MemberAndHistory[]>(allMembers ? allMembers : []);
    const [selectedYear, setSelectedYear] = useState<number>(thisYear);
    const [selectedSemester, setSelectedSemester] = useState<SemType>(thisSem);
    const [selectedTeam, setSelectedTeam] = useState<string>(allTeams);

    // Filter by selected period
    function filterMembers () {
        const selected = allMembers?.map((value) => (
            // Finds all teamHistories that are within the selected period
            ({member: value.member, teamHistories: value.teamHistories.filter((team) => (
                (team.startYear < selectedYear ||
                (team.startYear == selectedYear && (team.startSem == selectedSemester || team.startSem == SemType.SPRING))) &&
                (team.endYear == null || team.endYear > selectedYear ||
                (team.endYear == selectedYear && (team.endSem == selectedSemester || team.endSem == SemType.FALL)))
            ))})
        )).filter((value) => (value.teamHistories.length > 0)); // Checks if member has teamHistory within the selected period
    
        selected && setSelectedMembers(selected);
    }

    useEffect(() => {
        filterMembers();
    }, [allMembers]);

    useEffect(() => {
        filterMembers();
    }, [selectedYear, selectedSemester]);

    // Filter selected members by team
    function filterByTeam(teamID: number) {
        const filteredMembers = selectedMembers
            .filter((value) => (value.teamHistories.map((team) => (team.teamID))
            .includes(teamID)))
            .sort((a,b) => (a.teamHistories.map((team) => (team.priviledges)).includes(TeamHistory_priviledges.LEADER)) ? -1 : 1);
        return filteredMembers;
    }


    return (
        <Layout>

            <h1>Time Machine</h1>
            <BreakLine/>

            {!allMembers ?
                <Loading/>
            :
            <section className="flex flex-col gap-20">

                {/* Selection */}
                <section className="flex flex-row flex-wrap gap-6">
                    <h2 className="font-bold text-4xl">Select period:</h2>
                    <div className="flex flex-row flex-wrap gap-4 text-black text-xl">
                        <select
                            defaultValue={thisYear}
                            className="rounded-md px-4 grow py-2"
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {availableYears.map((year) => (
                                <option key={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            defaultValue={thisSem}
                            className="rounded-md px-4 grow py-2"
                            onChange={(e) => setSelectedSemester(SemType[e.target.value as keyof typeof SemType])}
                        >
                            {availableSemesters.map((sem) => (
                                <option key={sem}>{sem}</option>
                            ))}
                        </select>
                        <select
                            defaultValue={allTeams}
                            className="rounded-md px-4 grow py-2"
                            onChange={(e) => setSelectedTeam(e.target.value)}
                        >
                            <option key={allTeams}>{allTeams}</option>
                            {Object.entries(teamNames).map(([key, value]) => (
                                <option key={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Results */}
                <section className="flex flex-col gap-12">

                    {/* Display each team */}
                    {Object.entries(teamNames).filter(([key, value]) => (filterByTeam(Number(key)).length > 0 && (selectedTeam == allTeams || value == selectedTeam))).map(([key, value]) => (
                        <div key={key}>
                            <Link href={"/team/" + key} className="text-3xl hover:font-semibold">{value}</Link>
                            <div className="flex flex-col gap-3 ml-4 max-w-[500px] font-light">

                                {/* Display each member */}
                                {filterByTeam(Number(key)).map((value) => (
                                    <Link
                                        href={"/profile/" + value.member.memberID}
                                        key={value.member.memberID}
                                        className="flex flex-row items-center justify-between border-b border-gray-500 p-2 w-full gap-4 hover:font-normal"
                                    >
                                        <p className="text-xl">{value.member.name}</p>
                                        <div className="text-right">
                                            {value.teamHistories.filter((team) => (team.teamID == Number(key))).map((team) => (
                                                <p key={team.teamHistoryID}>{team.cPosition ? team.cPosition : team.priviledges}</p>
                                            ))}
                                        </div>
                                    </Link>
                                ))
                                }

                            </div>
                        </div>
                    ))}
                    
                </section>

            </section>
            }


        </Layout>
    );
};

export default Legacy;