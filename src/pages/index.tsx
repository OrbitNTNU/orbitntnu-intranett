import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { CalendarView } from "@/views/LandingPageViews/CalendarView";
import { Shortcuts } from "@/views/LandingPageViews/ShortcutsView";
import Welcome from "@/views/WelcomeView";
import { useEffect, useState } from "react";
import type { Event, Member } from "@prisma/client";
import ShortAnnouncements from "@/views/LandingPageViews/AnnouncementView";

const Home = () => {
  const [eventsCombo, setEventsCombo] = useState<{ event: Event, author: Member }[]>([]);
  const query = api.events.getEvents.useQuery();

  const announcementsData = api.announcements.getLatestAnnouncements.useQuery();
  const announcements = announcementsData.data;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await query.refetch();

        // Handle the response if needed
        if (isMounted && response.data) {
          setEventsCombo(response.data);
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

  return (
    <Layout>
      <div className="space-y-10 md:space-y-20 lg:space-y-30"> {/* Adjust the space as needed */}
      <Welcome></Welcome>
      <Shortcuts />
      <ShortAnnouncements announcements={announcements}/>
      {/* <CalendarView combinedInfo={eventsCombo} /> */}
      </div>
    </Layout>
  );
};

export default Home;
