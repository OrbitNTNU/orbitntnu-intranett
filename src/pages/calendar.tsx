import CalendarDisplay from "@/components/CalendarPage/CalendarDisplay";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { Event, Member } from "@prisma/client";
import { generateColor } from "@/components/CalendarPage/Colors";
import EventDisplay from "@/components/CalendarPage/EventDisplay";
import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/General/Loading";

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
    const [loading, setIsLoading] = useState<boolean>(true);

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
                    setIsLoading(false);
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

    const generatedIndexes = {WORK: 0, PRIORITY: 1, SOCIAL: 2};

    return (
        <Layout>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <div className='md:flex justify-between items-center'>
                        <ul>
                            <h1>Orbit Calendar</h1>
                        </ul>
                        <div className="md:mt-0 mt-4">
                            <Button label={'Add an event'} onClick={addEvent} icon="Create" />
                        </div>
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
                </>
            )}
        </Layout>
    );
};

export default CalendarPage;