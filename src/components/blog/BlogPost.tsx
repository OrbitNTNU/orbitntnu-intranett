import { BlogPostInterface } from "@/interfaces/BlogPostInterface";
import React from "react";

const BlogPost = () => {
  return (
    <div className="max-w-{74vw} m-3 flex flex-col items-center justify-between  outline">
      <h1>This is the blog title!</h1>
      <p className="m-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel eius ad
        itaque quas sequi laboriosam repellendus officia, iusto id et maiores
        praesentium possimus ducimus eos accusamus temporibus officiis
        reiciendis dolore.
      </p>
      <button className=" mb-2 h-7 w-24  rounded-md bg-[#EAB308] font-medium">
        {" "}
        Read More
      </button>
    </div>
  );
};
export default BlogPost;
