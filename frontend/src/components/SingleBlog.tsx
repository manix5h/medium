
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avataar } from "./BlogCard";



export const SingleBlog = ({blog}:{blog:Blog}) => {
  return(
    <div>
    <Appbar />
    <div className="flex justify-center">
    <div className="grid grid-cols-12 w-full px-20 pt-10 max-w-screen-xl">
      <div className="col-span-8  flex flex-col">
        <div className="text-5xl font-extrabold">{blog?.title}</div>

        <div className="text-slate-500 pt-2">posted on Augest 24, 2023</div>

        <div className="pt-4">
          {blog?.content}
        </div>
      </div>

      <div className="col-span-4 ">
        <div className="text-slate-600 text-lg">{blog?.author.name || "Anonymous"}</div>

        <div className="flex">
          <div className="pr-4 flex flex-col justify-center">
            <Avataar size={"big"} name={"A"} />
          </div>

          <div className="">
            <div className="text-xl font-bold">jokestar</div>

            <div className="pt-2 text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, nulla!
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
};
