import { BlogPostInterface } from "@/interfaces/BlogPostInterface";
import React from "react";

const BlogPost = (post: BlogPostInterface) => {
  const { title, announcement, announcementId, postTime, memberID } = post;
  const maxCharacters = 200;

  const blogPostData: BlogPostInterface = {
    postTime: new Date(),
    title: "This is the blog title!",
    announcement:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    announcementId: 0o0123,
    memberID,
  };

  /*
    The content part of the BlogPost should not be the enite length of the blogpost (if it is a long post)
    therefore it has to be shortened. 
  */

  const truncatedContent =
    blogPostData.announcement &&
    blogPostData.announcement.length > maxCharacters
      ? `${blogPostData.announcement.substring(0, maxCharacters)}...`
      : blogPostData.announcement || ""; // Provide a default value if announcement is falsy

  return (
    <div className="max-w-{74vw} m-3 flex flex-col items-center justify-between  outline">
      <h1>{blogPostData.title}</h1>
      <p className="m-3 text-center">{truncatedContent}</p>
      <button className=" mb-2 h-7 w-24  rounded-md bg-[#EAB308] font-medium">
        {" "}
        Read More
      </button>
    </div>
  );
};
export default BlogPost;
