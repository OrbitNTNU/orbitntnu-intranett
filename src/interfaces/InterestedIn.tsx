import { Application } from "./Application";
import { Member } from "./Member";

export interface InterestedIn {
    memberID: number;
    applicationID: number;
    application: Application;
    member: Member;
}