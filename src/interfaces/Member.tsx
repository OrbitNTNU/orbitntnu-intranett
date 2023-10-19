export interface Member {
    mid: number;
    firstName: string;
    lastName: string;
    activeStatus: boolean;
    fieldOfStudy?: string;
    birthday?: Date;
    telephone?: number;
    ntnuMail: string;
    backupMail?: string;
    nationalities?: string;
    yearOfStudy?: number;
    additionalComments?: string;
  }
