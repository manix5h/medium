
import { Blogcard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <Blogcard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publisheDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
