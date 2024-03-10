import CalendarDisplay from "@/components/CalendarPage/CalendarDisplay";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { Event, Member, TeamHistory } from "@prisma/client";
import { generateColor } from "@/components/CalendarPage/Colors";
import EventDisplay from "@/components/CalendarPage/EventDisplay";
import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import { useSession } from "next-auth/react";
import Icons from "@/components/General/Icons";

interface EventListProps {
    events: { event: Event, author: Member }[];
    generatedIndexes: Record<string, number>;
    eventColors: Record<number, string>;
}

const EventList: React.FC<EventListProps> = ({ events, generatedIndexes, eventColors }) => {
    return (
        <div className="flex overflow-x-auto gap-6">
            {events.length === 0 ? (
                <p>No events available</p>
            ) : (
                events.map((combo) => (
                    <EventDisplay key={combo.event.eventID} indexes={generatedIndexes} eventCombo={combo} eventColors={eventColors} />
                ))
            )}
        </div>
    );
};

const CalendarPage = () => {
    const [eventCombos, setEventCombos] = useState<{ event: Event, author: Member }[]>([]);
    const [ownEventCombos, setOwnEventCombos] = useState<{ event: Event, author: Member }[]>([]);

    const session = useSession();

    const allEventsQuery = api.events.getEvents.useQuery();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const allEventsResponse = await allEventsQuery.refetch();
                // Handle the response if needed
                if (isMounted && allEventsResponse.data) {
                    setEventCombos(allEventsResponse.data);
                    setOwnEventCombos(allEventsResponse.data.filter((eventCombo) => eventCombo.author.orbitMail === session.data?.user.email))
                }

            } catch (error) {
                console.error('Error refetching study plan:', error);
            }
        };

        void fetchData();

        return () => {
            // Cleanup function to set isMounted to false when the component unmounts
            isMounted = false;
        };
    }, [allEventsQuery, session.data?.user.email]); // Empty dependency array since we're not using any external dependencies

    const eventTypes: string[] = [];

    eventCombos.forEach((combo) => {
        if (combo.event.type && !eventTypes.includes(combo.event.type)) {
            eventTypes.push(combo.event.type);
        }
    });

    const eventColors = generateColor(eventCombos.length);

    const addEvent = () => {
        console.log("Add event")
    }

    const generatedIndexes = { WORK: 0, PRIORITY: 1, SOCIAL: 2 };

    const sessionMember = session.data?.user.member as Member;
    const teamHistoriesData = api.teamHistories.getTeamHistories.useQuery();
    const teamHistories: TeamHistory[] = teamHistoriesData.data ?? [];

    let isLeaderOrBoard = false; // Initialize the variable

    if (sessionMember) {
        // Check if the member is a leader or on the board
        isLeaderOrBoard = teamHistories.some(history =>
            history?.memberID === sessionMember.memberID &&
            history?.endSem === null &&
            history?.endYear === null &&
            (history?.priviledges === "LEADER" || history?.priviledges === "BOARD")
        );
    }

    return (
        <Layout>
            <div className='md:flex justify-between items-center'>
                <ul>
                    <h1>Orbit Calendar</h1>
                </ul>
                {isLeaderOrBoard && (
                    <div className="md:mt-0 mt-4">
                        <Button label={'Add an event'} onClick={addEvent} icon="Create" />
                    </div>
                )}
            </div>
            <BreakLine />
            <CalendarDisplay indexes={generatedIndexes} eventColors={eventColors} eventItems={eventCombos} />

            <>
                <h2 className="mt-4">Your Created Events</h2>
                <EventList
                    events={
                        ownEventCombos
                            .sort((a, b) => Number(new Date(a.event.startTime)) - Number(new Date(b.event.startTime)))
                    }
                    generatedIndexes={generatedIndexes}
                    eventColors={eventColors}
                />

                <h2 className="mt-4">Upcoming Events</h2>
                <EventList
                    events={
                        eventCombos
                            .sort((a, b) => Number(new Date(a.event.startTime)) - Number(new Date(b.event.startTime)))
                            .filter(combo => new Date(combo.event.startTime) > new Date())
                    }
                    generatedIndexes={generatedIndexes}
                    eventColors={eventColors}
                />

                <h2 className="mt-4">Passed Events:</h2>
                <EventList
                    events={
                        eventCombos
                            .sort((a, b) => Number(new Date(b.event.startTime)) - Number(new Date(a.event.startTime)))
                            .filter(combo => new Date(combo.event.startTime) < new Date())
                    }
                    generatedIndexes={generatedIndexes}
                    eventColors={eventColors}
                />
            </>
            <div className="min-w-[400px] h-[235px] max-w-[500px] flex flex-col rounded-lg md:mt-0 mt-6 mb-4 p-4 bg-green-500">
                <div>
                    <h3 className="text-xl font-bold flex flex-row justify-between items-center">
                        <p>eventCombo.event.name</p>
                        <div className="flex flex-row items-center gap-2">
                            <Icons name="Location" />
                            <p className="ml-auto">eventCombo.event.location</p>
                        </div>
                    </h3>
                    <p className="mt-1">
                        formattedStartTime - formattedEndTime
                    </p>
                    <hr className="border my-1" />
                    <p className="mt-1 overflow-auto h-[100px]">
                        eventCombo.event.description
                        adsdasd
                        adsasdas
                        dsa
                        adsasdasdas
                        das
                        dsads
                        adsasdasdas
                        asd
                        das
                        das
                        das
                        das
                        das
                        hg
                        hfg
                        fdasdas
                        adsasdassadasd

                        das
                        dfd
                        fdfd
                        fd
                        fgfs
                        ghhfg
                        hfgh
                        fetchingfgh
                        fetchingfghfgh
                        fgh
                        fg
                        hf
                        hf
                        ghd
                        ghfg
                        jtd
                        rqwereqwfdsfdsf

                        fdasd
                        daasdas
                        ddasdasd
                        ddasdasddas
                        adsasdasdas
                        ddasdasddasdas
                        ddasdasddasads
                        daasdasda
                    </p>
                </div>
                <div className="mt-auto">
                    <div className="flex flex-row gap-2">
                        <Icons name="User" />
                        <p>
                            eventCombo.author.name
                            ", " + eventCombo.event.type
                        </p>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CalendarPage;
