
import { Quotes } from "../components/Quotes";
import { Auth } from "../components/Auth";


export const Signup =  () => {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 ">
     <div className=" ">
        <Auth type="signup" />
     </div>
     <div className="">
        <Quotes/>
     </div>
    </div>
  )
}