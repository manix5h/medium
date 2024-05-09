import { SignupType } from "@manix5h/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {BACKEND_URL} from "../../config"



export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  async function handler(){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/${type === "signup"?"signup":"signin"}`,postInputs)
    const jwt = response.data;

    localStorage.setItem("token",jwt)
    navigate("/blogs")
    }catch(e){
        alert("error while sending request")
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="p-3">
              <div className="text-3xl font-extrabold">Create an account</div>

              <div className="text-slate-400 p-3">
               {type === 'signin'? "don't have an account":"Already have an account"}
                <Link to={type === "signin"? "/signup":"/signin"} className="underline pl-2">
                  {type === "signin"?"signUp":"signIn"}
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <LabelledInput
              label="Name"
              placeholder="Manish Sahu..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
              type={""}
            />

            <LabelledInput
              label="Email"
              placeholder="manishsahu43962@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
              type={""}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
            onClick={handler}
              type="button"
              className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup"?"Sign Up":"Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return (
    <div>
      <label
        className="block text-bold mb-2 text-sm font-medium
             text-zinc-700 dark:text-zinc-700"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border5173
             border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500  mb-4
              block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
