import Layout from "@/templates/Layout"
import BlogPost from "@/components/blog/BlogPost";
const blog = () => {

    return (
        <Layout>
            <div className="">
                <p>
                    This is the blog
                </p>
                <BlogPost/>
            </div>
        </Layout>
    )
}

export default blog;