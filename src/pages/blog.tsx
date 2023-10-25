import Layout from "@/templates/Layout";
import BlogPost from "@/components/blog/BlogPost";
const blog = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-start">
        <BlogPost />
        <BlogPost />
      </div>
    </Layout>
  );
};

export default blog;
