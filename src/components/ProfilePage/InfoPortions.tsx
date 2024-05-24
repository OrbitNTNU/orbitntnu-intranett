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
    ('orbitMail' in member && member.orbitMail !== undefined) ||
    ('ntnuMail' in member && member.ntnuMail !== undefined) ||
    ('personalMail' in member && member.personalMail !== undefined) ||
    ('phoneNumber' in member && member.phoneNumber !== undefined);

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
        ('slackID' in member && member.slackID !== undefined) ||
        ('memberID' in member && member.memberID !== undefined) ||
        ('activeStatus' in member && member.activeStatus !== undefined) ||
        ('showPhoneNrOnWebsite' in member && member.showPhoneNrOnWebsite !== undefined) ||
        ('birthdayBot' in member && member.birthdayBot !== undefined);

    if (!hasSystemInfo) return null;

    return (
        <div>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>System Information:</h3>
            </li>
            {member.slackID && <ListItem label="Slack ID" value={member.slackID}/>}
            {member.memberID && <ListItem label="Member ID" value={String(member.memberID)}/>}
            {member.activeStatus !== undefined && <ListItem label="Active Status" value={String(member.activeStatus)} />}
            {member.showPhoneNrOnWebsite !== undefined && <ListItem label="Public Phone Number" value={String(member.showPhoneNrOnWebsite)} />}
            {member.birthdayBot !== undefined && <ListItem label="BirthdayBot" value={String(member.birthdayBot)} />}
        </div>
    );
};
export const OtherInfo = ({ member }: { member: MemberInput }) => {
    const hasOtherInfo =
        ('birthday' in member && member.birthday !== undefined) ||
        ('fieldOfStudy' in member && member.fieldOfStudy !== undefined) ||
        ('yearOfStudy' in member && member.yearOfStudy !== undefined) ||
        ('additionalComments' in member && member.additionalComments !== undefined) ||
        ('nationalities' in member && member.nationalities !== undefined);

    if (!hasOtherInfo) return null;

    return (
        <>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>Other Information:</h3>
            </li>
            {member.fieldOfStudy && <ListItem label="Field of Study" value={member.fieldOfStudy} />}
            {member.yearOfStudy && <ListItem label="Year of Study" value={String(member.yearOfStudy)} />}
            {member.birthday && <ListItem label="Birthday" value={member.birthday.toLocaleDateString()} />}
            {'additionalComments' in member && member.additionalComments && <ListItem label="Additional Comments" value={member.additionalComments} />}
            {'nationalities' in member && member.nationalities && <ListItem label="Nationalities" value={member.nationalities} />}
        </>
    );
};


export const Links = ({ member }: { member: MemberInput }) => {
    const hasLinks =
        ('linkedin' in member && member.linkedin !== null && member.linkedin !== "");

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
                console.log(field);
                const formattedField = formatCamelCaseToReadable(field);
                return (
                    <ListItem key={index} label={formattedField} value="Unknown" />
                )
            })}
        </>
    );
};

function formatCamelCaseToReadable(camelCaseString: string) {
    // Split the camelCase string by capital letters
    const words = camelCaseString.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them with spaces
    const formattedString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return formattedString;
}