import Layout from "@/templates/Layout";
import Events from "@/views/Events";
import NewMembers from "@/views/New-members";
import Posts from "@/views/Posts";
import { Shortcuts } from "@/views/Shortcuts";

const Home = () => {
  return (
    <Layout>
      <hr className="border-t-4 border-accentColorTwo my-2"/>
        <h2 className="flex justify-center font-bold text-5xl">
            Velkommen
        </h2>
        <h1 className="flex justify-center font text-xl">
            Velkommen
        </h1>
      <hr className="border-t-4 border-accentColorTwo my-2"/>
      <Events></Events>
      <Posts></Posts>
      <NewMembers></NewMembers>
      <Shortcuts/>
    </Layout>
  );
};

export default Home;
