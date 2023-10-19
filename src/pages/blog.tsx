import Layout from "@/templates/Layout"
import BlogPost from "@/components/blog/blogPost";
const blog = () => {

    return (
        <Layout>
            <div className="flex flex-col justify-center">
                <p>
                    This is the blog
                </p>
                <BlogPost/>
            </div>
        </Layout>
    )
}

export default blog;