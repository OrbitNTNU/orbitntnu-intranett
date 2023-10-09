import Layout from "@/templates/Layout";
import Events from "@/views/Events";
import NewMembers from "@/views/New-members";
import Posts from "@/views/Posts";
import { Shortcuts } from "@/views/Shortcuts";
import Welcome from "@/views/Welcome";

const Home = () => {
  return (
    <Layout>
      <Welcome></Welcome>
      <Events></Events>
      <Posts></Posts>
      <NewMembers></NewMembers>
      <Shortcuts/>
    </Layout>
  );
};

export default Home;
