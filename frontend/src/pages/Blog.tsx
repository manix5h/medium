import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { SingleBlog } from "../components/SingleBlog";
import { Skeleton } from "../components/Skeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) {
    return (
      <div>
        <Appbar/>
        <div className="">
        <Skeleton />
      </div>
      </div>
    );
  }

  return (
    <div>
      {/* @ts-ignore */}
      <SingleBlog blog={blog} />
    </div>
  );
};
