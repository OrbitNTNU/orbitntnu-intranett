import { api } from "@/utils/api";
import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

const Studies = () => {
    // Fetch teams data
    const studiesData = api.members.getStudies.useQuery();

    // State to hold team membership distribution
    const [studies, setStudies] = useState<Record<string, number>>({});

    useEffect(() => {
        // Effect to update team membership distribution when teams data changes
        if (!studiesData.isLoading && studiesData.data) {
            setStudies(studiesData.data);
        }
    }, [studiesData.isLoading, studiesData.data]); // Specify the dependencies here

    const chartRef = useRef<HTMLCanvasElement | null>(null); // Reference to the chart canvas element
    const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance
            
    // Create or update the chart when study distribution changes
    if (Object.entries(studies).length > 0 && chartRef.current) {
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
                    labels: Object.keys(studies),
                    datasets: [
                        {
                            label: 'Member Count',
                            data: Object.values(studies),
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

    // Calculate the most common field of study (excluding "No Data") and the total count of studies
    let mostCommonStudy = "";
    let mostCommonStudyCount = 0;
    let differentStudiesCount = 0;

    if (studies) {
        const filteredStudies = Object.entries(studies).filter(([study]) => study !== "No Data");
        differentStudiesCount = filteredStudies.length;
        if (filteredStudies.length > 0) {
            [mostCommonStudy, mostCommonStudyCount] = filteredStudies.reduce((acc, [study, count]) => {
                if (count > acc[1]) {
                    return [study, count];
                }
                return acc;
            }, ["", 0]);
        }
    }

    return (
        <div>
            <h2>Studies in Orbit (Active Members)</h2>
            <canvas ref={chartRef} width="400" height="200" />
            <div className="flex flex-row flex-wrap">
                <div className="bg-blue-500 p-4 m-2 rounded-full">
                    Most Common: {mostCommonStudy} ({mostCommonStudyCount} members)
                </div>
                <div className="bg-blue-500 p-4 m-2 rounded-full">
                    Total Amount of different studies: {differentStudiesCount}
                </div>
            </div>
        </div>
    );
};

export default Studies;