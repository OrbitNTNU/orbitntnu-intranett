import React, { useEffect, useState } from "react";
import BreakLine from "@/components/General/Breakline";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { SemType, type Member, type TeamHistory } from "@prisma/client";

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

    for (let year = 2017; year <= thisYear; year++) {
        availableYears.push(year);
    }

    // Get all members
    const allMembers = api.legacy.getAllMembersAndTeamHistories.useQuery().data;

    const [selectedMembers, setSelectedMembers] = useState<MemberAndHistory[]>(allMembers ? allMembers : []);
    const [selectedYear, setSelectedYear] = useState<number>(thisYear);
    const [selectedSemester, setSelectedSemester] = useState<SemType>(thisSem);

    // Filter by selected period
    function filterMembers () {
        const selected = allMembers?.map((value) => (
            // Finds all teamHistories that are within the selected period
            ({member: value.member, teamHistories: value.teamHistories.filter((team) => (
                team.startYear <= selectedYear &&
                (team.startSem == selectedSemester || team.startSem == SemType.SPRING) &&
                (team.endYear == null || team.endYear >= selectedYear) &&
                (team.endSem == null || team.endSem == selectedSemester || team.endSem == SemType.FALL)
            ))})
        )).filter((value) => (value.teamHistories.length > 0)); // Checks if member has teamHistory within the selected period
    
        selected && setSelectedMembers(selected);
    }

    useEffect(() => {
        filterMembers();
    }, []);

    useEffect(() => {
        filterMembers();
    }, [selectedYear, selectedSemester]);

    const teamNamesData = api.applications.teamIDAndNames.useQuery().data;
    const teamNames: Record<number, string> = {};
    if (teamNamesData !== undefined) {
        for (const teamName of teamNamesData) {
            teamNames[teamName.teamID] = teamName.teamName;
        };
    };

    return (
        <Layout>
            <h1>Legacy</h1>
            <BreakLine/>


            <section className="flex flex-col gap-8">

                {/* Selection */}
                <section>
                    <h2>Select period</h2>
                    <div className="flex flex-row gap-4">
                        <select
                            defaultValue={thisYear}
                            className="text-black rounded-md p-2"
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {availableYears.map((year) => (
                                <option key={year}>{year}</option>
                            ))}
                        </select>
                        <select
                            defaultValue={thisSem}
                            className="text-black rounded-md p-2"
                            onChange={(e) => setSelectedSemester(SemType[e.target.value as keyof typeof SemType])}
                        >
                            {availableSemesters.map((sem) => (
                                <option key={sem}>{sem}</option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Results */}
                <section className="flex flex-col gap-4">
                    {/* Display each team */}
                    {Object.entries(teamNames).map(([key, value]) => (
                        <div key={key}>
                            <h2>{value}</h2>
                            <div className="flex flex-row flex-wrap gap-2 ml-4">
                                {selectedMembers
                                    // filtering by teams
                                    .filter((value) => (value.teamHistories.map((team) => (team.teamID)).includes(Number(key))))
                                    .map((value) => (
                                        <div key={value.member.memberID} className="flex flex-col bg-slate-400 rounded-md p-2 w-52 gap-4">
                                            <p className="text-xl">{value.member.name}</p>
                                            {value.teamHistories.map((team) => (
                                                <div key={team.teamHistoryID}>
                                                    <p>StartYear: {team.startYear}</p>
                                                    <p>StartSem: {team.startSem}</p>
                                                    <p>EndYear: {team.endYear}</p>
                                                    <p>EndSem: {team.endSem}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </section>

            </section>


        </Layout>
    );
};

export default Legacy;