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
            <Icons name="ArrowCircleRight"/>
        </li>
    </Link>
);

export const ContactInfo = ({ member }: { member: Member }) => {
    const hasContactInfo = member.orbitMail ?? member.ntnuMail ?? member.personalMail ?? member.phoneNumber ?? member.linkedin;

    if (!hasContactInfo) return null;

    return (
        <>
            <li className='mb-2'>
                <h3 className='text-lg font-semibold'>Contact Information:</h3>
            </li>
            {member.orbitMail && <ListItem label="Orbit Email" value={member.orbitMail} />}
            {member.ntnuMail && <ListItem label="NTNU Email" value={member.ntnuMail.trim()} />}
            {member.personalMail && <ListItem label="Backup Email" value={member.personalMail.trim()} />}
            {member.phoneNumber && <ListItem label="Phone Number" value={member.phoneNumber.trim()} />}
        </>
    );
};

export const SystemInfo = ({ member }: { member: Member }) => {
    const hasSystemInfo = member.slackID ?? member.memberID ?? member.showPhoneNrOnWebsite !== undefined ?? member.birthdayBot !== undefined ?? member.activeStatus !== undefined;

    if (!hasSystemInfo) return null;

    return (
        <>
            <li className='mb-2'>
                <BreakLine />
                <h3 className='text-lg font-semibold'>System Information:</h3>
            </li>
            {member.memberID && <ListItem label="Member ID" value={String(member.memberID)} />}
            {member.slackID && <ListItem label="Slack ID" value={member.slackID} />}
            {member.activeStatus && <ListItem label="Active Status" value={String(member.activeStatus)} />}
            {member.showPhoneNrOnWebsite !== undefined && <ListItem label="Public Phone Number" value={String(member.showPhoneNrOnWebsite)} />}
            {member.birthdayBot !== undefined && <ListItem label="BirthdayBot" value={String(member.birthdayBot)} />}
        </>
    );
};

export const OtherInfo = ({ member }: { member: Member }) => {
    const hasOtherInfo = member.birthday ?? member.fieldOfStudy ?? member.yearOfStudy ?? member.additionalComments ?? member.nationalities;

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
            {member.additionalComments && <ListItem label="Additional Comments" value={member.additionalComments} />}
            {member.nationalities && <ListItem label="Nationalities" value={member.nationalities} />}

        </>
    );
};

export const Links = ({ member }: { member: Member }) => {
    const hasLinks = member.linkedin;

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


export const UnknownInfo = ({ member }: { member: Member }) => {
    const unknownFields = [];

    for (const key in member) {
        if (member.hasOwnProperty(key) && member[key] === null) {
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