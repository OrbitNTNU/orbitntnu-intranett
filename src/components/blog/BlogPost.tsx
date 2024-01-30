import { BlogPostInterface } from "@/interfaces/BlogPostInterface";
import React from "react";

const BlogPost = (post: BlogPostInterface) => {
  const { title, announcement, announcementId, postTime, memberID } = post;
  const maxCharacters = 150;

  /*
    The content part of the BlogPost should not be the enite length of the blogpost (if it is a long post)
    therefore it has to be shortened. 
  */

  const truncatedContent =
    announcement && announcement.length > maxCharacters
      ? `${announcement.substring(0, maxCharacters)}...`
      : announcement || ""; // Provide a default value if announcement is falsy

  const handleReadMoreClick = () => {
    window.location.href = "BlogPostFull";
  };

  return (
    <div className="max-w-74vw m-3 flex flex-col items-center justify-between outline">
      <h1>{title}</h1>
      <p className="m-3 text-center">{truncatedContent}</p>
      <button
        className="mb-2 h-7 w-24 rounded-md bg-[#EAB308] font-medium"
        onClick={handleReadMoreClick}
      >
        Read More
      </button>
      <p className="text-sm">Posted: {postTime.toDateString()}</p>
    </div>
  );
};
export default BlogPost;
