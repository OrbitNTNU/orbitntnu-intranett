import { api } from "@/utils/api";
import type { Team } from "@prisma/client";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

const TeamsGrowth = () => {
    const [growth, setGrowth] = useState<Record<string, Team[]>>({}); // Initialize growth state with an empty object
    const [teams, setTeams] = useState<Team[]>([]); // Initialize growth state with an empty object
    const [selectedTeam, setSelectedTeam] = useState<number>(0); // Initialize growth state with an empty object

    // Fetch teams data
    const teamsData = api.teamHistories.getGrowth.useQuery(selectedTeam !== 0 ? true : false);
    const allTeams = api.teams.getTeams.useQuery();

    useEffect(() => {
        
        // Effect to update team membership distribution when teams data changes
        if (!teamsData.isLoading && teamsData.data) {
            // Sort the entries of the growth object based on keys (year_sem)
            const sortedGrowth = Object.fromEntries(
                Object.entries(teamsData.data).sort(([keyA], [keyB]) => {
                    const [yearA, semA] = keyA.split('_');
                    const [yearB, semB] = keyB.split('_');
                    // Sort by year first, then by semester
                    if (yearA && yearB && semA && semB) {
                        return yearA.localeCompare(yearB) || semB.localeCompare(semA);
                    }
                    // If the if condition is not met, return 0 to indicate that they are equal
                    return 0;
                })
            );
            setGrowth(sortedGrowth);
        }
    }, [teamsData.isLoading, teamsData.data, selectedTeam]);

    useEffect(() => {
        // Effect to update team membership distribution when teams data changes
        if (!allTeams.isLoading && allTeams.data) {
            setTeams(allTeams.data);
        }
    }, [allTeams.isLoading, allTeams.data]);

    const chartRef = useRef<HTMLCanvasElement | null>(null); // Specify the type of ref
    const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance

    useEffect(() => {
        // Create or update the chart when team membership distribution changes
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy existing chart instance if it exists
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }
                // Create new chart instance
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(growth).map((key) => {
                            const [year, sem] = key.split('_');
                            return `${year} - ${sem}`;
                        }),
                        datasets: selectedTeam === 0 ? [{
                            label: `All`,
                            data: Object.entries(growth).map(([, values]) => {
                                // Count the total number of teams for each year
                                const teamCount = values.length;
                                return teamCount;
                            })
                        }] :
                            teams
                                .filter(team => team.teamID === selectedTeam)
                                .map((team) => ({
                                    label: `${team.teamName}`,
                                    data: Object.entries(growth)
                                        .map(([, values]) => {
                                            // Create an object to store the count of teams for each teamName
                                            const teamCountMap: Record<string, number> = {};

                                            // Iterate over each team in the values array
                                            values.forEach(teamValue => {
                                                if (teamValue.teamID === team.teamID) {
                                                    if (teamCountMap[teamValue.teamName]) {
                                                        teamCountMap[teamValue.teamName]++;
                                                    } else {
                                                        teamCountMap[teamValue.teamName] = 1;
                                                    }
                                                }
                                            });

                                            // Sum the occurrences of team names and return as an array
                                            const sum = Object.values(teamCountMap).reduce((acc, count) => acc + count, 0);
                                            return sum;
                                        }),
                                    backgroundColor: 'rgba(54, 162, 235, 0.8)', // Blue color
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    hoverBackgroundColor: 'rgba(75, 250, 100, 0.8)', // Bright green hover color
                                })),
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        plugins: {
                            tooltip: {
                                enabled: true,
                                mode: 'index',
                                intersect: false,
                            },
                            legend: {
                                display: false,
                            },
                        },
                    },
                });
            }
        }
    }, [growth, selectedTeam, teams]); // Update chart when growth state changes

    const handleSelectTeam = (teamID: number) => {
        setSelectedTeam(teamID);
    }

    return (
        <div>
            <h2>Orbit Growth</h2>
            <div className="hidden md:flex flex-row gap-2 items-center justify-center flex-wrap my-2">
                {teams.sort((a, b) => a.teamName.localeCompare(b.teamName)).map((team) => (
                    <button
                        onClick={() => handleSelectTeam(team.teamID)}
                        key={team.teamID}
                        className={` ${team.teamID === selectedTeam ? 'bg-green-500' : ''} text-white font-bold py-2 px-4 rounded whitespace-nowrap`}
                    >
                        {team.teamName}
                    </button>
                ))}
                <button
                    onClick={() => handleSelectTeam(0)}
                    key={0}
                    className={` ${0 === selectedTeam ? 'bg-green-500' : ''} text-white font-bold py-2 px-4 rounded`}
                >
                    All
                </button>
            </div>

            <canvas ref={chartRef} width="400" height="200" />
        </div>
    );
};

export default TeamsGrowth;
