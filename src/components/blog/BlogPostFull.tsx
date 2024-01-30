import React from "react";
import { BlogPostInterface } from "@/interfaces/BlogPostInterface";

const BlogPost = (post: BlogPostInterface) => {
  const { title, announcement, announcementId, postTime, memberID } = post;
};

const BlogPostFull = () => {
  return (
    <div className=" h-screen">
      <h1>Hello</h1>
    </div>
  );
};

export default BlogPostFull;
