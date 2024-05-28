import Layout from "@/components/General/Layout";
import { FaFacebook } from "react-icons/fa";

const Links = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <p>
          <a href="#" className="fa fa-facebook"></a>
          <a href="#" className="fa fa-twitter"></a>
          <FaFacebook></FaFacebook>
          {/* Add more icons as needed */}
        </p>
      </div>
    </Layout>
  );
};

export default Links;
