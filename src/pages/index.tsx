import Layout from "@/templates/Layout";
import Events from "@/views/CalendarView";
import Posts from "@/views/PostsView";
import { Shortcuts } from "@/views/ShortcutsView";
import Welcome from "@/views/WelcomeView";

const Home = () => {
  return (
    <Layout>
      <Welcome></Welcome>
      <Events></Events>
      <Posts></Posts>
      <Shortcuts/>
    </Layout>
  );
};

export default Home;
