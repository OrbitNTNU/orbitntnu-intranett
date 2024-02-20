import CalendarDisplay from "@/components/CalendarPage/CalendarDisplay";
import type { Event, Member } from "@prisma/client";
import { generateColor } from "@/components/CalendarPage/Colors";
import Link from "next/link";
import EventDisplay from "@/components/CalendarPage/EventDisplay";
import router from "next/router";
import Icons from "@/components/General/Icons";

interface CalendarViewProps {
    combinedInfo: { event: Event, author: Member }[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ combinedInfo }) => {
    const eventTypes: string[] = [];

    combinedInfo.forEach((combo) => {
        if (combo.event.type && !eventTypes.includes(combo.event.type)) {
            eventTypes.push(combo.event.type);
        }
    });

    const eventColors = generateColor(combinedInfo.length);

    const generatedIndexes = {WORK: 0, PRIORITY: 1, SOCIAL: 2};

    return (
        <div className="w-full">
            <Link href={"/calendar"}>
                <h2 className="flex font-bold items-center text-5xl mb-4">
                    Calendar
                    <Icons name="Arrow45Up" />
                </h2>
            </Link>
            <div className="flex flex-row flex-wrap md:flex-nowrap m-6">
                <div className="md:w-2/3 w-full mr-0 md:mr-4">
                    <CalendarDisplay indexes={generatedIndexes} eventColors={eventColors} eventItems={combinedInfo} />
                </div>
                <div className="md:w-1/3 w-full">
                    {combinedInfo
                        .filter((combo) => new Date(combo.event.startTime) > new Date()) // Filter out upcoming events
                        .sort((a, b) => Number(new Date(a.event.startTime)) - Number(new Date(b.event.startTime))) // Sort the array based on startTime
                        .slice(0, 3)
                        .map((combo) => (
                            <>
                                <EventDisplay eventCombo={combo} eventColors={eventColors} indexes={generatedIndexes} />
                            </>
                        ))}
                    <button
                        className="bg-gradient-to-r w-full h-[46px] from-cyan-500 to-blue-500 font-bold py-2 px-4 md:mt-0 mt-6 mb-4  md:max-w-64 hover:bg-blue-800 flex items-center justify-center rounded-md"
                        onClick={() => { void router.push("/calendar") }}
                    >
                        <div className="mr-2">
                            <Icons name="ArrowDown" />
                        </div>
                        Show more
                    </button>
                </div>
            </div>
        </div >
    );
};