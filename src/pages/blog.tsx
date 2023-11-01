import Layout from "@/templates/Layout";
import post from "@/mockdata/MockBlogPost";
import { BlogPosts } from "@/views/BlogView";
import BlogPostPopUp from "@/components/blog/BlogPostPopUp";

const blog = () => {
  return (
    <Layout>
      {/* <div className="flex flex-col justify-start">
        <BlogPosts posts={post} />
      </div> */}
      <div className="">
        <BlogPostPopUp />
      </div>
    </Layout>
  );
};

export default blog;
