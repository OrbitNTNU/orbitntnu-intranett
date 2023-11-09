import { Application } from "./Application";
import { Member } from "./Member";

export interface Interview {
    interviewerID: number,
    applicationID: number,
    room: string,
    time: Date,
    application: Application,
    interviewer: Member,
}