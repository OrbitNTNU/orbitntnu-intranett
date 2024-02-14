import CalendarDisplay from "@/components/CalendarDisplay";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { Event } from "@/interfaces/Event";
import { generateColor } from "@/components/Colors";
import Header from "@/components/PageHeader";

const CalendarPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const query = api.events.getEvents.useQuery();

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await query.refetch();

                // Handle the response if needed
                if (isMounted && response.data) {
                    setEvents(response.data);
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
    }, []); // Empty dependency array since we're not using any external dependencies

    const generatedIndexes: Record<string, number> = {};
    events.forEach((event, index) => {
        if (event.type) {
            generatedIndexes[event.type] = index;
        }
    });

    const eventColors = generateColor(events.length);

    return (
        <Layout>
            <Header label={"Kalenderside"} />
            <div className="w-full">
                <CalendarDisplay indexes={generatedIndexes} courseColors={eventColors} eventItems={events}/>
            </div>
        </Layout>
    );
};

export default CalendarPage;
