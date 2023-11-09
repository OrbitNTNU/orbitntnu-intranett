import { Application } from "./Application";
import { Team } from "./Team";

export interface ApplyForTeam {
    applicationID: number,
    teamID: number,
    priority: number,
    application: Application,
    team: Team,
}