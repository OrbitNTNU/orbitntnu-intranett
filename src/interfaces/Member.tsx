import { Announcement } from "./Announcement";
import { InterestedIn } from "./InterestedIn";
import { Interview } from "./Interview";
import { MemeInfo } from "./MemeInfo";
import { TeamHistory } from "./TeamHistory";

export interface Member {
    memberID: number;
    firstName: string;
    lastName: string;
    activeStatus: boolean;
    fieldOfStudy: string;
    birthday: Date;
    phoneNumber: string;
    ntnuMail: string;
    backupMail: string;
    nationalities: string;
    yearOfStudy: number;
    additionalComments: string;
    googleToken: string;
    slackToken: string;
    anouncements: Announcement[];
    events: Event[];
    interestedIn: InterestedIn[];
    interviews: Interview[];
    memes: MemeInfo[];
    team: TeamHistory[];
  }
