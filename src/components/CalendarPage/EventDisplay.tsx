import type { Event, Member } from "@prisma/client";
import { setContrast } from "./Colors";
import Icons from "../General/Icons";
import Link from "next/link";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

export const formatDateTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // Full name of the weekday (e.g., “Monday”)
        year: "numeric", // Numeric representation of the year (e.g., “2022”)
        month: "short", // Full name of the month (e.g., “January”)
        day: "numeric", // Numeric representation of the day (e.g., “1”)
        hour: "2-digit", // Numeric representation of the hour (e.g., “13”)
        minute: "2-digit", // Two-digit representation of the minute (e.g., “05”)
        hour12: false, // Use 24-hour format

    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

interface EventDisplayProps {
    eventCombo: { event: Event, author: Member };
    eventColors: Record<string, string>;
    indexes: Record<string, number>;
    handleDeleteEvent?: (eventID: number) => void; // Define handleDeleteEvent in props
}

const EventDisplay: React.FC<EventDisplayProps> = ({ eventCombo, eventColors, indexes, handleDeleteEvent }) => {
    const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
    const teamHistories = teamHistoriesData.data ?? [];

    const backgroundColor = eventColors[indexes[eventCombo.event.type]!];

    // Check if backgroundColor is defined before calling setContrast
    const textColor = backgroundColor ? setContrast(backgroundColor) : '';

    const formattedStartTime = formatDateTime(eventCombo.event.startTime);
    const formattedEndTime = formatDateTime(eventCombo.event.endTime);

    const isCalendarPage = location.pathname === '/calendar';

    const session = useSession();
    const sessionMember = session.data?.user.member;

    const canDelete = !!(
        (sessionMember &&
        teamHistories.find(
            history =>
                history?.memberID === sessionMember.memberID &&
                history?.endSem === null &&
                history?.endYear === null &&
                history?.teamID === 1
        )) ?? (sessionMember && sessionMember.memberID === eventCombo.author.memberID)
    );    

    return (
        <div
            key={eventCombo.event.eventID}
            className={`h-[235px] max-w-[500px] ${isCalendarPage ? 'min-w-[400px]' : ''} flex flex-col rounded-lg md:mt-0 mt-6 mb-4 p-4`}
            style={{ backgroundColor: backgroundColor, color: textColor }}
        >
            <div>
                <h3 className="text-xl font-bold flex flex-row justify-between items-center">
                    <span>{eventCombo.event.name}</span>
                    <div className="flex flex-row items-center gap-2">
                        <Icons name="Location" />
                        <span className="ml-auto">{eventCombo.event.location}</span>
                    </div>
                </h3>
                <p className="mt-1">
                    {formattedStartTime} - {formattedEndTime}
                </p>
                <hr className="border my-1" />
                <p className="mt-1 overflow-auto max-h-[100px]">
                    {eventCombo.event.description}
                </p>
            </div>
            <div className="mt-auto flex flex-row justify-between items-center">
                <Link href={"/profile/" + eventCombo.author.memberID}>
                    <div className="flex flex-row gap-2">
                        <Icons name="User" />
                        {eventCombo.author.name}
                        {", " + eventCombo.event.type}
                    </div>
                </Link>
                {canDelete && handleDeleteEvent && (
                    <button
                        className={`rounded-lg hover:bg-red-500 p-0.5`}
                        onClick={() => handleDeleteEvent(eventCombo.event.eventID)}
                    >
                        <Icons name="Cross" />
                    </button>
                )}
            </div>
        </div>
    )

}

export default EventDisplay;