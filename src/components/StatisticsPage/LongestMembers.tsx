import { api } from "@/utils/api";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

interface LongestMembers {
    name: string;
    memberID: number;
    duration: number;
}

const LongestMembers = () => {
    // Fetch ages data
    const longestMembersData = api.members.getLongestMembers.useQuery();

    // State to hold age distribution
    const [longestMembers, setLongestMembers] = useState<LongestMembers[]>([]);

    useEffect(() => {
        // Effect to update age distribution when ages data changes
        if (!longestMembersData.isLoading && longestMembersData.data) {
            setLongestMembers(longestMembersData.data);
        }
    }, [longestMembersData.isLoading, longestMembersData.data]); // Specify the dependencies here

    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the chart canvas element
    const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance

    // Create or update the chart when age distribution changes
    useEffect(() => {
        if (longestMembers.length > 0 && chartRef.current) {
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
                        labels: longestMembers.map((age) => age.name), // Extracting the age labels
                        datasets: [
                            {
                                label: 'Time in Orbit',
                                data: longestMembers.map((age) => age.duration), // Extracting the count data
                                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Blue color
                                hoverBackgroundColor: 'rgba(75, 250, 100, 0.8)', // Bright green hover color
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            x: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Duration (Years)', // Y-axis label
                                },
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
    }, [longestMembers]); // Update chart when age distribution changes

    return (
        <div>
            <h2>Longest Memberships in Orbit (Active Members)</h2>
            <canvas ref={chartRef} width="400" height="200" />
        </div>
    );
};

export default LongestMembers;
