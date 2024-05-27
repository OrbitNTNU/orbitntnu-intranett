import type { Member } from "@prisma/client";
import BreakLine from "../General/Breakline";
import Link from "next/link";
import Icons from "../General/Icons";

const ListItem = ({ label, value }: { label: string, value: string }) => (
    <li className='mb-1'>
        <span className='font-semibold'>{label}: </span>
        <span className={value === 'Unknown' ? 'text-red-400' : 'text-blue-400'}>{value}</span>
    </li>
);

const ListLink = ({ label, value }: { label: string, value: string }) => (
    <Link href={value} target="_blank">
        <li className='mb-1 bg-blue-500 w-min rounded-md p-1 flex flex-row gap-2'>
            <span className='font-semibold'>{label} </span>
            <Icons name="ArrowCircleRight" />
        </li>
    </Link>
);

interface MemberSubset {
    // Define the properties that are present in the dynamic subset
    birthday: Date | null;
    linkedin: string | null;
    orbitMail: string | null;
    phoneNumber: string | null;
    name: string;
    yearOfStudy: number | null;
    fieldOfStudy: string | null;
}

export type MemberInput = Member | MemberSubset;

export const ContactInfo = ({ member }: { member: MemberInput }) => {
    const hasContactInfo =
        ('orbitMail' in member && member.orbitMail) ??
        ('ntnuMail' in member && member.ntnuMail) ??
        ('personalMail' in member && member.personalMail) ??
        ('phoneNumber' in member && member.phoneNumber);

    if (!hasContactInfo) return null;

    return (
        <>
            <li className='mb-2'>
                <h3 className='text-lg font-semibold'>Contact Information:</h3>
            </li>
            {member.orbitMail && <ListItem label="Orbit Email" value={member.orbitMail} />}
            {'ntnuMail' in member && member.ntnuMail && <ListItem label="NTNU Email" value={member.ntnuMail.trim()} />}
            {'personalMail' in member && member.personalMail && <ListItem label="Backup Email" value={member.personalMail.trim()} />}
            {member.phoneNumber && <ListItem label="Phone Number" value={member.phoneNumber.trim()} />}
        </>
    );
};

export const SystemInfo = ({ member }: { member: MemberInput }) => {
    // Check if each attribute we are working with is present in the member object
    const hasSystemInfo =
        ('slackID' in member && member.slackID) ??
        ('memberID' in member && member.memberID) ??
        ('activeStatus' in member && member.activeStatus) ??
        ('showPhoneNrOnWebsite' in member && member.showPhoneNrOnWebsite) ??
        ('birthdayBot' in member && member.birthdayBot)

    if (!hasSystemInfo) return null;

    return (
        <div>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>System Information:</h3>
            </li>
            {'slackID' in member && member.slackID && <ListItem label="Slack ID" value={member.slackID} />}
            {'memberID' in member && member.memberID && <ListItem label="Member ID" value={String(member.memberID)} />}
            {'activeStatus' in member && member.activeStatus !== undefined && <ListItem label="Active Status" value={String(member.activeStatus)} />}
            {'showPhoneNrOnWebsite' in member && member.showPhoneNrOnWebsite !== undefined && <ListItem label="Public Phone Number" value={String(member.showPhoneNrOnWebsite)} />}
            {'birthdayBot' in member && member.birthdayBot !== undefined && <ListItem label="BirthdayBot" value={String(member.birthdayBot)} />}
        </div>
    );
};
export const OtherInfo = ({ member }: { member: MemberInput }) => {
    const hasOtherInfo =
        ('birthday' in member && member.birthday) ??
        ('fieldOfStudy' in member && member.fieldOfStudy) ??
        ('yearOfStudy' in member && member.yearOfStudy) ??
        ('additionalComments' in member && member.additionalComments) ??
        ('nationalities' in member && member.nationalities);

    if (!hasOtherInfo) return null;

    return (
        <>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>Other Information:</h3>
            </li>
            {member.fieldOfStudy && <ListItem label="Field of Study" value={member.fieldOfStudy} />}
            {member.yearOfStudy && <ListItem label="Year of Study" value={String(member.yearOfStudy)} />}
            {member.birthday && <ListItem label="Birthday" value={new Date(member.birthday).toLocaleDateString('en-GB')} />}
            {'additionalComments' in member && member.additionalComments && <ListItem label="Additional Comments" value={member.additionalComments} />}
            {'nationalities' in member && member.nationalities && <ListItem label="Nationalities" value={member.nationalities} />}
        </>
    );
};


export const Links = ({ member }: { member: MemberInput }) => {
    const hasLinks =
        ('linkedin' in member && member.linkedin && member.linkedin !== "");

    if (!hasLinks) return null;

    return (
        <>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>Member Links:</h3>
            </li>
            {member.linkedin && <ListLink label="LinkedIn" value={member.linkedin} />}
        </>
    );
};


export const UnknownInfo = ({ member }: { member: MemberInput }) => {
    const unknownFields = [];

    for (const key in member) {
        if (Object.prototype.hasOwnProperty.call(member, key) && member[key as keyof MemberInput] === null) {
            unknownFields.push(key);
        }
    }

    if (unknownFields.length === 0) return null;

    // Sort unknown fields alphabetically
    unknownFields.sort();

    return (
        <>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>Unknown Information:</h3>
            </li>
            {unknownFields.map((field, index) => {
                if (field !== 'userId') {
                    const formattedField = formatCamelCaseToReadable(field);
                    return (
                        <ListItem key={index} label={formattedField} value="Unknown" />
                    )
                }
            })}
        </>
    );
};

function formatCamelCaseToReadable(camelCaseString: string) {
    // Split the camelCase string by capital letters, excluding consecutive capitals and lowercase letters
    const words = camelCaseString.split(/(?<=[a-z])(?=[A-Z])/);

    // Capitalize the first letter of each word and join them with spaces
    const formattedString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return formattedString;
}