import { api } from "@/utils/api";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

interface AgeDistribution {
    age: string;
    count: number;
}

const Age = () => {
    // Fetch ages data
    const agesData = api.members.getAges.useQuery();

    // State to hold age distribution
    const [ageDistribution, setAgeDistribution] = useState<AgeDistribution[]>([]);

    useEffect(() => {
        // Effect to update age distribution when ages data changes
        if (!agesData.isLoading && agesData.data) {
            setAgeDistribution(agesData.data);
        }
    }, [agesData.isLoading, agesData.data]); // Specify the dependencies here

    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the chart canvas element
    const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance

    // Create or update the chart when age distribution changes
    useEffect(() => {
        if (ageDistribution.length > 0 && chartRef.current) {
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
                        labels: ageDistribution.map((age) => age.age), // Extracting the age labels
                        datasets: [
                            {
                                label: 'Number of People',
                                data: ageDistribution.map((age) => age.count), // Extracting the count data
                                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Blue color
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
    }, [ageDistribution]); // Update chart when age distribution changes

    return (
        <div>
            <h2>Age Distribution (Active Members)</h2>
            <canvas ref={chartRef} width="400" height="200" />
        </div>
    );
};

export default Age;
