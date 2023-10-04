import Layout from "@/templates/Layout";
import Events from "@/views/Events";
import { Memes } from "@/views/Memes";
import NewMembers from "@/views/New-members";
import Posts from "@/views/Posts";
import { Shortcuts } from "@/views/Shortcuts";

const Home = () => {
  return (
    <Layout>
      <div>Velkomstord</div>
      <Events></Events>
      <Posts></Posts>
      <NewMembers></NewMembers>
      <Shortcuts/>
    </Layout>
  );
};

export default Home;
