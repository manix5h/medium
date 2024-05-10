

export const LandingPage = () => {
 
    
  return (
    <div className="h-screen w-full flex flex-col justify-center  ">
       
      <div className="text-center text-5xl font-bold">
        Welcome to Medium.com
      </div>
      <div className=" pt-4 flex justify-center">
        <div className="text-2xl font-semibold pr-2">Create an account </div>
        <a href="/signup " className="text-2xl text-slate-500 underline">Sign Up</a>
      </div>
    </div>
  );
};
