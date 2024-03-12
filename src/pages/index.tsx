import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import { CalendarView } from "@/views/LandingPageViews/CalendarView";
import { Shortcuts } from "@/views/LandingPageViews/ShortcutsView";
import Welcome from "@/views/WelcomeView";
import ShortAnnouncements from "@/views/LandingPageViews/AnnouncementView";

const Home = () => {
  const eventsComboData = api.events.getEvents.useQuery();
  const eventsCombo = eventsComboData.data;

  const announcementsData = api.announcements.getLatestAnnouncements.useQuery();
  const announcements = announcementsData.data;
  
  return (
    <Layout>
      <div className="space-y-10 md:space-y-20 lg:space-y-30"> {/* Adjust the space as needed */}
      <Welcome></Welcome>
      <Shortcuts />
      {eventsCombo && (
        <CalendarView combinedInfo={eventsCombo} />
      )}
      {announcements && (
        <ShortAnnouncements announcements={announcements}/>
      )}
      </div>
    </Layout>
  );
};

export default Home;
