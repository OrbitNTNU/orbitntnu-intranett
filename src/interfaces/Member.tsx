export interface Member {
  memberID?: number; // Make mid optional
  firstName: string;
  lastName: string;
  activeStatus: boolean;
  fieldOfStudy: string;
  birthday: Date | null;
  phoneNumber: string;
  ntnuMail: string;
  backupMail: string | null;
  nationalities: string | null;
  yearOfStudy: string | null;
  additionalComments: string | null;
}
