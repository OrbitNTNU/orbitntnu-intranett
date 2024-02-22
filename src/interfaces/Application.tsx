import { Interview } from "./Interview";
import { InterestedIn } from "./InterestedIn";
import { ApplyForTeam } from "./ApplyForTeam";

export interface Application {
    applicationID: number,
    ntnuUsername: string,
    email: string,
    phoneNumber: string,
    fieldOfStudy: string,
    yearOfStudy: number,
    experience: string,
    aboutYou: string,
    accepted: boolean,
    firstName: string,
    keep: boolean,
    lastName: string,
    rejectTime: Date,
    teams: ApplyForTeam[],
    inInterestOf: InterestedIn[],
    interviews?: Interview,
}