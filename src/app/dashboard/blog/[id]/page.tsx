import React from "react";
import EditBlog from "../../_components/blog/edit-blog";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  return <div>
    <EditBlog id={params.id} />
  </div>;
};

export default page;
