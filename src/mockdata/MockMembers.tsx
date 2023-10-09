import { Member } from "@/interfaces/Member";

const mockMembers: Member[] = [
    {
      mid: 1,
      firstName: 'John',
      lastName: 'Doe',
      activeStatus: true,
      fieldOfStudy: 'MTDT',
      birthday: new Date('2003-05-30'),
      telephone: 93098264,
      ntnuMail: 'johndo@stud.ntnu.no',
      backupMail: 'john@doe.com',
      nationalities: 'German, Polish',
      yearOfStudy: 2,
      additionalComments: '',
    },
    {
      mid: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      activeStatus: true,
      fieldOfStudy: 'MTELSYS',
      birthday: new Date('2001-04-12'),
      telephone: 93076104,
      ntnuMail: 'jansmi@stud.ntnu.no',
      backupMail: 'jane@smite.com',
      nationalities: 'English, Argentinian',
      yearOfStudy: 4,
      additionalComments: '',
    },
  ];

export default mockMembers;

