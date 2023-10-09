import { Team } from "@/interfaces/Team";

enum TeamOverview {
    Board = 1,
    ADCS,
    DevOps,
    Electronics,
    Embedded,
    Event,
    HR,
    KAM,
    Marketing,
    Mechanics,
    Payload,
    PM,
    SatCom,
    SO,
    SysEng,
    Test,
    Web,
    Mentors
  }

enum TeamName {
    Board = "Board",
    ADCS = "Attitude Determination and Control System",
    DevOps = "Software development and Operations",
    Electronics = "Electronic Systems",
    Embedded = "Embedded Systems",
    Event = "Event",
    HR = "Human Resources",
    KAM = "Key Account Managers",
    Marketing = "Marketing",
    Mechanics = "Mechanics",
    Payload = "Payload",
    PM = "Project Managment",
    SatCom = "Sattelite Communications",
    SO = "SubOrbital",
    SysEng = "Systems Engineering",
    Test = "Test",
    Web = "Web",
    Mentors = "Mentors"
  }

const mockTeams: Team[] = [
    {
        tid: TeamOverview.ADCS,
        teamName: TeamName.ADCS
    },
    {
        tid: TeamOverview.Board,
        teamName: TeamName.Board
    },
    {
        tid: TeamOverview.Web,
        teamName: TeamName.Web
    },
    {
        tid: TeamOverview.SO,
        teamName: TeamName.SO
    }
]

export default mockTeams;