import Layout from "@/templates/Layout";
import BlogPost from "@/components/blog/BlogPost";
import Posts from "@/views/PostsView";
import post from "@/mockdata/MockBlogPost";
import { BlogPosts } from "@/views/BlogView";

const blog = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-start">
        <BlogPosts posts={post} />
      </div>
    </Layout>
  );
};

export default blog;
