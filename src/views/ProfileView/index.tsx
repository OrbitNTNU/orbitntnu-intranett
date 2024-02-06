import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import InfoDisplay from "@/components/ProfilePage/InfoDisplay";
import Layout from "@/templates/Layout";
import type { Member } from "@prisma/client";

export const getMemberInfo = (member: Member) => {
  const memberInfo = [
    {
      label: "Active Status",
      value: member.activeStatus ? "Active" : "Inactive",
      type: "checkbox",
    },
    { label: "Field of Study", value: member.fieldOfStudy, type: "text" },
    {
      label: "Birthday",
      value: member.birthday ? member.birthday.toLocaleDateString() : null,
      type: "date",
    },
    { label: "Nationalities", value: member.nationalities, type: "text" },
    { label: "Phone Number", value: member.phoneNumber, type: "phone" },
    { label: "NTNU Mail", value: member.ntnuMail, type: "text" },
    { label: "Orbit Mail", value: member.orbitMail, type: "string" },
    {
      label: "Year of Study",
      value: String(member.yearOfStudy),
      type: "number",
    },
  ];

  return memberInfo;
};

interface ProfileViewProps {
  member: Member;
  edit: boolean;
  handleRedirect?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  member,
  edit,
  handleRedirect,
}) => {
  const memberInfo = getMemberInfo(member);

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1>
          {member.firstName} {member.lastName}
        </h1>
        {edit && (
          <Button
            label={"Edit Information"}
            onClick={handleRedirect}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
          />
        )}
      </div>

      <BreakLine />
      <h2>Member information:</h2>

      <div className="ml-4">
        {memberInfo.map(
          (info) =>
            info.value && (
              <InfoDisplay
                key={info.label}
                label={info.label}
                value={info.value}
                full={false}
              />
            ),
        )}
      </div>
    </Layout>
  );
};

export default ProfileView;
