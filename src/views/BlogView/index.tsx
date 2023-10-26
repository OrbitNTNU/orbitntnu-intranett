import React from "react";
import BlogPost from "@/components/blog/BlogPost";
import { BlogPostInterface } from "@/interfaces/BlogPostInterface";

interface blogProps {
  posts: BlogPostInterface[];
}

export const BlogPosts = ({ posts }: blogProps) => {
  return (
    <div>
      {posts
        ? posts.map((post) => (
            <BlogPost
              announcementId={post.announcementId}
              postTime={post.postTime}
              memberID={post.memberID}
              announcement={post.announcement}
              title={post.title}
            />
          ))
        : null}
    </div>
  );
};
