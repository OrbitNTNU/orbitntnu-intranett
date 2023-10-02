import Layout from "@/templates/Layout";
import Events from "@/views/Events";
import Memes from "@/views/Memes";
import NewMembers from "@/views/New-members";
import Posts from "@/views/Posts";

const Home = () => {
  return (
    <Layout>
      <div>Velkomstord</div>
      <Events></Events>
      <Memes></Memes>
      <Posts></Posts>
      <NewMembers></NewMembers>
    </Layout>
  );
};

export default Home;
