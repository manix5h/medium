import { Link } from "react-router-dom"

interface BlogCardProps{
    id:number
    authorName:string,
    title:string,
    content:string,
    publisheDate:string,
   
}

export const Blogcard = ({
    authorName,
    title,
    content,
    publisheDate,
    id

}:BlogCardProps)=>{
    return(
        <Link to={`/blog/${id}`}>
        <div className="flex justify-center">
            <div className="p-4 border-b boder-slate-300 pb-3 w-screen max-w-screen-md cursor-pointer">
           <div className="">
           <div className=" ">
           <div className="flex">
            <div className="">
                <Avataar name={authorName}/>
            </div>

            
            <div className="font-extralight pl-2 text-sm flex flex-col justify-center px-2" >
                {authorName}
            </div>
            <div className="flex flex-col justify-center pl-2">

                <Circle/>
            </div>

            <div className="flex flex-col justify-center">
            <div className="pl-2 font-thin text-sm flex flex-col jutify-center text-slate-500"> 
                {publisheDate}
            </div>
            </div>
        </div>

        <div className="font-semibold pt-2 text-xl">
            {title}
        </div>

        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>

        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minutes(s) read`}
        </div>
           </div>
           </div>
        </div>
        </div>
        </Link>
    )
}


export function Avataar({name,size = "small"}:{name:string, size?:"small"| "big"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}

export function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-500">

        </div>
    )
}