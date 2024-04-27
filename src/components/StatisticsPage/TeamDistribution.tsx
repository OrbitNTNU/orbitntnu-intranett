import { api } from "@/utils/api";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

interface TeamMembership {
    teamName: string;
    memberCount: number;
}

const MemberDistribution = () => {
    // Fetch teams data
  const teamsData = api.teamHistories.getCurrentHistoriesInTeams.useQuery();

  // State to hold team membership distribution
  const [teamMembershipDistribution, setTeamMembershipDistribution] = useState<TeamMembership[]>([]);

  useEffect(() => {
    // Effect to update team membership distribution when teams data changes
    if (!teamsData.isLoading && teamsData.data) {
        const membershipDistribution = teamsData.data.map((team) => {
            return {
                teamName: team.teamName,
                memberCount: team.teamHistories.length,
            };
        });

        membershipDistribution.sort((a, b) => a.teamName.localeCompare(b.teamName));

        setTeamMembershipDistribution(membershipDistribution);
    }
}, [teamsData.isLoading, teamsData.data]); // Specify the dependencies here

    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the chart canvas element
    const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance
        
    // Effect to create or update the chart when team membership distribution changes
    if (teamMembershipDistribution.length > 0 && chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
            // Destroy existing chart instance if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            // Create new chart instance
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: teamMembershipDistribution.map((item) => item.teamName),
                    datasets: [
                        {
                            label: 'Member Count',
                            data: teamMembershipDistribution.map((item) => item.memberCount),
                            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Blue color
                            borderColor: 'rgba(54, 162, 235, 1)',
                            hoverBackgroundColor: 'rgba(75, 250, 100, 0.8)', // Bright green hover color
                        },
                    ],
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
                    },
                },
            });
        }
    }

    return (
        <div>
            <h2>Membership Distribution (Active Members)</h2>
            <canvas ref={chartRef} width="400" height="200" />
        </div>
    );
};

export default MemberDistribution;