import { TeamHistory } from "@/interfaces/TeamHistory";

const mockTeamHistory: TeamHistory[] = [
    {
        mid: 1,
        tid: 1,
        startYear: 2022,
        startSem: 0,
        priveledges: "Leader",
    },
    {
        mid: 1,
        tid: 3,
        startYear: 2021,
        startSem: 0,
        endYear: 2022,
        endSem: 1,
        priveledges: "Member",
    },
    {
        mid: 2,
        tid: 1,
        startYear: 2020,
        startSem: 0,
        priveledges: "Member",
    }
];

export default mockTeamHistory;